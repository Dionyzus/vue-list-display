import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';
import heroBannerSource from './HeroBanner.vue?raw';

const PRD_HEADLINE = 'Online Casino';
const PRD_SUPPORTING = 'Browse our game catalog';
const PRD_CTA_LABEL = 'Browse games';

function mountHeroBanner() {
  return mount(HeroBanner, { attachTo: document.body });
}

function mountHeroBannerWithCatalogAnchor() {
  const target = document.createElement('div');
  target.id = CATALOG_FILTER_ANCHOR_ID;
  target.scrollIntoView = vi.fn();
  document.body.append(target);

  return {
    target,
    wrapper: mountHeroBanner(),
  };
}

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders headline, supporting line, and CTA with exact PRD copy', () => {
    const wrapper = mount(HeroBanner);
    const banner = wrapper.get('[aria-label="Welcome"]');

    expect(banner.get('h1').text()).toBe(PRD_HEADLINE);
    expect(banner.get('p').text()).toBe(PRD_SUPPORTING);
    expect(wrapper.get('button').text()).toBe(PRD_CTA_LABEL);
  });

  it('is a static focusable strip without images or dismiss controls', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label*="dismiss" i]').exists()).toBe(false);

    const cta = wrapper.get('button');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });

  it('uses burgundy background and white text', () => {
    const wrapper = mountHeroBanner();
    const banner = wrapper.get('[aria-label="Welcome"]').element;
    const styles = getComputedStyle(banner);

    expect(styles.backgroundColor).toBe('rgb(99, 0, 0)');
    expect(styles.color).toBe('rgb(255, 255, 255)');
  });

  it('spans the viewport width like the navigation chrome', () => {
    const wrapper = mountHeroBanner();
    const styles = getComputedStyle(wrapper.get('[aria-label="Welcome"]').element);

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

  it('scrolls to the catalog filter anchor when the CTA is clicked', () => {
    const { target, wrapper } = mountHeroBannerWithCatalogAnchor();

    wrapper.get('button').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog filter anchor when %s is pressed', async key => {
    const { target, wrapper } = mountHeroBannerWithCatalogAnchor();
    const cta = wrapper.get('button');

    cta.element.focus();
    expect(document.activeElement).toBe(cta.element);

    await cta.trigger('keydown', { key });

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('uses auto scroll behavior when smooth scrolling is unsupported', () => {
    const { target, wrapper } = mountHeroBannerWithCatalogAnchor();

    vi.spyOn(document, 'documentElement', 'get').mockReturnValue({
      style: {},
    });

    wrapper.get('button').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    });
  });

  it('does nothing when the catalog filter anchor is missing', () => {
    const scrollIntoView = vi.fn();
    const wrapper = mountHeroBanner();

    expect(document.getElementById(CATALOG_FILTER_ANCHOR_ID)).toBeNull();
    expect(() => wrapper.get('button').trigger('click')).not.toThrow();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });
});
