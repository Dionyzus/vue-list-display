import { afterEach, describe, expect, it, vi } from 'vitest';

import { GAME_CATALOG_ANCHOR_ID } from '../common/catalogAnchor.js';
import gamesListSource from '../components/Games/GamesList.vue?raw';
import appPageSource from '../components/common/AppPage.vue?raw';
import scrollToCatalogSource from './scrollToCatalog.js?raw';
import { catalogScroll, scrollToCatalog, supportsSmoothScroll } from './scrollToCatalog.js';

describe('scrollToCatalog', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('exports the shared catalog anchor id used by GamesList and scrollToCatalog', () => {
    expect(gamesListSource).toContain('GAME_CATALOG_ANCHOR_ID');
    expect(scrollToCatalogSource).toContain('GAME_CATALOG_ANCHOR_ID');
    expect(scrollToCatalogSource).toContain('catalogAnchor.js');
  });

  it('scrolls the catalog anchor into view with smooth behavior when supported', () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(true);

    scrollToCatalog();

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it('falls back to instant scroll when smooth scrolling is not supported', () => {
    const catalogAnchor = document.createElement('div');
    catalogAnchor.id = GAME_CATALOG_ANCHOR_ID;
    catalogAnchor.scrollIntoView = vi.fn();
    document.body.appendChild(catalogAnchor);

    vi.spyOn(catalogScroll, 'supportsSmoothScroll').mockReturnValue(false);

    scrollToCatalog();

    expect(catalogAnchor.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'auto',
      block: 'start',
    });
  });

  it('no-ops when the catalog anchor is missing', () => {
    vi.spyOn(document, 'getElementById');

    scrollToCatalog();

    expect(document.getElementById).toHaveBeenCalledWith(GAME_CATALOG_ANCHOR_ID);
  });

  it('detects smooth scroll support from the document element style object', () => {
    expect(typeof supportsSmoothScroll()).toBe('boolean');
  });

  it('documents header offset compensation on the catalog anchor and page shell', () => {
    expect(gamesListSource).toContain('scroll-margin-top: var(--app-header-scroll-offset');
    expect(appPageSource).toContain('--app-header-scroll-offset');
  });
});
