import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList, {
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const filterSection = wrapper.find('.filter-section');

    expect(filterSection.exists()).toBe(true);
    expect(filterSection.attributes('id')).toBe(CATALOG_FILTER_ANCHOR_ID);
  });
});
