import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import { CATALOG_ANCHOR_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  it('exposes the catalog filter section as a stable scroll target', () => {
    const wrapper = mount(GamesList);

    const target = wrapper.find(`#${CATALOG_ANCHOR_ID}`);

    expect(target.exists()).toBe(true);
    expect(target.classes()).toContain('filter-section');
  });
});
