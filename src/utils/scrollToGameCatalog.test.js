import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../common/constants';
import { scrollToGameCatalog } from './scrollToGameCatalog';

describe('scrollToGameCatalog', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns false when the catalog anchor is missing', () => {
    expect(scrollToGameCatalog()).toBe(false);
  });

  it('scrolls to the catalog anchor when it is present', () => {
    const target = document.createElement('div');
    target.id = GAME_CATALOG_ANCHOR_ID;
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    expect(scrollToGameCatalog()).toBe(true);
    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
