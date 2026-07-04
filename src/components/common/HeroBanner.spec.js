import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../../common/catalogAnchor.js';
import HeroBanner from './HeroBanner.vue';

describe('HeroBanner', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  const mountHeroWithCatalogAnchor = () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    const wrapper = mount(HeroBanner);
    document.body.appendChild(wrapper.element);

    return { wrapper, catalogAnchor };
  };

  it('renders static hero copy and CTA', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('#hero-headline').text()).toBe('Online Casino');
    expect(wrapper.get('section[aria-labelledby="hero-headline"] p').text()).toBe(
      'Browse our game catalog',
    );
    expect(wrapper.get('button[type="button"]').text()).toBe('Browse games');
  });

  it('renders a focusable CTA button', () => {
    const wrapper = mount(HeroBanner);
    const cta = wrapper.get('button[type="button"]').element;

    expect(cta.getAttribute('type')).toBe('button');
    expect(cta.disabled).toBe(false);
    expect(cta.tabIndex).toBe(0);
    expect(cta.getAttribute('tabindex')).not.toBe('-1');
    expect(cta.getAttribute('aria-disabled')).not.toBe('true');
  });

  it('scrolls the catalog anchor into view when the CTA is clicked', async () => {
    const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

    await wrapper.get('button[type="button"]').trigger('click');

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: expect.stringMatching(/^(smooth|auto)$/),
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls the catalog anchor into view when the CTA is activated with %j',
    async key => {
      const { wrapper, catalogAnchor } = mountHeroWithCatalogAnchor();

      await wrapper.get('button[type="button"]').trigger('keydown', { key });

      expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
        behavior: expect.stringMatching(/^(smooth|auto)$/),
        block: 'start',
      });
    },
  );
});
