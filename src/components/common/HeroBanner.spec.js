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

  it('uses burgundy background with no featured content', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero').exists()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false);
  });

  it('renders a focusable browse games button', () => {
    const wrapper = mount(HeroBanner);

    const button = wrapper.find('.hero-cta');
    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });
});
