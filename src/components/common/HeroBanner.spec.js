import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import { GAMES_CATALOG_ANCHOR_ID } from '../../common/pageLayout.js';
import HeroBanner from './HeroBanner.vue';

const PRD_HEADLINE = 'Online Casino';
const PRD_SUPPORTING = 'Browse our game catalog';
const PRD_CTA_LABEL = 'Browse games';

function mountHeroBanner() {
  return mount(HeroBanner);
}

function findHeroSection(wrapper) {
  return wrapper.find('[data-testid="hero-banner"]');
}

function findBrowseGamesButton(wrapper) {
  return findHeroSection(wrapper).find('button');
}

describe('HeroBanner', () => {
  it('renders static PRD copy', () => {
    const wrapper = mountHeroBanner();
    const hero = findHeroSection(wrapper);

    expect(hero.find('h1').text()).toBe(PRD_HEADLINE);
    expect(hero.find('p').text()).toBe(PRD_SUPPORTING);
    expect(findBrowseGamesButton(wrapper).text()).toBe(PRD_CTA_LABEL);
  });

  it('exposes a focusable browse games button', () => {
    const wrapper = mountHeroBanner();
    const button = findBrowseGamesButton(wrapper);

    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
    expect(button.attributes('disabled')).toBeUndefined();
    expect(button.element.tabIndex).toBe(0);

    document.body.appendChild(wrapper.element);
    button.element.focus();
    expect(document.activeElement).toBe(button.element);

    wrapper.element.remove();
  });

  it('scrolls to the catalog anchor when the CTA is activated', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.id = GAMES_CATALOG_ANCHOR_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mountHeroBanner();
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    target.remove();
    wrapper.unmount();
  });

  it('falls back to instant scroll when smooth behavior is unsupported', async () => {
    const scrollIntoView = vi.fn((options) => {
      if (options?.behavior === 'smooth') {
        throw new TypeError('smooth not supported');
      }
    });
    const target = document.createElement('div');
    target.id = GAMES_CATALOG_ANCHOR_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mountHeroBanner();
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    expect(scrollIntoView).toHaveBeenNthCalledWith(1, { behavior: 'smooth', block: 'start' });
    expect(scrollIntoView).toHaveBeenNthCalledWith(2);

    target.remove();
    wrapper.unmount();
  });
});
