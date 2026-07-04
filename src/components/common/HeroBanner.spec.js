import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

const parseScopedStyleSheet = source => {
  const styleBlock = source.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  const styleEl = document.createElement('style');
  styleEl.textContent = styleBlock ? styleBlock[1] : '';
  document.head.appendChild(styleEl);

  return { sheet: styleEl.sheet, cleanup: () => styleEl.remove() };
};

const findRule = (rules, selector) =>
  Array.from(rules).find(rule => rule.selectorText === selector);

const fontSizeOf = rule => parseFloat(rule.style.getPropertyValue('font-size'));

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  const mountHeroWithCatalogAnchor = () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    return { wrapper, catalogAnchor };
  };

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('#hero-headline').text()).toBe('Online Casino');
    expect(wrapper.get('section[aria-labelledby="hero-headline"] p').text()).toBe(
      'Browse our game catalog',
    );
    expect(wrapper.get('button[type="button"]').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.get('button[type="button"]').element;

    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

    await wrapper.get('button[type="button"]').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.stringMatching(/^(smooth|auto)$/),
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls the catalog anchor into view when the CTA is activated with %j',
    async key => {
      const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

      await wrapper.get('button[type="button"]').trigger('keydown', { key });

      expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: expect.stringMatching(/^(smooth|auto)$/),
        block: 'start',
      });
    },
  );

  it('tightens hero spacing and typography at the 768px breakpoint', () => {
    const { sheet, cleanup } = parseScopedStyleSheet(heroBannerSource);

    try {
      const topLevelRules = Array.from(sheet.cssRules);
      const mobileBreakpoint = topLevelRules.find(
        rule =>
          rule.type === CSSRule.MEDIA_RULE &&
          rule.media.mediaText.includes('max-width: 768px'),
      );

      expect(mobileBreakpoint, 'expected a max-width: 768px media query').toBeTruthy();

      const baseHeadline = findRule(topLevelRules, '.hero-headline');
      const baseSupporting = findRule(topLevelRules, '.hero-supporting');
      const baseHero = findRule(topLevelRules, '.hero');

      const mobileRules = mobileBreakpoint.cssRules;
      const mobileHeadline = findRule(mobileRules, '.hero-headline');
      const mobileSupporting = findRule(mobileRules, '.hero-supporting');
      const mobileHero = findRule(mobileRules, '.hero');

      expect(fontSizeOf(mobileHeadline)).toBeLessThan(fontSizeOf(baseHeadline));
      expect(fontSizeOf(mobileSupporting)).toBeLessThan(fontSizeOf(baseSupporting));
      expect(mobileHero.style.getPropertyValue('padding')).not.toBe(
        baseHero.style.getPropertyValue('padding'),
      );
    } finally {
      cleanup();
    }
  });
});
