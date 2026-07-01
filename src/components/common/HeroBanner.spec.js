import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getScrollBehavior } from '../../common/scrollToElement';
import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

const heroBannerStyles = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'HeroBanner.vue'),
  'utf8',
);

const HERO_COPY = {
  headline: 'Online Casino',
  supporting: 'Browse our game catalog',
  cta: 'Browse games',
};

function mountHeroBanner() {
  return mount(HeroBanner);
}

function heroCta(wrapper) {
  return wrapper.get('section[aria-labelledby="hero-headline"] button[type="button"]');
}

function heroSupportingLine(wrapper) {
  return wrapper.find('section[aria-labelledby="hero-headline"] p:not([role="status"])');
}

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders PRD copy for headline, supporting line, and CTA', () => {
    const wrapper = mountHeroBanner();

    expect(wrapper.find('#hero-headline').text()).toBe(HERO_COPY.headline);
    expect(heroSupportingLine(wrapper).text()).toBe(HERO_COPY.supporting);
    expect(heroCta(wrapper).text()).toBe(HERO_COPY.cta);

    wrapper.unmount();
  });

  it('applies reduced spacing and typography at the 768px breakpoint', () => {
    const wrapper = mountHeroBanner();

    const mobileBlock = heroBannerStyles.match(
      /@media screen and \(max-width: 768px\)\s*\{[\s\S]*?\n\}/,
    )?.[0];

    expect(mobileBlock).toBeTruthy();
    expect(mobileBlock).toContain('padding: 1.5rem 1rem');
    expect(mobileBlock).toContain('font-size: 1.75rem');
    expect(mobileBlock).toContain('font-size: 1rem');
    expect(mobileBlock).toContain('font-size: 0.875rem');
    expect(mobileBlock).not.toContain('display: none');
    expect(heroSupportingLine(wrapper).isVisible()).toBe(true);
    expect(heroSupportingLine(wrapper).text()).toBe(HERO_COPY.supporting);

    wrapper.unmount();
  });

  it('scrolls to the catalog filter section when the CTA is clicked', async () => {
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mountHeroBanner();
    document.body.appendChild(wrapper.element);

    await heroCta(wrapper).trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: getScrollBehavior(),
      block: 'start',
    });

    wrapper.unmount();
    document.body.removeChild(target);
  });

  it('scrolls to the catalog filter section when Enter or Space activates the focused CTA', async () => {
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mountHeroBanner();
    document.body.appendChild(wrapper.element);

    const cta = heroCta(wrapper);
    cta.element.focus();

    await cta.trigger('keydown', { key: 'Enter' });
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

    target.scrollIntoView.mockClear();

    await cta.trigger('keydown', { key: ' ' });
    await cta.trigger('keyup', { key: ' ' });
    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);

    wrapper.unmount();
    document.body.removeChild(target);
  });

  it('announces when the catalog scroll target is missing', async () => {
    document.getElementById(CATALOG_SCROLL_TARGET_ID)?.remove();

    const wrapper = mountHeroBanner();
    document.body.appendChild(wrapper.element);

    await heroCta(wrapper).trigger('click');

    const status = wrapper.find('[role="status"][aria-live="polite"]');
    expect(status.text()).toBe('Game catalog is unavailable. Please try again later.');

    wrapper.unmount();
  });
});
