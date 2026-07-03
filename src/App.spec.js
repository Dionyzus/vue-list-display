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
          GameItem: { template: '<div data-test="game-item-stub" />' },
        },
      },
    });

    const main = wrapper.find('main');
    const hero = main.find('section[aria-labelledby="hero-headline"]');
    const searchInput = main.find('input[placeholder="Search..."]');
    const categoryFilter = main.find('select');

    expect(hero.exists()).toBe(true);
    expect(searchInput.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);

    expect(hero.find('#hero-headline').text()).toBe('Online Casino');
    expect(hero.get('p').text()).toBe('Browse our game catalog');
    expect(hero.get('button').text()).toBe('Browse games');

    const heroIndex = [...main.element.children].indexOf(hero.element);
    const catalogRootIndex = [...main.element.children].indexOf(
      main.find(`#${GAME_CATALOG_ANCHOR_ID}`).element.closest('.game-grid'),
    );

    expect(heroIndex).toBeGreaterThanOrEqual(0);
    expect(catalogRootIndex).toBeGreaterThan(heroIndex);
  });

  it('exposes a catalog scroll anchor and scrolls to it when Browse games is activated', async () => {
    const { wrapper, cleanup } = mountAppInDocument({
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
          GameItem: { template: '<div data-test="game-item-stub" />' },
        },
      },
    });

    const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
    expect(catalogAnchor.exists()).toBe(true);
    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

    const scrollIntoView = vi.fn();
    catalogAnchor.element.scrollIntoView = scrollIntoView;

    await wrapper.find('section[aria-labelledby="hero-headline"] button').trigger('click');

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
            GameItem: { template: '<div data-test="game-item-stub" />' },
          },
        },
      });

      const catalogAnchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);
      expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBe(catalogAnchor.element);

      const scrollIntoView = vi.fn();
      catalogAnchor.element.scrollIntoView = scrollIntoView;

      await wrapper.find('section[aria-labelledby="hero-headline"] button').trigger('keydown', {
        key,
      });

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

    it('renders the hero when the catalog has zero games', async () => {
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

      const hero = wrapper.find('section[aria-labelledby="hero-headline"]');

      expect(hero.exists()).toBe(true);
      expect(hero.find('#hero-headline').text()).toBe('Online Casino');
      expect(hero.get('p').text()).toBe('Browse our game catalog');
      expect(hero.get('button').text()).toBe('Browse games');
      expect(wrapper.find('.grid-item').exists()).toBe(false);
    });
  });
});
