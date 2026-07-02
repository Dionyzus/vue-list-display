import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('renders header and content slots', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: '<h1>Header</h1>',
        content: '<p>Content</p>',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Header');
    expect(wrapper.find('p').text()).toBe('Content');
  });
});
