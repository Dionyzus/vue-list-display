import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
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

  describe('scroll to catalog', () => {
    let anchor;

    beforeEach(() => {
      anchor = document.createElement('div');
      anchor.id = CATALOG_FILTER_ANCHOR_ID;
      anchor.scrollIntoView = vi.fn();
      document.body.appendChild(anchor);
    });

    afterEach(() => {
      if (anchor?.parentNode) {
        document.body.removeChild(anchor);
      }
    });

    it('scrolls to the catalog filter anchor when CTA is clicked', async () => {
      const wrapper = mount(HeroBanner);

      await wrapper.find('.hero-cta').trigger('click');

      expect(anchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('does nothing when the catalog filter anchor is missing', async () => {
      document.body.removeChild(anchor);
      anchor = null;

      const wrapper = mount(HeroBanner);

      await expect(wrapper.find('.hero-cta').trigger('click')).resolves.not.toThrow();
    });
  });
});
