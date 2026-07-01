import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getScrollBehavior } from '../../common/scrollToElement';
import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

const HERO_COPY = {
  headline: 'Online Casino',
  supporting: 'Browse our game catalog',
  cta: 'Browse games',
};

function mountHeroBanner() {
  return mount(HeroBanner);
}

function heroCta(wrapper) {
  return wrapper.find('button', { text: HERO_COPY.cta });
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
    expect(heroCta(wrapper).exists()).toBe(true);

    wrapper.unmount();
  });

  it('keeps the supporting line visible at mobile viewport widths', () => {
    vi.stubGlobal(
      'matchMedia',
      vi.fn(query => ({
        matches: query.includes('max-width: 768px'),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      })),
    );

    const wrapper = mountHeroBanner();

    expect(heroSupportingLine(wrapper).isVisible()).toBe(true);
    expect(heroSupportingLine(wrapper).text()).toBe(HERO_COPY.supporting);

    wrapper.unmount();
    vi.unstubAllGlobals();
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
