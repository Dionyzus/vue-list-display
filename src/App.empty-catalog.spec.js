import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

import App from './App.vue';

describe('App with empty catalog', () => {
  it('still renders the hero banner above catalog controls', () => {
    const wrapper = mount(App);

    const hero = wrapper.get('[aria-label="Welcome"]');
    const searchInput = wrapper.get('input[placeholder="Search..."]');
    const categoryFilter = wrapper.get('select');

    expect(hero.get('h1').text()).toBe('Online Casino');
    expect(hero.element.compareDocumentPosition(searchInput.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(hero.element.compareDocumentPosition(categoryFilter.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
