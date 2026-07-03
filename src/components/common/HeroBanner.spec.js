import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import heroBannerSource from './HeroBanner.vue?raw';
import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders PRD headline, supporting line, and CTA copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('#hero-headline').text()).toBe('Online Casino');
    expect(wrapper.get('p').text()).toBe('Browse our game catalog');
    expect(wrapper.get('button').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.get('button[type="button"]').element;

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
    await wrapper.get('button').trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.any(String),
      block: 'start',
    });
  });

  it('scopes responsive spacing and typography at the 768px breakpoint', () => {
    expect(heroBannerSource).toMatch(/@media[^{]*\(max-width:\s*768px\)/);
    expect(heroBannerSource).toContain('padding: 1rem 0.5rem');
    expect(heroBannerSource).toContain('font-size: 1.5rem');
    expect(heroBannerSource).toContain('font-size: 0.875rem');
  });
});
