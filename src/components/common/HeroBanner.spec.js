import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import heroBannerSource from './HeroBanner.vue?raw';
import HeroBanner from './HeroBanner.vue';

const HERO_HEADLINE = 'Online Casino';
const HERO_SUPPORTING = 'Browse our game catalog';
const HERO_CTA_LABEL = 'Browse games';

const findHeroSection = wrapper => wrapper.find('section[aria-labelledby="hero-headline"]');
const findHeroHeadline = wrapper => wrapper.find('#hero-headline');
const findHeroSupporting = wrapper => findHeroSection(wrapper).find('p');
const findBrowseGamesCta = wrapper => wrapper.find('button[type="button"]');

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders PRD headline, supporting line, and CTA copy', () => {
    const wrapper = mount(HeroBanner);

    expect(findHeroHeadline(wrapper).text()).toBe(HERO_HEADLINE);
    expect(findHeroSupporting(wrapper).text()).toBe(HERO_SUPPORTING);
    expect(findBrowseGamesCta(wrapper).text()).toBe(HERO_CTA_LABEL);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = findBrowseGamesCta(wrapper).element;

    expect(cta).toBeTruthy();
    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    await findBrowseGamesCta(wrapper).trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.any(String),
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    const cta = findBrowseGamesCta(wrapper);

    await cta.trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.any(String),
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

  it('scopes responsive spacing and typography at the 768px breakpoint', () => {
    expect(heroBannerSource).toMatch(/@media[^{]*\(max-width:\s*768px\)/);
    expect(heroBannerSource).toContain('padding: 1rem 0.5rem');
    expect(heroBannerSource).toContain('font-size: 1.5rem');
    expect(heroBannerSource).toContain('font-size: 0.875rem');
  });
});
