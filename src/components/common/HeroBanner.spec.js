import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import {
  findBrowseGamesButton,
  findHeroSection,
  HERO_CTA_LABEL,
  HERO_HEADLINE,
  HERO_SUPPORTING,
} from '../../test/heroBanner.js';
import { catalogScroll } from '../../utils/scrollToCatalog.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

const mountCatalogAnchor = () => {
  const catalogAnchor = document.createElement('div');
  catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
  catalogAnchor.scrollIntoView = vi.fn();
  document.body.appendChild(catalogAnchor);

  return catalogAnchor;
};

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders PRD headline, supporting line, and CTA copy', () => {
    const wrapper = mount(HeroBanner);
    const hero = findHeroSection(wrapper);

    expect(hero.find('h1').text()).toBe(HERO_HEADLINE);
    expect(hero.text()).toContain(HERO_SUPPORTING);
    expect(findBrowseGamesButton(wrapper).text()).toBe(HERO_CTA_LABEL);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = findBrowseGamesButton(wrapper).element;

    expect(cta.tagName).toBe('BUTTON');
    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const catalogAnchor = mountCatalogAnchor();
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    const wrapper = mount(HeroBanner);
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    const catalogAnchor = mountCatalogAnchor();
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    const wrapper = mount(HeroBanner);
    await findBrowseGamesButton(wrapper).trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
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

  // jsdom does not evaluate media queries, so the 768px responsive rules cannot
  // be exercised behaviorally here; this asserts the SFC declares them as a
  // source-level style contract rather than pretending to verify layout.
  it('declares responsive spacing and typography rules under the 768px breakpoint', () => {
    expect(heroBannerSource).toMatch(/@media[^{]*\(max-width:\s*768px\)/);
    expect(heroBannerSource).toContain('padding: 1rem 0.5rem');
    expect(heroBannerSource).toContain('font-size: 1.5rem');
    expect(heroBannerSource).toContain('font-size: 0.875rem');
  });
});
