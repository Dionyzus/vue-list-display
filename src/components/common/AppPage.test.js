import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('renders header and content slots', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: '<h1>Test Header</h1>',
        content: '<p>Test Content</p>',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.find('header.header').exists()).toBe(true);
    expect(wrapper.text()).toContain('Test Header');
    expect(wrapper.text()).toContain('Test Content');
  });
});
