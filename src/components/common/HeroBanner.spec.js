import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import heroBannerSource from './HeroBanner.vue?raw';
import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  const mountCatalogAnchor = () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    return catalogAnchor;
  };

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('section[aria-labelledby="hero-headline"]');

    expect(hero.find('h1').text()).toBe('Online Casino');
    expect(hero.find('p').text()).toBe('Browse our game catalog');
    expect(hero.find('button').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('section[aria-labelledby="hero-headline"] button').element;

    expect(cta).toBeTruthy();
    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const catalogAnchor = mountCatalogAnchor();

    const wrapper = mount(HeroBanner);
    await wrapper.find('section[aria-labelledby="hero-headline"] button').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledOnce();
    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({
        block: 'start',
        behavior: expect.stringMatching(/^(smooth|auto)$/),
      }),
    );
  });

  it.each(['Enter', ' '])(
    'scrolls the catalog anchor into view when the CTA is activated with %j',
    async key => {
      const catalogAnchor = mountCatalogAnchor();

      const wrapper = mount(HeroBanner);
      const cta = wrapper.find('section[aria-labelledby="hero-headline"] button');

      await cta.trigger('keydown', { key });

      expect(catalogAnchor.scrollIntoView).toHaveBeenCalledOnce();
      expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith(
        expect.objectContaining({
          block: 'start',
          behavior: expect.stringMatching(/^(smooth|auto)$/),
        }),
      );
    },
  );

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
