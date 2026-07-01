import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders slotted header and content', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: '<nav data-testid="header">Nav</nav>',
        content: '<section data-testid="content">Body</section>',
      },
    });

    expect(wrapper.find('.page').exists()).toBe(true);
    expect(wrapper.find('[data-testid="header"]').text()).toBe('Nav');
    expect(wrapper.find('[data-testid="content"]').text()).toBe('Body');
  });
});
