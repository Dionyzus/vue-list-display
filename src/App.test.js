import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { CATALOG_FILTER_ANCHOR_ID } from './common/constants';
import App from './App.vue';

const catalogState = vi.hoisted(() => ({ games: [] }));

vi.mock('./components/Games/data.js', () => ({
  get default() {
    return catalogState.games;
  },
}));

const PRD_HEADLINE = 'Online Casino';

function mountApp() {
  return mount(App, {
    attachTo: document.body,
    global: {
      stubs: {
        'font-awesome-icon': true,
      },
    },
  });
}

function nodeFollows(referenceNode, followingNode) {
  return (referenceNode.compareDocumentPosition(followingNode) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
}

describe('App main view hero integration', () => {
  let catalogGames;

  beforeAll(async () => {
    catalogGames = (await vi.importActual('./components/Games/data.js')).default;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('with games in the catalog', () => {
    beforeEach(() => {
      catalogState.games = catalogGames;
    });

    it('renders the hero above catalog search and category filter controls', () => {
      const wrapper = mountApp();

      const hero = wrapper.get('[aria-label="Welcome"]');
      const searchInput = wrapper.get('input[placeholder="Search..."]');
      const categoryFilter = wrapper.get(`#${CATALOG_FILTER_ANCHOR_ID} select`);

      expect(wrapper.findAll('[aria-label="View Details"]').length).toBeGreaterThan(0);
      expect(nodeFollows(hero.element, searchInput.element)).toBe(true);
      expect(nodeFollows(hero.element, categoryFilter.element)).toBe(true);
      expect(nodeFollows(searchInput.element, categoryFilter.element)).toBe(true);
    });
  });

  describe('with an empty catalog', () => {
    beforeEach(() => {
      catalogState.games = [];
    });

    it('keeps the hero visible when the catalog has zero games', () => {
      const wrapper = mountApp();

      expect(wrapper.get('[aria-label="Welcome"]').exists()).toBe(true);
      expect(wrapper.get('[aria-label="Welcome"] h1').text()).toBe(PRD_HEADLINE);
      expect(wrapper.findAll('[aria-label="View Details"]')).toHaveLength(0);
    });
  });

  describe('Browse games CTA scroll', () => {
    beforeEach(() => {
      catalogState.games = catalogGames;
    });

    it('scrolls to the catalog filter section when Browse games is activated by click', () => {
      const scrollIntoView = vi.fn();
      const wrapper = mountApp();

      const filterSection = wrapper.get(`#${CATALOG_FILTER_ANCHOR_ID}`).element;
      filterSection.scrollIntoView = scrollIntoView;

      wrapper.get('[aria-label="Welcome"] button').trigger('click');

      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it.each(['Enter', ' '])(
      'scrolls to the catalog filter section when Browse games is activated with %s',
      async key => {
        const scrollIntoView = vi.fn();
        const wrapper = mountApp();

        const filterSection = wrapper.get(`#${CATALOG_FILTER_ANCHOR_ID}`).element;
        filterSection.scrollIntoView = scrollIntoView;

        const cta = wrapper.get('[aria-label="Welcome"] button');
        cta.element.focus();
        await cta.trigger('keydown', { key });

        expect(scrollIntoView).toHaveBeenCalledWith({
          behavior: 'smooth',
          block: 'start',
        });
      },
    );
  });
});
