import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList);

    const filterSection = wrapper.find('.filter-section');
    expect(filterSection.exists()).toBe(true);
    expect(filterSection.attributes('id')).toBe(CATALOG_SCROLL_TARGET_ID);

    wrapper.unmount();
  });
});
