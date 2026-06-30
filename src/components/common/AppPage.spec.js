import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('test harness smoke', () => {
  it('mounts a real Vue SFC and renders slotted content', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: 'Header slot',
        content: 'Content slot'
      }
    });

    expect(wrapper.find('header.header').text()).toBe('Header slot');
    expect(wrapper.find('main.content').text()).toBe('Content slot');
  });
});
