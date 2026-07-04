// PRD-authoritative hero copy, owned by the tests. This fixture is deliberately
// NOT imported by HeroBanner.vue: the component hard-codes its own copy, and the
// specs assert the rendered output against these independent constants. That way
// a wrong string in the component fails the copy tests instead of both sides
// reading one shared value and silently agreeing (see issue #52 acceptance criteria).
export const HERO_HEADLINE = 'Online Casino';
export const HERO_SUPPORTING = 'Browse our game catalog';
export const HERO_CTA_LABEL = 'Browse games';
