// Single source of truth for the hero banner copy. HeroBanner.vue renders these
// strings and the specs assert against the same constants, so there is exactly
// one place to update when the copy changes -- the component and its tests
// cannot silently drift apart.
export const HERO_HEADLINE = 'Online Casino';
export const HERO_SUPPORTING = 'Browse our game catalog';
export const HERO_CTA_LABEL = 'Browse games';
