import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from './common/constants';
import App from './App.vue';

function findBrowseGamesButton(wrapper) {
  return wrapper.get('[aria-label="Welcome"] button');
}

describe('App', () => {
  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mount(App);

    const hero = wrapper.get('[aria-label="Welcome"]');
    const searchInput = wrapper.get('input[placeholder="Search..."]');
    const categoryFilter = wrapper.get('select');

    expect(hero.element.compareDocumentPosition(searchInput.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
    expect(hero.element.compareDocumentPosition(categoryFilter.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('scrolls to the catalog filter section when browse games is activated', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockReturnValue(target);

    const wrapper = mount(App);
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(document.getElementById).toHaveBeenCalledWith(CATALOG_SCROLL_TARGET_ID);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
