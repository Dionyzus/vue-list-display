import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-banner__cta').text()).toBe('Browse games');
  });

  it('uses the hero-banner root element with supporting content always visible', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('section.hero-banner').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__supporting').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__headline').exists()).toBe(true);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.find('.hero-banner__cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });
});
