import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

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

  it('uses burgundy background and white text', () => {
    const wrapper = mount(HeroBanner, { attachTo: document.body });
    const banner = wrapper.find('.hero-banner').element;
    const styles = getComputedStyle(banner);

    expect(styles.backgroundColor).toBe('rgb(99, 0, 0)');
    expect(styles.color).toBe('rgb(255, 255, 255)');
  });

  it('spans the viewport width like the navigation chrome', () => {
    const wrapper = mount(HeroBanner, { attachTo: document.body });
    const styles = getComputedStyle(wrapper.find('.hero-banner').element);

    expect(styles.width).toBe('100vw');
    expect(heroBannerSource).toContain('margin-left: calc(50% - 50vw)');
    expect(heroBannerSource).toContain('margin-right: calc(50% - 50vw)');
  });

  it('reduces padding and font sizes at the 768px breakpoint', () => {
    const mobileBlock = heroBannerSource.match(
      /@media screen and \(max-width: 768px\)\s*\{([\s\S]*?)\n\}/,
    )?.[1];

    expect(mobileBlock).toBeTruthy();
    expect(mobileBlock).toContain('padding: 1rem 0.5rem');
    expect(mobileBlock).toContain('font-size: 1.5rem');
    expect(mobileBlock).toContain('font-size: 1rem');
    expect(mobileBlock).toContain('font-size: 0.875rem');
    expect(mobileBlock).toContain('padding: 0.5rem 1rem');
  });
});
