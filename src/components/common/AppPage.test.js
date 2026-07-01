import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders slot content', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: 'Header',
        content: 'Content',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.text()).toContain('Header');
    expect(wrapper.text()).toContain('Content');
  });
});
