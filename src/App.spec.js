import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from './common/catalogAnchor.js';
import App from './App.vue';

const HERO_HEADLINE = 'Online Casino';
const HERO_SUPPORTING = 'Browse our game catalog';
const HERO_CTA_LABEL = 'Browse games';

const findHeroSection = wrapper =>
  wrapper.find('section[aria-labelledby="hero-headline"]');

const precedesInDocument = (earlier, later) =>
  Boolean(
    earlier.compareDocumentPosition(later) & Node.DOCUMENT_POSITION_FOLLOWING,
  );

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

  it('renders HeroBanner above catalog search and category filter controls', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: { template: '<nav aria-label="Main" />' },
        },
      },
    });

    const main = wrapper.find('main');
    const heroSection = findHeroSection(main);
    const searchInput = main.find('input[placeholder="Search..."]');
    const categorySelect = main.find('select');

    expect(heroSection.exists()).toBe(true);
    expect(main.get('h1').text()).toBe(HERO_HEADLINE);
    expect(main.get('p').text()).toBe(HERO_SUPPORTING);
    expect(main.get('button').text()).toBe(HERO_CTA_LABEL);
    expect(searchInput.exists()).toBe(true);
    expect(categorySelect.exists()).toBe(true);
    expect(precedesInDocument(heroSection.element, searchInput.element)).toBe(true);
    expect(precedesInDocument(heroSection.element, categorySelect.element)).toBe(true);
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

    await wrapper.get('button', { text: HERO_CTA_LABEL }).trigger('click');

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

      await wrapper.get('button', { text: HERO_CTA_LABEL }).trigger('keydown', { key });

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

      const heroSection = findHeroSection(wrapper);

      expect(heroSection.exists()).toBe(true);
      expect(wrapper.get('h1').text()).toBe(HERO_HEADLINE);
      expect(wrapper.get('p').text()).toBe(HERO_SUPPORTING);
      expect(wrapper.get('button').text()).toBe(HERO_CTA_LABEL);
      expect(wrapper.find('input[placeholder="Search..."]').exists()).toBe(true);
      expect(wrapper.findAll('img[alt]').length).toBe(0);
    });
  });
});
