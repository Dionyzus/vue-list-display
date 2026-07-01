import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_FILTER_SECTION_ID } from '@/common/constants';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  it('renders headline, supporting line, and CTA with exact PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('[data-testid="hero-headline"]').text()).toBe('Online Casino');
    expect(wrapper.find('[data-testid="hero-supporting"]').text()).toBe('Browse our game catalog');
    expect(wrapper.find('[data-testid="hero-cta"]').text()).toBe('Browse games');
  });

  it('uses burgundy background and light text styling', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('[data-testid="hero-banner"]');

    expect(hero.exists()).toBe(true);
    expect(hero.attributes('style')).toContain('background-color: rgb(99, 0, 0)');
    expect(hero.classes()).toContain('hero-banner');
  });

  it('exposes a focusable Browse games button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.find('[data-testid="hero-cta"]');

    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });

  it('scrolls to the catalog filter section when the CTA is activated', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.id = CATALOG_FILTER_SECTION_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner);
    await wrapper.find('[data-testid="hero-cta"]').trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });

    document.body.removeChild(target);
  });

  afterEach(() => {
    document.getElementById(CATALOG_FILTER_SECTION_ID)?.remove();
  });
});
