import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import HeroBanner from './HeroBanner.vue';

function findBrowseGamesButton(wrapper) {
  return wrapper.get('[aria-label="Welcome"] button');
}

describe('HeroBanner', () => {
  it('renders static PRD copy', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('h1').text()).toBe('Online Casino');
    expect(wrapper.get('p').text()).toBe('Browse our game catalog');
    expect(findBrowseGamesButton(wrapper).text()).toBe('Browse games');
  });

  it('renders a welcome landmark without featured imagery', () => {
    const wrapper = mount(HeroBanner);

    expect(wrapper.get('[aria-label="Welcome"]').exists()).toBe(true);
    expect(wrapper.find('img').exists()).toBe(false);
    expect(wrapper.find('[aria-label="Dismiss"]').exists()).toBe(false);
  });

  it('renders a focusable browse games button', () => {
    const wrapper = mount(HeroBanner);

    const button = findBrowseGamesButton(wrapper);
    expect(button.element.tagName).toBe('BUTTON');
    expect(button.attributes('type')).toBe('button');
  });

  it('scrolls to the catalog anchor when browse games is clicked', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner);
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    document.body.removeChild(target);
  });

  it('scrolls to the catalog anchor when browse games is activated by keyboard', async () => {
    const scrollIntoView = vi.fn();
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner);
    const button = findBrowseGamesButton(wrapper).element;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button.click();

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });

    document.body.removeChild(target);
  });

  it('falls back to instant scroll when smooth scrolling is unsupported', async () => {
    const scrollIntoView = vi
      .fn()
      .mockImplementationOnce(() => {
        throw new TypeError('smooth scroll not supported');
      })
      .mockImplementation(() => {});
    const target = document.createElement('div');
    target.id = CATALOG_SCROLL_TARGET_ID;
    target.scrollIntoView = scrollIntoView;
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner);
    await findBrowseGamesButton(wrapper).trigger('click');

    expect(scrollIntoView).toHaveBeenCalledTimes(2);
    expect(scrollIntoView).toHaveBeenNthCalledWith(1, { behavior: 'smooth', block: 'start' });
    expect(scrollIntoView).toHaveBeenNthCalledWith(2);

    document.body.removeChild(target);
  });

  afterEach(() => {
    document.getElementById(CATALOG_SCROLL_TARGET_ID)?.remove();
  });
});
