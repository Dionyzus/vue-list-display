/**
 * @vitest-environment happy-dom
 * @vitest-environment-options {"width": 767, "height": 768}
 */

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner responsive layout at mobile breakpoint', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('reduces padding and font sizes at the 768px breakpoint', () => {
    const wrapper = mount(HeroBanner, {
      attachTo: document.body,
    });
    const hero = wrapper.get('section');
    const headline = wrapper.get('#hero-headline');
    const supporting = wrapper.find('p');
    const cta = wrapper.get('button');

    expect(window.getComputedStyle(hero.element).padding).toBe('32px 16px');
    expect(window.getComputedStyle(headline.element).fontSize).toBe('28px');
    expect(window.getComputedStyle(supporting.element).fontSize).toBe('16px');
    expect(window.getComputedStyle(cta.element).fontSize).toBe('15px');
  });
});
