import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.vue';
import HeroBanner from './components/common/HeroBanner.vue';
import GamesList from './components/Games/GamesList.vue';

describe('App', () => {
  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
          GamesList: { template: '<div class="game-grid">Catalog</div>' },
        },
      },
    });

    const hero = wrapper.findComponent(HeroBanner);
    const catalog = wrapper.find('.game-grid');

    expect(hero.exists()).toBe(true);
    expect(catalog.exists()).toBe(true);

    const content = wrapper.find('.content');
    const children = content.findAll(':scope > *');

    expect(children[0].classes()).toContain('hero');
    expect(children[1].classes()).toContain('game-grid');

    wrapper.unmount();
  });

  it('keeps HeroBanner visible when search filters the catalog to zero games', async () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          AppNavigation: true,
        },
      },
    });

    await wrapper.find('.search-bar input').setValue('__no_matching_games__');
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(HeroBanner).exists()).toBe(true);
    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.findComponent(GamesList).exists()).toBe(true);
    expect(wrapper.findAll('.grid-item').length).toBe(0);

    wrapper.unmount();
  });
});
