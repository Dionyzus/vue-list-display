import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { GAME_CATALOG_ANCHOR_ID } from './common/constants';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

const HERO_HEADLINE = 'Online Casino';
const HERO_SUPPORTING = 'Browse our game catalog';
const HERO_CTA_LABEL = 'Browse games';

function findHeroSection(wrapper) {
  return wrapper.find('section[aria-labelledby="hero-headline"]');
}

function findHeroCta(wrapper) {
  return wrapper.find('button[type="button"]');
}

function findCatalogSearchInput(wrapper) {
  return wrapper.find('input[placeholder="Search..."]');
}

function findCategoryFilterSelect(wrapper) {
  return wrapper.find('select');
}

function appearsBefore(earlierElement, laterElement) {
  return (
    earlierElement.compareDocumentPosition(laterElement) & Node.DOCUMENT_POSITION_FOLLOWING
  ) !== 0;
}

async function activateCtaWithKeyboard(button, key) {
  button.element.focus();
  await button.trigger('keydown', { key });
  await button.trigger('keyup', { key });
  button.element.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, detail: 0 }),
  );
}

describe('App', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders HeroBanner above catalog search and category filter controls', () => {
    const wrapper = mount(App);

    const hero = findHeroSection(wrapper);
    const searchInput = findCatalogSearchInput(wrapper);
    const categorySelect = findCategoryFilterSelect(wrapper);

    expect(hero.exists()).toBe(true);
    expect(searchInput.exists()).toBe(true);
    expect(categorySelect.exists()).toBe(true);
    expect(wrapper.text()).toContain('Category:');
    expect(appearsBefore(hero.element, searchInput.element)).toBe(true);
    expect(appearsBefore(searchInput.element, categorySelect.element)).toBe(true);
  });

  it('keeps HeroBanner visible when the catalog list is empty', () => {
    const wrapper = mount(App);

    expect(findHeroSection(wrapper).exists()).toBe(true);
    expect(wrapper.get('#hero-headline').text()).toBe(HERO_HEADLINE);
    expect(wrapper.text()).toContain(HERO_SUPPORTING);
    expect(findHeroCta(wrapper).text()).toBe(HERO_CTA_LABEL);
    expect(wrapper.findAll('.grid-layout > *')).toHaveLength(0);
  });

  it('exposes a document-level scroll target on the catalog filter section', () => {
    const wrapper = mount(App);
    const anchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);

    expect(anchor.exists()).toBe(true);
    expect(findCatalogSearchInput(wrapper).exists()).toBe(true);
    expect(findCategoryFilterSelect(wrapper).exists()).toBe(true);
  });

  it('scrolls to the catalog filter section when Browse games is clicked', async () => {
    const wrapper = mount(App, { attachTo: document.body });
    const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
    target.scrollIntoView = vi.fn();

    await findHeroCta(wrapper).trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog filter section when Browse games is activated with %s',
    async key => {
      const wrapper = mount(App, { attachTo: document.body });
      const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
      target.scrollIntoView = vi.fn();
      const cta = findHeroCta(wrapper);

      await activateCtaWithKeyboard(cta, key);

      expect(document.activeElement).toBe(cta.element);
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    },
  );
});
