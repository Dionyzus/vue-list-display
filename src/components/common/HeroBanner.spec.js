import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders the static PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.find('.hero-headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-cta').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const button = wrapper.find('.hero-cta');

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });

  it('smooth-scrolls to the configured target when the CTA is activated', async () => {
    const target = document.createElement('div');
    target.id = 'catalog-filter';
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner, {
      props: { scrollTargetId: 'catalog-filter' }
    });

    await wrapper.find('.hero-cta').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(target.scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth' })
    );
  });

  it('does not throw when the target is missing', async () => {
    const wrapper = mount(HeroBanner, {
      props: { scrollTargetId: 'does-not-exist' }
    });

    await expect(wrapper.find('.hero-cta').trigger('click')).resolves.not.toThrow();
  });
});
