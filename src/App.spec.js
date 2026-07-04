import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import { catalogScroll } from './utils/scrollToCatalog.js';

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

  const mountMainView = (options = {}) => {
    const { global: globalOptions = {}, ...rest } = options;

    return mount(App, {
      ...rest,
      global: {
        ...globalOptions,
        stubs: {
          AppNavigation: { template: '<nav />' },
          ...globalOptions.stubs,
        },
      },
    });
  };

  const getHeroCta = wrapper =>
    wrapper.get('section[aria-labelledby="hero-headline"] button[type="button"]');

  const getCatalogControls = wrapper => {
    const catalog = wrapper.get(`#${GAME_CATALOG_ANCHOR_ID}`);

    return {
      searchInput: catalog.get('input'),
      categoryFilter: catalog.get('select'),
    };
  };

  it('mounts the app shell with header and content regions', () => {
    const wrapper = mountMainView({
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
    const wrapper = mountMainView();

    const hero = wrapper.get('section[aria-labelledby="hero-headline"]');
    const { searchInput, categoryFilter } = getCatalogControls(wrapper);

    expect(hero.get('#hero-headline').text()).toBe('Online Casino');
    expect(hero.get('p').text()).toBe('Browse our game catalog');
    expect(hero.get('button[type="button"]').text()).toBe('Browse games');
    expect(wrapper.get(`#${GAME_CATALOG_ANCHOR_ID}`).exists()).toBe(true);

    const heroBeforeSearch =
      hero.element.compareDocumentPosition(searchInput.element) &
      Node.DOCUMENT_POSITION_FOLLOWING;
    const heroBeforeCategory =
      hero.element.compareDocumentPosition(categoryFilter.element) &
      Node.DOCUMENT_POSITION_FOLLOWING;

    expect(heroBeforeSearch).toBeTruthy();
    expect(heroBeforeCategory).toBeTruthy();
  });

  it('exposes a catalog anchor and scrolls to it when Browse games is activated', async () => {
    const { wrapper, cleanup } = mountAppInDocument({
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
        },
      },
    });

    const catalogAnchor = wrapper.get(`#${GAME_CATALOG_ANCHOR_ID}`);
    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

    const scrollIntoView = vi.fn();
    catalogAnchor.element.scrollIntoView = scrollIntoView;
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    await getHeroCta(wrapper).trigger('click');

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

      const catalogAnchor = wrapper.get(`#${GAME_CATALOG_ANCHOR_ID}`);
      expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

      const scrollIntoView = vi.fn();
      catalogAnchor.element.scrollIntoView = scrollIntoView;
      vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

      await getHeroCta(wrapper).trigger('keydown', { key });

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

      const hero = wrapper.get('section[aria-labelledby="hero-headline"]');

      expect(hero.get('#hero-headline').text()).toBe('Online Casino');
      expect(hero.get('p').text()).toBe('Browse our game catalog');
      expect(hero.get('button[type="button"]').text()).toBe('Browse games');
      expect(wrapper.findAll('button[aria-label="View Details"]')).toHaveLength(0);
    });
  });
});
