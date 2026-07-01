import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { CATALOG_FILTER_SECTION_ID } from '@/common/constants';

import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList);

    expect(wrapper.find(`#${CATALOG_FILTER_SECTION_ID}`).exists()).toBe(true);
  });
});
