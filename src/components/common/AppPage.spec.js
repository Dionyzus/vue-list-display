import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders slotted header and content', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: 'Test header',
        content: 'Test content',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.find('.header').text()).toContain('Test header');
    expect(wrapper.find('.content').text()).toContain('Test content');
  });
});
