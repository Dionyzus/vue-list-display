import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-tagline').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('uses brand burgundy background and light text styling', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('.hero');

    expect(hero.exists()).toBe(true);
    expect(hero.element.tagName).toBe('SECTION');
    expect(wrapper.find('.hero-headline').classes()).toContain('hero-headline');
    expect(wrapper.find('.hero-tagline').classes()).toContain('hero-tagline');
    expect(wrapper.find('.hero-cta').classes()).toContain('hero-cta');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.find('.hero-cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });
});
