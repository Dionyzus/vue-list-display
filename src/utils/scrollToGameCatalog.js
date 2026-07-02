import { GAME_CATALOG_ANCHOR_ID } from '../common/constants';

export function scrollToGameCatalog() {
  const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
  if (!target) {
    return false;
  }

  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });

  return true;
}
