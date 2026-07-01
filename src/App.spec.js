import { config, mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it } from 'vitest';

import { CATALOG_FILTER_SECTION_ID } from '@/common/constants';

import App from './App.vue';

beforeAll(() => {
  config.global.stubs = {
    'font-awesome-icon': true,
  };
  config.global.directives = {
    lazy: {},
  };
});

describe('App main view', () => {
  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mount(App);

    const hero = wrapper.find('[data-testid="hero-banner"]');
    const search = wrapper.find('input[placeholder="Search..."]');
    const categoryFilter = wrapper.find(`#${CATALOG_FILTER_SECTION_ID} select`);

    expect(hero.exists()).toBe(true);
    expect(search.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);
    expect(hero.element.compareDocumentPosition(search.element) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(hero.element.compareDocumentPosition(categoryFilter.element) & Node.DOCUMENT_POSITION_FOLLOWING).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
