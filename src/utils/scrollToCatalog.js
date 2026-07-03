import { GAME_CATALOG_ANCHOR_ID } from '../common/catalogAnchor.js';

export const catalogScroll = {
  supportsSmoothScroll() {
    return 'scrollBehavior' in document.documentElement.style;
  },

  scrollToCatalog() {
    const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
    if (!target) return;

    const behavior = this.supportsSmoothScroll() ? 'smooth' : 'auto';
    target.scrollIntoView({ behavior, block: 'start' });
  },
};

export const supportsSmoothScroll = () => catalogScroll.supportsSmoothScroll();
export const scrollToCatalog = () => catalogScroll.scrollToCatalog();
