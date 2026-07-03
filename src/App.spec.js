import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import App from './App.vue';

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

  const findHeroSection = wrapper =>
    wrapper.find('section[aria-labelledby="hero-headline"]');

  const findBrowseGamesCta = wrapper =>
    findHeroSection(wrapper).find('button');

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
    const hero = findHeroSection(wrapper);
    const catalogAnchor = main.find(`#${GAME_CATALOG_ANCHOR_ID}`);
    const searchInput = main.find('input[placeholder="Search..."]');
    const categoryFilter = main.find('select');

    expect(hero.find('h1').text()).toBe('Online Casino');
    expect(hero.find('p').text()).toBe('Browse our game catalog');
    expect(findBrowseGamesCta(wrapper).text()).toBe('Browse games');
    expect(searchInput.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);
    expect(main.text()).toContain('Category');

    expect(
      hero.element.compareDocumentPosition(catalogAnchor.element) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
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

    await findBrowseGamesCta(wrapper).trigger('click');

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

      await findBrowseGamesCta(wrapper).trigger('keydown', { key });

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

      expect(hero.exists()).toBe(true);
      expect(hero.find('h1').text()).toBe('Online Casino');
      expect(hero.find('p').text()).toBe('Browse our game catalog');
      expect(hero.find('button').text()).toBe('Browse games');
      expect(wrapper.find('.grid-item').exists()).toBe(false);
    });
  });
});
