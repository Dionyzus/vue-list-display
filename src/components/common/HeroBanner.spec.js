import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import { catalogScroll } from '../../utils/scrollToCatalog.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

const HERO_SECTION = 'section[aria-labelledby="hero-headline"]';

const heroStyleBlock = (() => {
  const styleBlock = heroBannerSource.match(/<style[^>]*>([\s\S]*?)<\/style>/i);

  return styleBlock ? styleBlock[1] : '';
})();

// jsdom applies top-level author CSS to computed styles but ignores @media
// blocks, so we faithfully simulate the cascade for a given viewport width:
// evaluate each media query against the width and flatten the matching blocks
// to top-level before reading real computed styles off the mounted DOM.
const mediaMatchesWidth = (mediaText, width) => {
  const constraints = mediaText.match(/\((?:min|max)-width:[^)]*\)/g) ?? [];

  if (constraints.length === 0) {
    throw new Error(`Unsupported media query without a width feature: "${mediaText}"`);
  }

  return constraints.every(constraint => {
    const parsed = constraint.match(/\((min|max)-width:\s*(\d+(?:\.\d+)?)px\)/);

    if (!parsed) {
      throw new Error(`Unsupported media feature in "${mediaText}": "${constraint}"`);
    }

    const [, kind, value] = parsed;
    const boundary = Number.parseFloat(value);

    return kind === 'max' ? width <= boundary : width >= boundary;
  });
};

const injectStyleSheet = css => {
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  return { sheet: styleEl.sheet, cleanup: () => styleEl.remove() };
};

const effectiveCssForViewport = width => {
  const { sheet, cleanup } = injectStyleSheet(heroStyleBlock);

  try {
    const parts = [];

    for (const rule of Array.from(sheet.cssRules)) {
      if (rule.type === CSSRule.MEDIA_RULE) {
        if (mediaMatchesWidth(rule.media.mediaText, width)) {
          for (const inner of Array.from(rule.cssRules)) parts.push(inner.cssText);
        }
      } else {
        parts.push(rule.cssText);
      }
    }

    return parts.join('\n');
  } finally {
    cleanup();
  }
};

const measureHeroAtViewport = width => {
  const { cleanup } = injectStyleSheet(effectiveCssForViewport(width));
  const wrapper = mount(HeroBanner);
  document.body.appendChild(wrapper.element);

  try {
    const headline = window.getComputedStyle(wrapper.get('#hero-headline').element);
    const supporting = window.getComputedStyle(wrapper.get(`${HERO_SECTION} p`).element);
    const hero = window.getComputedStyle(wrapper.get(HERO_SECTION).element);

    return {
      headlineFontSize: Number.parseFloat(headline.fontSize),
      supportingFontSize: Number.parseFloat(supporting.fontSize),
      heroPadding: hero.padding,
    };
  } finally {
    wrapper.unmount();
    cleanup();
  }
};

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

    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    return { wrapper, catalogAnchor };
  };

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('#hero-headline').text()).toBe('Online Casino');
    expect(wrapper.get(`${HERO_SECTION} p`).text()).toBe('Browse our game catalog');
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

  it('renders brand burgundy chrome without decorative image or carousel chrome', () => {
    const { cleanup } = injectStyleSheet(heroStyleBlock);
    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    try {
      const hero = window.getComputedStyle(wrapper.get(HERO_SECTION).element);

      expect(hero.backgroundColor).toBe('rgb(99, 0, 0)');
      expect(hero.color).toBe('rgb(255, 255, 255)');
      expect(wrapper.find('img').exists()).toBe(false);
      expect(wrapper.find('[class*="carousel"]').exists()).toBe(false);
      expect(wrapper.find('[aria-label*="dismiss" i]').exists()).toBe(false);
    } finally {
      wrapper.unmount();
      cleanup();
    }
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

    await wrapper.get('button[type="button"]').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls the catalog anchor into view when the CTA is activated with %j',
    async key => {
      const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

      await wrapper.get('button[type="button"]').trigger('keydown', { key });

      expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    },
  );

  it('tightens hero spacing and typography at the 768px viewport', () => {
    const hasMobileBreakpoint = /@media[^{]*\(\s*max-width:\s*768px\s*\)/.test(heroStyleBlock);
    expect(hasMobileBreakpoint, 'expected a max-width: 768px media query').toBe(true);

    const desktop = measureHeroAtViewport(1024);
    const mobile = measureHeroAtViewport(768);

    expect(
      mobile.headlineFontSize,
      'headline font-size should shrink at the 768px breakpoint',
    ).toBeLessThan(desktop.headlineFontSize);
    expect(
      mobile.supportingFontSize,
      'supporting copy font-size should shrink at the 768px breakpoint',
    ).toBeLessThan(desktop.supportingFontSize);
    expect(
      mobile.heroPadding,
      'hero padding should tighten at the 768px breakpoint',
    ).not.toBe(desktop.heroPadding);
  });
});
