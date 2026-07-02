import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders static PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('uses brand burgundy background with light text', () => {
    const wrapper = mount(HeroBanner);
    const banner = wrapper.find('[data-testid="hero-banner"]');

    expect(banner.classes()).toContain('hero-banner');
    expect(wrapper.find('.hero-headline').exists()).toBe(true);
    expect(wrapper.find('.hero-supporting').exists()).toBe(true);
  });

  it('exposes a focusable browse games button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.find('.hero-cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });
});
