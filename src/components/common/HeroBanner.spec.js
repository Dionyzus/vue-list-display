import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

const PRD_HEADLINE = 'Online Casino';
const PRD_SUPPORTING = 'Browse our game catalog';
const PRD_CTA = 'Browse games';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders PRD copy and a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.get('[aria-label="Welcome"]');

    expect(hero.get('h1').text()).toBe(PRD_HEADLINE);
    expect(hero.get('p').text()).toBe(PRD_SUPPORTING);

    const cta = hero.get('button');
    expect(cta.text()).toBe(PRD_CTA);
    expect(cta.attributes('type')).toBe('button');
  });

  it('scrolls to the catalog filter anchor when the CTA is activated', () => {
    const scrollIntoView = vi.fn();
    const catalogTarget = document.createElement('div');
    catalogTarget.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockReturnValue(catalogTarget);

    const wrapper = mount(HeroBanner);
    wrapper.get('[aria-label="Welcome"]').get('button').trigger('click');

    expect(document.getElementById).toHaveBeenCalledWith(CATALOG_SCROLL_TARGET_ID);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('is a static hero strip without images, dismiss controls, or carousel content', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.get('[aria-label="Welcome"]');

    expect(hero.find('img').exists()).toBe(false);
    expect(hero.find('[aria-label="Dismiss"]').exists()).toBe(false);
    expect(hero.findAll('button')).toHaveLength(1);
  });

  it('keeps PRD copy visible at the 768px viewport', () => {
    Object.defineProperty(window, 'innerWidth', {
      configurable: true,
      value: 768,
    });

    const wrapper = mount(HeroBanner);
    const hero = wrapper.get('[aria-label="Welcome"]');

    expect(hero.get('h1').text()).toBe(PRD_HEADLINE);
    expect(hero.get('p').text()).toBe(PRD_SUPPORTING);
    expect(hero.get('button').text()).toBe(PRD_CTA);
  });
});
