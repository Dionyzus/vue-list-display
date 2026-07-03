import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders slotted header and content', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: '<h1>Test Header</h1>',
        content: '<p>Test Content</p>',
      },
    });

    expect(wrapper.find('header').text()).toContain('Test Header');
    expect(wrapper.find('main').text()).toContain('Test Content');
  });
});
