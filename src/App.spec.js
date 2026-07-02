import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.vue';

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
          GamesList: { template: '<div data-testid="catalog-list" />' },
        },
      },
    });

    const hero = wrapper.find('[data-testid="hero-banner"]');
    const catalog = wrapper.find('[data-testid="catalog-list"]');

    expect(hero.exists()).toBe(true);
    expect(catalog.exists()).toBe(true);
    expect(hero.element.compareDocumentPosition(catalog.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('keeps the hero visible when the catalog list is empty', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
          GamesList: { template: '<div data-testid="empty-catalog" />' },
        },
      },
    });

    expect(wrapper.find('[data-testid="hero-banner"]').exists()).toBe(true);
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
  });
});
