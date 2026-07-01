import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AppNavigation from './AppNavigation.vue';

describe('AppNavigation', () => {
  it('mounts a script-setup component and renders navigation', () => {
    const wrapper = mount(AppNavigation, {
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    expect(wrapper.find('.navbar').exists()).toBe(true);
    expect(wrapper.text()).toContain('Online Casino');
  });
});
