import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CATEGORIES, PROVIDERS, VOLATILITIES } from './common/constants';

// A faithful, minimal stand-in for the real catalog data module. The real module
// pulls in image assets and 150 generated games; the test only needs a couple of
// games with the same shape to exercise main-view composition.
vi.mock('./components/Games/data.js', () => ({
  default: [
    {
      id: 'game-1',
      title: 'Bars',
      provider: PROVIDERS.AMUSNET_INTERACTIVE_LTD,
      categories: [CATEGORIES.CLASSIC_SLOTS],
      description: 'A classic slot.',
      imageSrc: 'bars.jpg',
      RTP: '90%',
      volatility: VOLATILITIES.MEDIUM
    },
    {
      id: 'game-2',
      title: 'Poker',
      provider: PROVIDERS.PLAYTECH,
      categories: [CATEGORIES.POKER],
      description: 'A table game.',
      imageSrc: 'poker.jpg',
      RTP: '93%',
      volatility: VOLATILITIES.HIGH
    }
  ]
}));

const DOCUMENT_POSITION_FOLLOWING = 4;

let wrapper;

const mountApp = async () => {
  const { default: App } = await import('./App.vue');
  return mount(App, {
    global: {
      stubs: { 'font-awesome-icon': true },
      directives: { lazy: () => {} }
    }
  });
};

describe('main view composition', () => {
  beforeEach(async () => {
    wrapper = await mountApp();
  });

  afterEach(() => {
    wrapper?.unmount();
    document.body.innerHTML = '';
  });

  it('renders the hero banner above the catalog filter controls', () => {
    const hero = wrapper.find('[aria-label="Welcome"]');
    const search = wrapper.find('input[placeholder="Search..."]');
    const categoryFilter = wrapper.find('select');

    expect(hero.exists()).toBe(true);
    expect(search.exists()).toBe(true);
    expect(categoryFilter.exists()).toBe(true);

    // Document order: the hero precedes both the search box and category filter.
    expect(
      hero.element.compareDocumentPosition(search.element) & DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      hero.element.compareDocumentPosition(categoryFilter.element) & DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
