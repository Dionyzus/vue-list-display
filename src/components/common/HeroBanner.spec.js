import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('[data-testid="hero-headline"]').text()).toBe('Online Casino');
    expect(wrapper.find('[data-testid="hero-supporting"]').text()).toBe('Browse our game catalog');
    expect(wrapper.find('[data-testid="hero-cta"]').text()).toBe('Browse games');
  });

  it('uses burgundy background and light text styling', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('[data-testid="hero-banner"]');

    expect(hero.exists()).toBe(true);
    expect(hero.attributes('style')).toContain('background-color: rgb(99, 0, 0)');
    expect(hero.classes()).toContain('hero-banner');
  });

  it('exposes a focusable Browse games button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('[data-testid="hero-cta"]');

    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });
});
