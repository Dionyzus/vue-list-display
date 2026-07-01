import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from './common/constants';
import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

const mountApp = () =>
  mount(App, {
    global: {
      stubs: {
        'font-awesome-icon': true,
      },
      directives: {
        lazy: {},
      },
    },
  });

const precedesInDocument = (before, after) =>
  (before.compareDocumentPosition(after) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;

describe('App', () => {
  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mountApp();

    const hero = wrapper.get('[aria-label="Welcome"]');
    const searchInput = wrapper.get('input[placeholder="Search..."]');
    const categorySelect = wrapper.get('select');
    const catalogAnchor = wrapper.get(`#${CATALOG_SCROLL_TARGET_ID}`);

    expect(precedesInDocument(hero.element, searchInput.element)).toBe(true);
    expect(precedesInDocument(hero.element, categorySelect.element)).toBe(true);
    expect(precedesInDocument(hero.element, catalogAnchor.element)).toBe(true);
    expect(catalogAnchor.find('input[placeholder="Search..."]').exists()).toBe(true);
    expect(catalogAnchor.find('select').exists()).toBe(true);
  });

  it('renders the hero when the catalog has zero games', () => {
    const wrapper = mountApp();

    expect(wrapper.get('[aria-label="Welcome"]').exists()).toBe(true);
    expect(wrapper.get('input[placeholder="Search..."]').exists()).toBe(true);
    expect(wrapper.get('select').exists()).toBe(true);
    expect(wrapper.get('[aria-label="Next Page"]').attributes('disabled')).toBeDefined();
  });
});
