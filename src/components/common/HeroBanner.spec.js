import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import {
  HERO_CTA_LABEL,
  HERO_HEADLINE,
  HERO_SUPPORTING,
} from '../../common/heroCopy.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('h1').text()).toBe(HERO_HEADLINE);
    expect(wrapper.get('p').text()).toBe(HERO_SUPPORTING);
    expect(wrapper.get('button').text()).toBe(HERO_CTA_LABEL);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.get('button').element;

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
    await wrapper.get('button').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.stringMatching(/^(smooth|auto)$/),
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);

    await wrapper.get('button').trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.stringMatching(/^(smooth|auto)$/),
      block: 'start',
    });
  });

  it('renders static hero content with no imagery, dismiss control, or carousel', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label*="dismiss" i]').exists()).toBe(false);
    // A carousel would rotate multiple slides (several headings) and expose
    // extra navigation controls; the static hero has exactly one heading and
    // one button (the CTA). Assert that behaviour rather than a styling class.
    expect(wrapper.findAll('h1').length).toBe(1);
    expect(wrapper.findAll('button').length).toBe(1);
  });

  it('shrinks hero typography at the 768px mobile breakpoint', () => {
    // Scoped SFC styles are not injected into jsdom, so computed-style / layout
    // assertions are not available here. Inspect the compiled source to confirm
    // the responsive intent -- a 768px breakpoint that reduces the headline size
    // -- without pinning brittle exact spacing/typography literals.
    expect(heroBannerSource).toMatch(/@media[^{]*max-width:\s*768px/);

    const headlineFontSizes = [
      ...heroBannerSource.matchAll(/\.hero-headline\s*\{[^}]*font-size:\s*([\d.]+)rem/g),
    ].map(match => Number.parseFloat(match[1]));

    expect(headlineFontSizes.length).toBeGreaterThanOrEqual(2);
    expect(Math.min(...headlineFontSizes)).toBeLessThan(Math.max(...headlineFontSizes));
  });
});
