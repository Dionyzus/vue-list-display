import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

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
});
