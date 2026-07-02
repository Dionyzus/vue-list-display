import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App);

    const content = wrapper.find('main.content');
    const children = content.findAll(':scope > *');

    expect(children.at(0).classes()).toContain('hero-banner');
    expect(children.at(1).classes()).toContain('game-grid');
  });

  it('keeps HeroBanner visible when the catalog list is empty', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.hero-banner').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.findAll('.grid-layout > *')).toHaveLength(0);
  });
});
