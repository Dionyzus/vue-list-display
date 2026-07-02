import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  GAME_CATALOG_ANCHOR_ID,
  HERO_BANNER_CTA_LABEL,
  HERO_BANNER_HEADLINE,
  HERO_BANNER_SUPPORTING,
} from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

function findHeroSection(wrapper) {
  return wrapper.find('section[aria-labelledby="hero-headline"]');
}

function findHeroCta(wrapper) {
  return wrapper.find('button[type="button"]');
}

function mountHeroBanner() {
  return mount(HeroBanner, {
    attachTo: document.body,
  });
}

async function activateCtaWithKeyboard(button, key) {
  button.element.focus();
  await button.trigger('keydown', { key });
}

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('#hero-headline').text()).toBe(HERO_BANNER_HEADLINE);
    expect(wrapper.text()).toContain(HERO_BANNER_SUPPORTING);
    expect(findHeroCta(wrapper).text()).toBe(HERO_BANNER_CTA_LABEL);
  });

  it('uses a labelled hero section with supporting content always visible', () => {
    const wrapper = mount(HeroBanner);
    const hero = findHeroSection(wrapper);

    expect(hero.exists()).toBe(true);
    expect(hero.attributes('aria-labelledby')).toBe('hero-headline');
    expect(wrapper.get('#hero-headline').exists()).toBe(true);
    expect(wrapper.text()).toContain(HERO_BANNER_SUPPORTING);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mountHeroBanner();
    const button = findHeroCta(wrapper);

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBeUndefined();

    button.element.focus();
    expect(document.activeElement).toBe(button.element);
  });

  it('scrolls to the catalog filter section when the CTA is clicked', async () => {
    const target = document.createElement('div');
    target.id = GAME_CATALOG_ANCHOR_ID;
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mountHeroBanner();
    await findHeroCta(wrapper).trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog filter section when the CTA is activated with %s',
    async key => {
      const target = document.createElement('div');
      target.id = GAME_CATALOG_ANCHOR_ID;
      target.scrollIntoView = vi.fn();
      document.body.appendChild(target);

      const wrapper = mountHeroBanner();
      const cta = findHeroCta(wrapper);

      await activateCtaWithKeyboard(cta, key);

      expect(document.activeElement).toBe(cta.element);
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    },
  );

  it('does not scroll when the catalog anchor is missing', async () => {
    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).toBeNull();

    const scrollIntoViewMock = vi.fn();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoViewMock,
    });

    const wrapper = mountHeroBanner();
    await findHeroCta(wrapper).trigger('click');

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});
