import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

import App from './App.vue';
import GameItem from './components/Games/GameItem.vue';
import HeroBanner from './components/common/HeroBanner.vue';

const HERO_COPY = {
  headline: 'Online Casino',
  supporting: 'Browse our game catalog',
  cta: 'Browse games',
};

function heroCta(wrapper) {
  return wrapper.get('section[aria-labelledby="hero-headline"] button[type="button"]');
}

describe('App with an empty game catalog', () => {
  it('keeps the hero visible when the catalog has zero games', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
        },
      },
    });

    expect(wrapper.findComponent(HeroBanner).exists()).toBe(true);
    expect(wrapper.find('#hero-headline').text()).toBe(HERO_COPY.headline);
    expect(heroCta(wrapper).text()).toBe(HERO_COPY.cta);
    expect(wrapper.findAllComponents(GameItem)).toHaveLength(0);

    wrapper.unmount();
  });
});
