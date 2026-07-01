import { config, mount } from '@vue/test-utils';
import { beforeAll, describe, expect, it, vi } from 'vitest';

vi.mock('@/components/Games/data.js', () => ({
  default: [],
}));

import App from './App.vue';

beforeAll(() => {
  config.global.stubs = {
    'font-awesome-icon': true,
  };
  config.global.directives = {
    lazy: {},
  };
});

describe('App with empty catalog', () => {
  it('still renders the hero when there are zero games', () => {
    const wrapper = mount(App);

    expect(wrapper.find('[data-testid="hero-banner"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="hero-headline"]').text()).toBe('Online Casino');
    expect(wrapper.find('[data-testid="hero-cta"]').text()).toBe('Browse games');
  });
});
