import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

describe('GamesList', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exposes a document-level scroll target on the catalog filter section', () => {
    const wrapper = mount(GamesList);
    document.body.appendChild(wrapper.element);

    const scrollTarget = document.getElementById(CATALOG_SCROLL_TARGET_ID);
    expect(scrollTarget).not.toBeNull();
    expect(scrollTarget?.querySelector('input[placeholder="Search..."]')).not.toBeNull();
    expect(scrollTarget?.querySelector('select')).not.toBeNull();

    wrapper.unmount();
  });
});
