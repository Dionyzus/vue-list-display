import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders PRD copy and a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');

    const cta = wrapper.find('.hero-cta');
    expect(cta.text()).toBe('Browse games');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });

  it('is a static hero strip without images, dismiss controls, or carousel content', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('.hero');

    expect(hero.exists()).toBe(true);
    expect(hero.find('img').exists()).toBe(false);
    expect(hero.find('[aria-label="Dismiss"]').exists()).toBe(false);
    expect(hero.findAll('button')).toHaveLength(1);
  });
});
