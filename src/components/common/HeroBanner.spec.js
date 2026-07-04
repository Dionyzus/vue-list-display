import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import { catalogScroll } from '../../utils/scrollToCatalog.js';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';
import { HERO_CTA_LABEL, HERO_HEADLINE, HERO_SUPPORTING } from './heroCopy.js';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  const mountWithCatalogAnchor = () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    return {
      wrapper: mount(HeroBanner),
      catalogAnchor,
    };
  };

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

  it('smooth-scrolls the catalog anchor into view when the CTA is clicked', async () => {
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);
    const { wrapper, catalogAnchor } = mountWithCatalogAnchor();

    await wrapper.get('button').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);
    const { wrapper, catalogAnchor } = mountWithCatalogAnchor();

    await wrapper.get('button').trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('renders no decorative chrome (no imagery, dismiss control, or carousel)', () => {
    const wrapper = mount(HeroBanner);

    const hasDismissControl = wrapper
      .findAll('[aria-label]')
      .some(el => /dismiss|close/i.test(el.attributes('aria-label') ?? ''));

    expect(wrapper.find('img').exists()).toBe(false);
    expect(hasDismissControl).toBe(false);
    expect(wrapper.find('[aria-roledescription="carousel"]').exists()).toBe(false);
    expect(wrapper.findAll('button').length).toBe(1);
  });

  it('scopes responsive spacing and typography at the 768px breakpoint', () => {
    // jsdom does not apply scoped-component CSS or evaluate media queries, so the
    // optional 768px coverage is asserted against the component's style source.
    expect(heroBannerSource).toMatch(/@media[^{]*\(max-width:\s*768px\)/);
    expect(heroBannerSource).toContain('padding: 1rem 0.5rem');
    expect(heroBannerSource).toContain('font-size: 1.5rem');
    expect(heroBannerSource).toContain('font-size: 0.875rem');
  });
});
