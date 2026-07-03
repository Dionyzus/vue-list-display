import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import * as scrollModule from '../../utils/scrollToCatalog.js';
import heroBannerSource from './HeroBanner.vue?raw';
import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('button.hero-cta').element;

    expect(cta).toBeTruthy();
    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls to the catalog filter anchor when the CTA is clicked', async () => {
    const scrollSpy = vi.spyOn(scrollModule, 'scrollToCatalog');

    const wrapper = mount(HeroBanner);
    await wrapper.find('button.hero-cta').trigger('click');

    expect(scrollSpy).toHaveBeenCalledOnce();
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    const scrollSpy = vi.spyOn(scrollModule, 'scrollToCatalog');

    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('button.hero-cta');

    await cta.trigger('keydown', { key });

    expect(scrollSpy).toHaveBeenCalledOnce();
  });

  it('uses brand burgundy background, light text, and no decorative chrome', () => {
    const wrapper = mount(HeroBanner);

    expect(heroBannerSource).toContain('background-color: #630000');
    expect(heroBannerSource).toContain('color: white');
    expect(heroBannerSource).toContain('100vw');
    expect(heroBannerSource).not.toContain('background-image');
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label*="dismiss"]').exists()).toBe(false);
    expect(wrapper.find('[class*="carousel"]').exists()).toBe(false);
  });

  it('scopes responsive spacing and typography at the 768px breakpoint', () => {
    expect(heroBannerSource).toMatch(/@media[^{]*\(max-width:\s*768px\)/);
    expect(heroBannerSource).toContain('padding: 1rem 0.5rem');
    expect(heroBannerSource).toContain('font-size: 1.5rem');
    expect(heroBannerSource).toContain('font-size: 0.875rem');
  });
});
