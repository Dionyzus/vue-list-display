import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it } from 'vitest';

import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';
import GamesList from './GamesList.vue';

const gamesListSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'GamesList.vue'),
  'utf8',
);

describe('GamesList', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('exposes a document-level scroll target on the filter section', () => {
    const wrapper = mount(GamesList);
    document.body.appendChild(wrapper.element);

    const filterSection = wrapper.find('.filter-section');
    expect(filterSection.exists()).toBe(true);
    expect(filterSection.attributes('id')).toBe(CATALOG_SCROLL_TARGET_ID);
    expect(document.getElementById(CATALOG_SCROLL_TARGET_ID)).toBe(filterSection.element);
    expect(gamesListSource).toContain('scroll-margin-top: var(--app-header-offset)');

    wrapper.unmount();
  });
});
