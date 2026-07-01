import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { getScrollBehavior } from './common/scrollToElement';
import { CATALOG_SCROLL_TARGET_ID } from './common/constants';

const HERO_COPY = {
  headline: 'Online Casino',
  supporting: 'Browse our game catalog',
  cta: 'Browse games',
};

function mountMainView(options = {}) {
  return mount(App, {
    global: {
      stubs: {
        AppNavigation: true,
        ...options.stubs,
      },
    },
    ...options,
  });
}

function isBeforeInDocument(earlierElement, laterElement) {
  return Boolean(
    earlierElement.compareDocumentPosition(laterElement) & Node.DOCUMENT_POSITION_FOLLOWING,
  );
}

function heroCta(wrapper) {
  return wrapper.get('section[aria-labelledby="hero-headline"] button[type="button"]');
}

describe('App', () => {
  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mountMainView();

    const heroHeadline = wrapper.find('#hero-headline');
    const searchInput = wrapper.find('input[placeholder="Search..."]');
    const categorySelect = wrapper.find('select');

    expect(heroHeadline.exists()).toBe(true);
    expect(searchInput.exists()).toBe(true);
    expect(categorySelect.exists()).toBe(true);
    expect(isBeforeInDocument(heroHeadline.element, searchInput.element)).toBe(true);
    expect(isBeforeInDocument(heroHeadline.element, categorySelect.element)).toBe(true);

    wrapper.unmount();
  });

  it('scrolls from the hero CTA to the catalog filter section', async () => {
    const wrapper = mountMainView();
    document.body.appendChild(wrapper.element);

    const catalogTarget = document.getElementById(CATALOG_SCROLL_TARGET_ID);
    expect(catalogTarget).not.toBeNull();

    catalogTarget.scrollIntoView = vi.fn();

    await heroCta(wrapper).trigger('click');

    expect(catalogTarget.scrollIntoView).toHaveBeenCalledWith({
      behavior: getScrollBehavior(),
      block: 'start',
    });

    wrapper.unmount();
  });
});
