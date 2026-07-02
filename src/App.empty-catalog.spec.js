import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

import App from './App.vue';
import GameItem from './components/Games/GameItem.vue';
import { appGlobalMountOptions } from './test/mountOptions';

describe('App with empty catalog', () => {
  it('keeps the hero visible when there are zero games', () => {
    const wrapper = mount(App, appGlobalMountOptions);

    expect(wrapper.get('h1').text()).toBe('Online Casino');
    expect(wrapper.get('section button').text()).toBe('Browse games');
    expect(wrapper.findAllComponents(GameItem)).toHaveLength(0);
  });
});
