import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import GameItem from './components/Games/GameItem.vue';

// Empty catalog is a real state of the data module, not a fabricated one: an empty
// array honours the same default-export shape the real module exposes.
vi.mock('./components/Games/data.js', () => ({ default: [] }));

const HEADLINE = 'Online Casino';
const SUPPORTING_LINE = 'Browse our game catalog';
const CTA_LABEL = 'Browse games';

describe('main view with an empty catalog', () => {
  let wrapper;

  afterEach(() => {
    wrapper?.unmount();
    document.body.innerHTML = '';
    vi.resetModules();
  });

  it('still renders the hero banner when there are zero games', async () => {
    const { default: App } = await import('./App.vue');
    wrapper = mount(App, {
      global: {
        stubs: { 'font-awesome-icon': true },
        directives: { lazy: () => {} }
      }
    });

    // No games are rendered (independent of any empty-grid messaging).
    expect(wrapper.findAllComponents(GameItem)).toHaveLength(0);

    const hero = wrapper.find('[aria-label="Welcome"]');
    expect(hero.exists()).toBe(true);
    expect(hero.text()).toContain(HEADLINE);
    expect(hero.text()).toContain(SUPPORTING_LINE);
    expect(hero.find('button').text()).toBe(CTA_LABEL);
  });
});
