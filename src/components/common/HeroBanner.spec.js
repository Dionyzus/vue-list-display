import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import HeroBanner from './HeroBanner.vue';

function viewportMatchesMediaText(mediaText, viewportWidth) {
  const maxWidth = mediaText.match(/\(max-width:\s*([\d.]+)px\)/);
  if (maxWidth && viewportWidth > Number(maxWidth[1])) {
    return false;
  }

  const minWidth = mediaText.match(/\(min-width:\s*([\d.]+)px\)/);
  if (minWidth && viewportWidth < Number(minWidth[1])) {
    return false;
  }

  return maxWidth !== null || minWidth !== null;
}

function readStyleProperty(style, property) {
  const kebabCaseProperty = property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  return style.getPropertyValue(kebabCaseProperty).trim();
}

function styleAtViewport(element, property, viewportWidth) {
  let value = '';

  for (const sheet of document.styleSheets) {
    let rules;

    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }

    for (const rule of rules) {
      if (rule.type === CSSRule.STYLE_RULE) {
        if (element.matches(rule.selectorText) && readStyleProperty(rule.style, property)) {
          value = readStyleProperty(rule.style, property);
        }
      }

      if (rule.type !== CSSRule.MEDIA_RULE) continue;
      if (!viewportMatchesMediaText(rule.media.mediaText, viewportWidth)) continue;

      for (const innerRule of rule.cssRules) {
        if (innerRule.type !== CSSRule.STYLE_RULE) continue;
        if (!element.matches(innerRule.selectorText)) continue;
        const nextValue = readStyleProperty(innerRule.style, property);
        if (nextValue) {
          value = nextValue;
        }
      }
    }
  }

  return value;
}

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('renders PRD headline, supporting line, and CTA copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('#hero-headline').text()).toBe('Online Casino');
    expect(wrapper.get('p').text()).toBe('Browse our game catalog');
    expect(wrapper.get('button').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.get('button[type="button"]').element;

    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    await wrapper.get('button').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])('scrolls to the catalog when the CTA is activated with %j', async key => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    await wrapper.get('button').trigger('keydown', { key });

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('scopes responsive spacing and typography at the 768px breakpoint', () => {
    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    const hero = wrapper.get('section[aria-labelledby="hero-headline"]').element;
    const headline = wrapper.get('#hero-headline').element;
    const supporting = wrapper.get('p').element;
    const cta = wrapper.get('button').element;

    expect(styleAtViewport(headline, 'fontSize', 1024)).toBe('2rem');
    expect(styleAtViewport(supporting, 'fontSize', 1024)).toBe('1.125rem');
    expect(styleAtViewport(hero, 'padding', 1024)).toBe('2rem 1rem');

    expect(styleAtViewport(headline, 'fontSize', 768)).toBe('1.5rem');
    expect(styleAtViewport(supporting, 'fontSize', 768)).toBe('0.875rem');
    expect(styleAtViewport(hero, 'padding', 768)).toBe('1rem 0.5rem');
    expect(styleAtViewport(cta, 'fontSize', 768)).toBe('0.875rem');
  });
});
