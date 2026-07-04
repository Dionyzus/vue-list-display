import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import {
  HERO_CTA_LABEL,
  HERO_HEADLINE,
  HERO_SUPPORTING,
} from './components/common/heroCopy.js';
import { catalogScroll } from './utils/scrollToCatalog.js';

const findHeroSection = wrapper => wrapper.find('section[aria-labelledby="hero-headline"]');

const findSearchControl = wrapper => wrapper.find('input[placeholder="Search..."]');

// Locate the category filter through its visible, associated label rather than a
// bare `select`, so the assertion binds to the Category control by its accessible
// name and cannot silently latch onto some other select added to the view.
const findCategoryControl = wrapper => {
  const categoryLabel = wrapper.findAll('label').find(label => label.text() === 'Category:');
  if (!categoryLabel) return { label: categoryLabel, select: wrapper.find('select#__missing__') };

  return {
    label: categoryLabel,
    select: wrapper.find(`select#${categoryLabel.attributes('for')}`),
  };
};

const precedesInDocument = (earlier, later) =>
  Boolean(earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING);

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
    const heroSection = findHeroSection(main);
    const searchInput = findSearchControl(main);
    const { label: categoryLabel, select: categorySelect } = findCategoryControl(main);

    expect(heroSection.exists()).toBe(true);
    expect(heroSection.get('h1').text()).toBe(HERO_HEADLINE);
    expect(heroSection.get('p').text()).toBe(HERO_SUPPORTING);
    expect(heroSection.get('button').text()).toBe(HERO_CTA_LABEL);
    expect(searchInput.exists()).toBe(true);
    expect(categorySelect.exists()).toBe(true);
    expect(categoryLabel.text()).toBe('Category:');
    expect(precedesInDocument(heroSection.element, searchInput.element)).toBe(true);
    expect(precedesInDocument(heroSection.element, categorySelect.element)).toBe(true);
  });

  it('exposes a catalog scroll anchor and scrolls to it when Browse games is activated', async () => {
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

    await findHeroSection(wrapper).get('button').trigger('click');

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

      await findHeroSection(wrapper).get('button').trigger('keydown', { key });

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
      const { default: EmptyCatalogGameItem } = await import('./components/Games/GameItem.vue');
      const wrapper = mount(AppWithEmptyCatalog, {
        global: {
          stubs: {
            AppNavigation: { template: '<nav />' },
          },
        },
      });

      const heroSection = findHeroSection(wrapper);

      expect(heroSection.exists()).toBe(true);
      expect(heroSection.get('h1').text()).toBe(HERO_HEADLINE);
      expect(heroSection.get('p').text()).toBe(HERO_SUPPORTING);
      expect(heroSection.get('button').text()).toBe(HERO_CTA_LABEL);
      expect(wrapper.findAllComponents(EmptyCatalogGameItem).length).toBe(0);
    });
  });
});
