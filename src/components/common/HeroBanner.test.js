import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-banner__cta').text()).toBe('Browse games');
  });

  it('is a static focusable strip without images or dismiss controls', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label*="dismiss" i]').exists()).toBe(false);

    const cta = wrapper.find('.hero-banner__cta');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });
});
