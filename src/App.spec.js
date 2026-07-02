import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import App from './App.vue';

vi.mock('./components/Games/GamesList.vue', () => ({
  default: {
    name: 'GamesList',
    template: '<div class="games-list-stub" />',
  },
}));

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App);

    const content = wrapper.find('.content');
    const hero = content.find('.hero');
    const catalog = content.find('.games-list-stub');

    expect(hero.exists()).toBe(true);
    expect(catalog.exists()).toBe(true);
    expect(hero.element.compareDocumentPosition(catalog.element)).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING
    );
  });
});
