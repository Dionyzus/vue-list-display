import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { GAMES_CATALOG_ANCHOR_ID } from './common/pageLayout.js';
import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

function mountMainView() {
  return mount(App, {
    global: {
      stubs: {
        AppNavigation: true,
      },
    },
  });
}

function isRenderedBefore(earlier, later) {
  return earlier.element.compareDocumentPosition(later.element) === Node.DOCUMENT_POSITION_FOLLOWING;
}

describe('App', () => {
  it('renders the hero above catalog search and category filter controls', () => {
    const wrapper = mountMainView();

    const hero = wrapper.find('[data-testid="hero-banner"]');
    const searchInput = wrapper.find('input[placeholder="Search..."]');
    const categoryFilter = wrapper.find('select');

    expect(hero.exists()).toBe(true);
    expect(searchInput.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);
    expect(isRenderedBefore(hero, searchInput)).toBe(true);
    expect(isRenderedBefore(hero, categoryFilter)).toBe(true);
  });

  it('keeps the hero visible when the catalog has zero games', () => {
    const wrapper = mountMainView();
    const hero = wrapper.find('[data-testid="hero-banner"]');

    expect(hero.exists()).toBe(true);
    expect(hero.find('p').text()).toBe('Browse our game catalog');
    expect(wrapper.findAll('.grid-item')).toHaveLength(0);
  });

  it('exposes a document-level scroll target on the catalog filter section', () => {
    const wrapper = mountMainView();
    const anchor = wrapper.find(`#${GAMES_CATALOG_ANCHOR_ID}`);

    expect(anchor.exists()).toBe(true);
    expect(anchor.find('input[placeholder="Search..."]').exists()).toBe(true);
    expect(anchor.find('select').exists()).toBe(true);
  });

  it('scrolls to the catalog filter section when Browse games is activated', async () => {
    const scrollIntoView = vi.fn();
    const wrapper = mountMainView();

    const anchor = wrapper.find(`#${GAMES_CATALOG_ANCHOR_ID}`);
    anchor.element.scrollIntoView = scrollIntoView;

    vi.spyOn(document, 'getElementById').mockImplementation((id) =>
      id === GAMES_CATALOG_ANCHOR_ID ? anchor.element : null,
    );

    await wrapper.find('[data-testid="hero-banner"]').find('button').trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    vi.restoreAllMocks();
  });
});
