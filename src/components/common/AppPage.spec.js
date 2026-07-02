import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('renders header and content slots', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: 'Test header',
        content: 'Test content',
      },
    });

    expect(wrapper.find('.header').text()).toBe('Test header');
    expect(wrapper.find('.content').text()).toBe('Test content');
  });
});
