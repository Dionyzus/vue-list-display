import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';

vi.mock('./components/Games/GamesList.vue', () => ({
  default: {
    name: 'GamesList',
    template: '<div class="games-list-stub">No games</div>',
  },
}));

describe('App', () => {
  it('renders HeroBanner above the catalog list regardless of catalog contents', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.hero').exists()).toBe(true);
    expect(wrapper.find('.games-list-stub').exists()).toBe(true);

    const heroIndex = wrapper.findAll('.page .content > *').findIndex(node =>
      node.classes().includes('hero')
    );
    const catalogIndex = wrapper.findAll('.page .content > *').findIndex(node =>
      node.classes().includes('games-list-stub')
    );

    expect(heroIndex).toBeGreaterThanOrEqual(0);
    expect(catalogIndex).toBeGreaterThan(heroIndex);
  });
});
