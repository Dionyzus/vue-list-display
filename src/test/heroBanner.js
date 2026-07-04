import { expect } from 'vitest';

export const HERO_HEADLINE = 'Online Casino';
export const HERO_SUPPORTING = 'Browse our game catalog';
export const HERO_CTA_LABEL = 'Browse games';

export const findHeroSection = wrapper =>
  wrapper.find('section[aria-labelledby="hero-headline"]');

// @vue/test-utils `find` only accepts a selector, so match the CTA by its
// visible label instead of assuming it is the first button in the tree.
export const findBrowseGamesButton = wrapper =>
  wrapper.findAll('button').find(button => button.text().trim() === HERO_CTA_LABEL);

export const expectHeroCopy = hero => {
  expect(hero.find('h1').text()).toBe(HERO_HEADLINE);
  expect(hero.text()).toContain(HERO_SUPPORTING);
  expect(findBrowseGamesButton(hero).text()).toBe(HERO_CTA_LABEL);
};
