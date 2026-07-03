import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button with no click handler in this slice', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('button.hero-cta');

    expect(cta.exists()).toBe(true);
    expect(cta.attributes('type')).toBe('button');
  });
});
