/**
 * @vitest-environment happy-dom
 * @vitest-environment-options {"width": 1024, "height": 768}
 */

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner responsive layout above mobile breakpoint', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('uses default spacing and typography above the mobile breakpoint', () => {
    const wrapper = mount(HeroBanner, {
      attachTo: document.body,
    });
    const hero = wrapper.get('section');
    const headline = wrapper.get('#hero-headline');
    const supporting = wrapper.find('p');
    const cta = wrapper.get('button');

    expect(window.getComputedStyle(hero.element).padding).toBe('48px 24px');
    expect(window.getComputedStyle(headline.element).fontSize).toBe('40px');
    expect(window.getComputedStyle(supporting.element).fontSize).toBe('20px');
    expect(window.getComputedStyle(cta.element).fontSize).toBe('16px');
  });
});
