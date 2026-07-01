import { afterEach, describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList, {
      attachTo: document.body,
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const filterSection = wrapper.find('.filter-section');

    expect(filterSection.exists()).toBe(true);
    expect(filterSection.attributes('id')).toBe(CATALOG_FILTER_ANCHOR_ID);
    expect(document.getElementById(CATALOG_FILTER_ANCHOR_ID)).toBe(filterSection.element);
  });

  it('offsets the scroll target below the fixed header', () => {
    const wrapper = mount(GamesList, {
      attachTo: document.body,
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const scrollMarginTop = getComputedStyle(wrapper.find('.filter-section').element).scrollMarginTop;

    expect(parseFloat(scrollMarginTop)).toBeGreaterThan(0);
  });
});
