import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import GameItem from './components/Games/GameItem.vue';
import HeroBanner from './components/common/HeroBanner.vue';
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

  it('keeps the hero visible when the catalog has zero matching games', async () => {
    const wrapper = mountMainView();

    await wrapper.find('input[placeholder="Search..."]').setValue('__no_matching_games__');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(HeroBanner).exists()).toBe(true);
    expect(wrapper.find('#hero-headline').text()).toBe(HERO_COPY.headline);
    expect(wrapper.find('button', { text: HERO_COPY.cta }).exists()).toBe(true);
    expect(wrapper.findAllComponents(GameItem)).toHaveLength(0);

    wrapper.unmount();
  });

  it('scrolls from the hero CTA to the catalog filter section', async () => {
    const wrapper = mountMainView();
    document.body.appendChild(wrapper.element);

    const catalogTarget = document.getElementById(CATALOG_SCROLL_TARGET_ID);
    expect(catalogTarget).not.toBeNull();

    catalogTarget.scrollIntoView = vi.fn();

    await wrapper.find('button', { text: HERO_COPY.cta }).trigger('click');

    expect(catalogTarget.scrollIntoView).toHaveBeenCalledWith({
      behavior: getScrollBehavior(),
      block: 'start',
    });

    wrapper.unmount();
  });
});
