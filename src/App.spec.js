import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
        },
      },
    });

    const hero = wrapper.find('[data-testid="hero-banner"]');
    const catalog = wrapper.find('.game-grid');

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
        },
      },
    });

    expect(wrapper.find('[data-testid="hero-banner"]').exists()).toBe(true);
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.game-grid').exists()).toBe(true);
    expect(wrapper.findAll('.grid-item')).toHaveLength(0);
  });
});
