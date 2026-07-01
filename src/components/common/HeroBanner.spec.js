import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders PRD copy for headline, supporting line, and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('exposes a focusable CTA without promo chrome', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false);

    const cta = wrapper.find('.hero-cta');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });
});
