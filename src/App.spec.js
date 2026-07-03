import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';

describe('App', () => {
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

  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
          GamesList: { template: '<div data-test="games-stub" />' },
        },
      },
    });

    const main = wrapper.find('main');
    const children = main.element.children;

    expect(main.find('.hero-headline').text()).toBe('Online Casino');
    expect(main.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(main.find('.hero-cta').text()).toBe('Browse games');
    expect(main.find('[data-test="games-stub"]').exists()).toBe(true);
    expect(children[0].classList.contains('hero')).toBe(true);
    expect(children[1].getAttribute('data-test')).toBe('games-stub');
  });

  it('exposes a catalog scroll anchor and scrolls to it when Browse games is activated', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: { template: '<nav />' },
        },
      },
    });

    const catalogAnchor = wrapper.find('#game-catalog');
    expect(catalogAnchor.exists()).toBe(true);

    const scrollIntoView = vi.fn();
    catalogAnchor.element.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockImplementation(id =>
      id === 'game-catalog' ? catalogAnchor.element : null,
    );

    await wrapper.find('.hero-cta').trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    vi.restoreAllMocks();
  });

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

      expect(wrapper.find('section.hero').exists()).toBe(true);
      expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
      expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
      expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
      expect(wrapper.find('.grid-item').exists()).toBe(false);
    });
  });
});
