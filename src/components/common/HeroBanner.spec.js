import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getScrollBehavior } from '../../common/scrollToElement';
import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

const heroBannerSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'HeroBanner.vue'),
  'utf8',
);

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders PRD copy for headline, supporting line, and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');

    wrapper.unmount();
  });

  it('uses brand burgundy background and viewport-width layout', () => {
    const wrapper = mount(HeroBanner);

    expect(heroBannerSource).toContain('background-color: #630000');
    expect(heroBannerSource).toContain('width: 100vw');
    expect(heroBannerSource).toContain('margin-left: calc(50% - 50vw)');

    wrapper.unmount();
  });

  it('defines reduced mobile spacing and typography without hiding the supporting line', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-supporting').isVisible()).toBe(true);
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');

    const mobileBlock = heroBannerSource.match(
      /@media screen and \(max-width: 768px\)\s*\{[\s\S]*?\n\}/,
    )?.[0];

    expect(mobileBlock).toBeTruthy();
    expect(mobileBlock).toContain('padding: 1.5rem 1rem');
    expect(mobileBlock).toContain('font-size: 1.75rem');
    expect(mobileBlock).toContain('font-size: 1rem');
    expect(mobileBlock).toContain('font-size: 0.875rem');
    expect(mobileBlock).not.toContain('display: none');

    wrapper.unmount();
  });

  it('exposes a keyboard-focusable CTA without promo chrome', () => {
    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false);

    const cta = wrapper.find('.hero-cta');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');

    cta.element.focus();
    expect(document.activeElement).toBe(cta.element);

    wrapper.unmount();
  });

  it('scrolls to the catalog filter section when the CTA is clicked', async () => {
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    await wrapper.find('.hero-cta').trigger('click');

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

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    const cta = wrapper.find('.hero-cta');
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

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    await wrapper.find('.hero-cta').trigger('click');

    const status = wrapper.find('.hero-scroll-status');
    expect(status.attributes('role')).toBe('status');
    expect(status.attributes('aria-live')).toBe('polite');
    expect(status.text()).toBe('Game catalog is unavailable. Please try again later.');

    wrapper.unmount();
  });
});
