import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import AppPage from './AppPage.vue';

describe('AppPage', () => {
  it('mounts and renders header and content slots', () => {
    const wrapper = mount(AppPage, {
      slots: {
        header: '<nav data-testid="header">Header</nav>',
        content: '<section data-testid="content">Content</section>',
      },
    });

    expect(wrapper.find('[data-testid="header"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="content"]').exists()).toBe(true);
  });
});
