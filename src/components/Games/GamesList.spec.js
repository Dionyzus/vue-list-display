import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { CATALOG_FILTER_ANCHOR_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList);

    expect(wrapper.find(`#${CATALOG_FILTER_ANCHOR_ID}`).exists()).toBe(true);
    expect(wrapper.find('.filter-section').attributes('id')).toBe(CATALOG_FILTER_ANCHOR_ID);
  });
});
