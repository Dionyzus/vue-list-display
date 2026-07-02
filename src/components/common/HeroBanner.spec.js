import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import {
  APP_PAGE_CONTENT_PADDING_VAR,
  APP_PAGE_MOBILE_BREAKPOINT,
  HERO_BANNER_MOBILE_TOKENS,
} from '../../common/pageLayout.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

describe('HeroBanner', () => {
  it('renders static PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('uses brand burgundy background with light text', () => {
    expect(heroBannerSource).toMatch(/\.hero-banner[\s\S]*background-color:\s*#630000/);
    expect(heroBannerSource).toMatch(/\.hero-banner[\s\S]*color:\s*white/);
  });

  it(`reduces padding and font sizes at the ${APP_PAGE_MOBILE_BREAKPOINT} breakpoint`, () => {
    expect(heroBannerSource).toContain(
      `@media screen and (max-width: ${APP_PAGE_MOBILE_BREAKPOINT})`,
    );

    Object.entries(HERO_BANNER_MOBILE_TOKENS).forEach(([token, value]) => {
      expect(heroBannerSource).toContain(`${token}: ${value}`);
    });
  });

  it('uses the shared AppPage content padding token for full-bleed layout', () => {
    expect(heroBannerSource).toContain(`var(${APP_PAGE_CONTENT_PADDING_VAR}, 1rem)`);
  });

  it('exposes a focusable browse games button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.find('.hero-cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBeUndefined();
    expect(button.attributes('tabindex')).toBeUndefined();
    expect(button.element.tabIndex).toBe(0);

    document.body.appendChild(wrapper.element);
    button.element.focus();
    expect(document.activeElement).toBe(button.element);
    expect(heroBannerSource).toMatch(/\.hero-cta:focus-visible\s*\{[^}]*outline:\s*2px solid white/);

    wrapper.element.remove();
  });
});
