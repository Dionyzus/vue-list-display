import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { GAME_CATALOG_ANCHOR_ID } from './common/constants';
import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

describe('App', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

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
    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-banner__cta').text()).toBe('Browse games');
    expect(wrapper.findAll('.grid-layout > *')).toHaveLength(0);
  });

  it('exposes a document-level scroll target on the catalog filter section', () => {
    const wrapper = mount(App);
    const anchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);

    expect(anchor.exists()).toBe(true);
    expect(anchor.classes()).toContain('filter-section');
  });

  it('scrolls to the catalog filter section when Browse games is clicked', async () => {
    const wrapper = mount(App, { attachTo: document.body });
    const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
    target.scrollIntoView = vi.fn();

    await wrapper.find('.hero-banner__cta').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
