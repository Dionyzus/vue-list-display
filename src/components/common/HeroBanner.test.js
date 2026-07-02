import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import HeroBanner from './HeroBanner.vue';

const heroBannerStyles = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'HeroBanner.vue'),
  'utf8',
).match(/<style scoped>([\s\S]*?)<\/style>/)?.[1] ?? '';

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

function mountHeroBanner() {
  return mount(HeroBanner, {
    attachTo: document.body,
  });
}

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders headline, supporting line, and CTA with exact copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-banner__cta').text()).toBe('Browse games');
  });

  it('uses the hero-banner root element with supporting content always visible', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('section.hero-banner').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__supporting').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__headline').exists()).toBe(true);
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mountHeroBanner();
    const button = wrapper.find('.hero-banner__cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBeUndefined();

    button.element.focus();
    expect(document.activeElement).toBe(button.element);
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
