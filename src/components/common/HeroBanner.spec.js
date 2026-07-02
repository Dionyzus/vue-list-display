import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

const HEADLINE = 'Online Casino';
const TAGLINE = 'Browse our game catalog';
const CTA_LABEL = 'Browse games';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('h1').text()).toBe(HEADLINE);
    expect(wrapper.get('p').text()).toBe(TAGLINE);
    expect(wrapper.get('button').text()).toBe(CTA_LABEL);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.get('button');

    expect(button.attributes('type')).toBe('button');
  });

  describe('scroll to catalog', () => {
    let anchor;

    beforeEach(() => {
      anchor = document.createElement('div');
      anchor.id = CATALOG_FILTER_ANCHOR_ID;
      anchor.scrollIntoView = vi.fn();
      document.body.appendChild(anchor);
    });

    afterEach(() => {
      if (anchor?.parentNode) {
        document.body.removeChild(anchor);
      }
    });

    it('scrolls to the catalog filter anchor when CTA is clicked', async () => {
      const wrapper = mount(HeroBanner);

      await wrapper.get('button').trigger('click');

      expect(anchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('does nothing when the catalog filter anchor is missing', async () => {
      document.body.removeChild(anchor);
      anchor = null;

      const wrapper = mount(HeroBanner);

      await expect(wrapper.get('button').trigger('click')).resolves.not.toThrow();
    });
  });

  describe('responsive layout at 768px breakpoint', () => {
    let originalInnerWidth;

    const setViewportWidth = (width) => {
      Object.defineProperty(window, 'innerWidth', {
        configurable: true,
        writable: true,
        value: width,
      });
      window.dispatchEvent(new Event('resize'));
    };

    beforeEach(() => {
      originalInnerWidth = window.innerWidth;
    });

    afterEach(() => {
      setViewportWidth(originalInnerWidth);
    });

    it('keeps PRD copy and CTA usable below the 768px breakpoint', async () => {
      setViewportWidth(767);
      const wrapper = mount(HeroBanner);

      expect(wrapper.get('h1').text()).toBe(HEADLINE);
      expect(wrapper.get('p').text()).toBe(TAGLINE);
      expect(wrapper.get('button').text()).toBe(CTA_LABEL);

      const anchor = document.createElement('div');
      anchor.id = CATALOG_FILTER_ANCHOR_ID;
      anchor.scrollIntoView = vi.fn();
      document.body.appendChild(anchor);

      await wrapper.get('button').trigger('click');

      expect(anchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });

      document.body.removeChild(anchor);
    });
  });
});
