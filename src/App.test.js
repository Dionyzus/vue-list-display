import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import App from './App.vue';

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const content = wrapper.find('.content');
    const children = content.element.children;

    expect(children[0].classList.contains('hero-banner')).toBe(true);
    expect(children[1].classList.contains('game-grid')).toBe(true);
  });
});
