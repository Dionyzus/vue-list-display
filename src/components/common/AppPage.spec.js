import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { APP_PAGE_CONTENT_PADDING_VAR } from '../../common/pageLayout.js';
import AppPage from './AppPage.vue';
import appPageSource from './AppPage.vue?raw';

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

  it('defines the shared content padding token used by HeroBanner full-bleed layout', () => {
    expect(appPageSource).toContain(`${APP_PAGE_CONTENT_PADDING_VAR}: 1rem`);
    expect(appPageSource).toMatch(
      new RegExp(
        `@media screen and \\(max-width: 768px\\)[\\s\\S]*${APP_PAGE_CONTENT_PADDING_VAR}:\\s*0\\.5rem`,
      ),
    );
  });
});
