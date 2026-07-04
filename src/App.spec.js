import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import {
  HERO_CTA_LABEL,
  HERO_HEADLINE,
  HERO_SUPPORTING,
} from './common/__fixtures__/heroCopy.js';
import { catalogScroll } from './utils/scrollToCatalog.js';

// Locate the hero by what a user perceives -- its heading text, supporting copy,
// and CTA label -- rather than by internal ids or styling class names.
const findHeroHeading = wrapper =>
  wrapper.findAll('h1').find(heading => heading.text() === HERO_HEADLINE);

const findHeroSupporting = wrapper =>
  wrapper.findAll('p').find(paragraph => paragraph.text() === HERO_SUPPORTING);

const findHeroCta = wrapper =>
  wrapper.findAll('button').find(button => button.text() === HERO_CTA_LABEL);

const findSearchControl = wrapper =>
  wrapper.find('input[placeholder="Search..."]');

// The category control is labelled "Category:" for users; match on that visible
// label rather than an unqualified <select> that any future control could satisfy.
const findCategoryLabel = wrapper =>
  wrapper.findAll('label').find(label => label.text().startsWith('Category'));

const precedesInDocument = (earlier, later) =>
  Boolean(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  );

// Replace game cards with a light stub so catalog-composition tests exercise the
// hero and catalog controls without pulling in FontAwesome / v-lazy game-card chrome.
const catalogCompositionStubs = {
  AppNavigation: { template: '<nav aria-label="Main" />' },
  GameItem: { template: '<div data-test="game-item-stub" />' },
};

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mountAppInDocument = options => {
    const wrapper = mount(App, options);
    document.body.appendChild(wrapper.element);

    return {
      wrapper,
      cleanup: () => {
        wrapper.unmount();
        if (wrapper.element.parentNode) {
          wrapper.element.parentNode.removeChild(wrapper.element);
        }
      },
    };
  };

  it('mounts the app shell with header and content regions', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: { template: '<nav data-test="nav-stub" />' },
          GamesList: { template: '<div data-test="games-stub" />' },
        },
      },
    });

    expect(wrapper.find('header').find('[data-test="nav-stub"]').exists()).toBe(true);
    expect(wrapper.find('main').find('[data-test="games-stub"]').exists()).toBe(true);
  });

  it('renders HeroBanner above catalog search and category filter controls', () => {
    const wrapper = mount(App, {
      global: {
        stubs: catalogCompositionStubs,
      },
    });

    const main = wrapper.find('main');
    const heroHeading = findHeroHeading(main);
    const heroSupporting = findHeroSupporting(main);
    const heroCta = findHeroCta(main);
    const searchInput = findSearchControl(main);
    const categoryLabel = findCategoryLabel(main);

    expect(heroHeading).toBeTruthy();
    expect(heroSupporting).toBeTruthy();
    expect(heroCta).toBeTruthy();
    expect(searchInput.exists()).toBe(true);
    expect(categoryLabel).toBeTruthy();

    expect(precedesInDocument(heroHeading.element, searchInput.element)).toBe(true);
    expect(precedesInDocument(heroHeading.element, categoryLabel.element)).toBe(true);
  });

  it('exposes a catalog scroll anchor and scrolls to it when Browse games fires', async () => {
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    const { wrapper, cleanup } = mountAppInDocument({
      global: {
        stubs: catalogCompositionStubs,
      },
    });

    const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
    expect(catalogAnchor.exists()).toBe(true);
    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

    const scrollIntoView = vi.fn();
    catalogAnchor.element.scrollIntoView = scrollIntoView;

    await findHeroCta(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    cleanup();
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog anchor when Browse games is activated with %j',
    async key => {
      vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

      const { wrapper, cleanup } = mountAppInDocument({
        global: {
          stubs: catalogCompositionStubs,
        },
      });

      const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
      expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

      const scrollIntoView = vi.fn();
      catalogAnchor.element.scrollIntoView = scrollIntoView;

      await findHeroCta(wrapper).trigger('keydown', { key });

      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      cleanup();
    },
  );

  describe('with empty catalog data', () => {
    afterEach(() => {
      vi.resetModules();
      vi.doUnmock('./components/Games/data.js');
    });

    it('renders HeroBanner when the catalog list holds zero games', async () => {
      vi.doMock('./components/Games/data.js', () => ({
        default: [],
      }));
      vi.resetModules();

      const { default: AppWithEmptyCatalog } = await import('./App.vue');
      const wrapper = mount(AppWithEmptyCatalog, {
        global: {
          stubs: {
            AppNavigation: { template: '<nav />' },
          },
        },
      });

      const heroHeading = findHeroHeading(wrapper);
      const heroSupporting = findHeroSupporting(wrapper);
      const heroCta = findHeroCta(wrapper);

      expect(heroHeading).toBeTruthy();
      expect(heroSupporting).toBeTruthy();
      expect(heroCta).toBeTruthy();
      expect(findSearchControl(wrapper).exists()).toBe(true);
      // No games -> no game-card imagery is rendered, independent of any
      // empty-grid messaging and without coupling to an internal component type.
      expect(wrapper.find('img[alt="Game Image"]').exists()).toBe(false);
    });
  });
});
