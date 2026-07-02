import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/constants';
import { scrollToGameCatalog } from '../../utils/scrollToGameCatalog';
import HeroBanner from './HeroBanner.vue';

const heroBannerStyles = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'HeroBanner.vue'),
  'utf8',
).match(/<style scoped>([\s\S]*?)<\/style>/)?.[1] ?? '';

const HERO_HEADLINE = 'Online Casino';
const HERO_SUPPORTING = 'Browse our game catalog';
const HERO_CTA_LABEL = 'Browse games';

function getMobileMediaBlock(styles) {
  const mediaIndex = styles.indexOf('@media screen and (max-width: 768px)');
  if (mediaIndex === -1) {
    return '';
  }

  const openBrace = styles.indexOf('{', mediaIndex);
  let depth = 0;

  for (let index = openBrace; index < styles.length; index += 1) {
    if (styles[index] === '{') {
      depth += 1;
    }

    if (styles[index] === '}') {
      depth -= 1;

      if (depth === 0) {
        return styles.slice(openBrace + 1, index);
      }
    }
  }

  return '';
}

function removeMobileMediaBlock(styles) {
  const mediaIndex = styles.indexOf('@media screen and (max-width: 768px)');
  if (mediaIndex === -1) {
    return styles;
  }

  const openBrace = styles.indexOf('{', mediaIndex);
  let depth = 0;

  for (let index = openBrace; index < styles.length; index += 1) {
    if (styles[index] === '{') {
      depth += 1;
    }

    if (styles[index] === '}') {
      depth -= 1;

      if (depth === 0) {
        return styles.slice(0, mediaIndex) + styles.slice(index + 1);
      }
    }
  }

  return styles;
}

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
  await button.trigger('keyup', { key });
  button.element.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, detail: 0 }),
  );
}

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('#hero-headline').text()).toBe(HERO_HEADLINE);
    expect(wrapper.text()).toContain(HERO_SUPPORTING);
    expect(findHeroCta(wrapper).text()).toBe(HERO_CTA_LABEL);
  });

  it('uses a labelled hero section with supporting content always visible', () => {
    const wrapper = mount(HeroBanner);
    const hero = findHeroSection(wrapper);

    expect(hero.exists()).toBe(true);
    expect(hero.attributes('aria-labelledby')).toBe('hero-headline');
    expect(wrapper.get('#hero-headline').exists()).toBe(true);
    expect(wrapper.text()).toContain(HERO_SUPPORTING);
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

  it('reports when the catalog anchor is missing instead of silently scrolling', () => {
    mountHeroBanner();

    expect(scrollToGameCatalog()).toBe(false);
  });

  it('uses content-padding breakout instead of viewport-width overflow', () => {
    expect(heroBannerStyles).not.toContain('100vw');
    expect(heroBannerStyles).not.toContain('calc(50% - 50vw)');
    expect(heroBannerStyles).toContain('margin-left: -1rem');
    expect(heroBannerStyles).toContain('margin-right: -1rem');

    const mobileContent = getMobileMediaBlock(heroBannerStyles);

    expect(mobileContent).toContain('margin-left: -0.5rem');
    expect(mobileContent).toContain('margin-right: -0.5rem');
  });

  it('uses default spacing and typography above the mobile breakpoint', () => {
    const baseStyles = removeMobileMediaBlock(heroBannerStyles);

    expect(baseStyles).toContain('padding: 3rem 1.5rem');
    expect(baseStyles).toContain('font-size: 2.5rem');
    expect(baseStyles).toContain('font-size: 1.25rem');
  });

  it('reduces padding and font sizes at the 768px breakpoint', () => {
    const mobileBlock = heroBannerStyles.slice(
      heroBannerStyles.indexOf('@media screen and (max-width: 768px)'),
    );
    const mobileContent = getMobileMediaBlock(heroBannerStyles);

    expect(mobileBlock).toContain('@media screen and (max-width: 768px)');
    expect(mobileContent).toContain('padding: 2rem 1rem');
    expect(mobileContent).toContain('font-size: 1.75rem');
    expect(mobileContent).toContain('font-size: 1rem');
    expect(mobileContent).toContain('padding: 0.625rem 1.25rem');
    expect(mobileContent).toContain('font-size: 0.9375rem');
  });
});
