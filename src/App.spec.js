import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import HeroBanner from './components/common/HeroBanner.vue';
import GamesList from './components/Games/GamesList.vue';

vi.mock('./components/Games/GamesList.vue', () => ({
  default: {
    name: 'GamesList',
    template: '<div class="games-list-stub">No games</div>',
  },
}));

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App);

    expect(wrapper.findComponent(HeroBanner).exists()).toBe(true);
    expect(wrapper.findComponent(GamesList).exists()).toBe(true);

    const content = wrapper.find('.content');
    const children = content.element.children;

    expect(children[0].classList.contains('hero')).toBe(true);
    expect(children[1].classList.contains('games-list-stub')).toBe(true);
  });

  it('keeps HeroBanner visible when the catalog list is empty', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.hero-headline').exists()).toBe(true);
    expect(wrapper.find('.games-list-stub').text()).toBe('No games');
  });
});
