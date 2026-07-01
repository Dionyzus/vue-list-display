import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes a stable document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList);

    expect(wrapper.find('.filter-section').attributes('id')).toBe(CATALOG_SCROLL_TARGET_ID);
  });
});
