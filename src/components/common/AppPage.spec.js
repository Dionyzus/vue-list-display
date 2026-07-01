import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders header and content slots', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: 'Test Header',
        content: 'Test Content',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.find('.header').text()).toBe('Test Header');
    expect(wrapper.find('.content').text()).toBe('Test Content');
  });
});
