import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from './common/constants';
import App from './App.vue';

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App);

    const content = wrapper.find('.content');
    const hero = content.find('.hero');
    const catalog = content.find('.game-grid');

    expect(hero.exists()).toBe(true);
    expect(catalog.exists()).toBe(true);
    expect(hero.element.compareDocumentPosition(catalog.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });

  it('scrolls to the catalog filter section when browse games is activated', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockReturnValue(target);

    const wrapper = mount(App);
    await wrapper.find('.hero-cta').trigger('click');

    expect(document.getElementById).toHaveBeenCalledWith(CATALOG_SCROLL_TARGET_ID);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });
});
