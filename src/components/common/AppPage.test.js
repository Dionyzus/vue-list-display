import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { APP_HEADER_SCROLL_OFFSET, APP_HEADER_SCROLL_OFFSET_MOBILE } from '../../common/constants';
import AppPage from './AppPage.vue';

const appPageStyles = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'AppPage.vue'),
  'utf8',
).match(/<style scoped>([\s\S]*?)<\/style>/)?.[1] ?? '';

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

  it('defines a scroll offset for fixed-header anchor targets', () => {
    expect(appPageStyles).toContain(`--app-header-scroll-offset: ${APP_HEADER_SCROLL_OFFSET}`);
    expect(appPageStyles).toContain(
      `--app-header-scroll-offset: ${APP_HEADER_SCROLL_OFFSET_MOBILE}`,
    );
  });
});
