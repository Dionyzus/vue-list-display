import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders PRD copy and a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');

    const cta = wrapper.find('.hero-cta');
    expect(cta.text()).toBe('Browse games');
    expect(cta.element.tagName).toBe('BUTTON');
    expect(cta.attributes('type')).toBe('button');
  });

  it('scrolls to the catalog filter anchor when the CTA is activated', () => {
    const scrollIntoView = vi.fn();
    const catalogTarget = document.createElement('div');
    catalogTarget.scrollIntoView = scrollIntoView;
    vi.spyOn(document, 'getElementById').mockReturnValue(catalogTarget);

    const wrapper = mount(HeroBanner);
    wrapper.find('.hero-cta').trigger('click');

    expect(document.getElementById).toHaveBeenCalledWith(CATALOG_SCROLL_TARGET_ID);
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('is a static hero strip without images, dismiss controls, or carousel content', () => {
    const wrapper = mount(HeroBanner);
    const hero = wrapper.find('.hero');

    expect(hero.exists()).toBe(true);
    expect(hero.find('img').exists()).toBe(false);
    expect(hero.find('[aria-label="Dismiss"]').exists()).toBe(false);
    expect(hero.findAll('button')).toHaveLength(1);
  });
});
