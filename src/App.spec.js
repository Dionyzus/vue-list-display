import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import App from './App.vue';

const HERO_HEADLINE = 'Online Casino';
const HERO_SUPPORTING = 'Browse our game catalog';
const HERO_CTA_LABEL = 'Browse games';

const findHeroSection = wrapper => wrapper.find('section[aria-labelledby="hero-headline"]');
const findBrowseGamesButton = wrapper => wrapper.find('button', { text: HERO_CTA_LABEL });
const findCatalogSearchInput = wrapper => wrapper.find('input[placeholder="Search..."]');
const findCategoryFilter = wrapper => wrapper.find('select');

const expectHeroCopy = hero => {
  expect(hero.find('h1').text()).toBe(HERO_HEADLINE);
  expect(hero.text()).toContain(HERO_SUPPORTING);
  expect(hero.find('button').text()).toBe(HERO_CTA_LABEL);
};

const expectNodeFollows = (preceding, following) => {
  expect(preceding.compareDocumentPosition(following) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
};

describe('App', () => {
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

  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
        },
      },
    });

    const main = wrapper.find('main');
    const hero = findHeroSection(main);
    const searchInput = findCatalogSearchInput(wrapper);
    const categoryFilter = findCategoryFilter(wrapper);

    expectHeroCopy(hero);
    expect(searchInput.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);
    expect(main.element.firstElementChild).toBe(hero.element);
    expectNodeFollows(hero.element, searchInput.element);
    expectNodeFollows(hero.element, categoryFilter.element);
  });

  it('exposes a catalog scroll anchor and scrolls to it when Browse games is activated', async () => {
    const { wrapper, cleanup } = mountAppInDocument({
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
        },
      },
    });

    const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
    expect(catalogAnchor.exists()).toBe(true);
    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

    const scrollIntoView = vi.fn();
    catalogAnchor.element.scrollIntoView = scrollIntoView;

    await findBrowseGamesButton(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    cleanup();
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog anchor when Browse games is activated with %j',
    async key => {
      const { wrapper, cleanup } = mountAppInDocument({
        global: {
          stubs: {
            AppNavigation: { template: '<nav />' },
          },
        },
      });

      const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
      expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

      const scrollIntoView = vi.fn();
      catalogAnchor.element.scrollIntoView = scrollIntoView;

      await findBrowseGamesButton(wrapper).trigger('keydown', { key });

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

    it('renders HeroBanner when the catalog list shows zero games', async () => {
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

      const hero = findHeroSection(wrapper);
      expectHeroCopy(hero);
      expect(wrapper.find('.grid-item').exists()).toBe(false);
    });
  });
});
