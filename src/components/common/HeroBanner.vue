<template>
  <section class="hero-banner" data-testid="hero-banner" aria-label="Welcome">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
/* Full-bleed: negates AppPage `.content` padding via --app-page-content-padding. */
.hero-banner {
  --hero-banner-padding-block: 2.5rem;
  --hero-banner-padding-inline: 1.5rem;
  --hero-headline-size: 2rem;
  --hero-supporting-size: 1.125rem;
  --hero-cta-padding-block: 0.625rem;
  --hero-cta-padding-inline: 1.25rem;
  --hero-cta-size: 1rem;
  --hero-banner-gap: 0.75rem;
  --hero-banner-bottom-margin: 1rem;

  background-color: #630000;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--hero-banner-gap);
  padding: var(--hero-banner-padding-block) var(--hero-banner-padding-inline);
  margin: calc(-1 * var(--app-page-content-padding, 1rem))
    calc(-1 * var(--app-page-content-padding, 1rem))
    var(--hero-banner-bottom-margin);
  width: calc(100% + 2 * var(--app-page-content-padding, 1rem));
}

.hero-headline {
  margin: 0;
  font-size: var(--hero-headline-size);
  font-weight: 700;
}

.hero-supporting {
  margin: 0;
  font-size: var(--hero-supporting-size);
}

.hero-cta {
  margin-top: 0.25rem;
  padding: var(--hero-cta-padding-block) var(--hero-cta-padding-inline);
  font-size: var(--hero-cta-size);
  font-weight: 600;
  color: #630000;
  background-color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.hero-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero-banner {
    --hero-banner-padding-block: 1.5rem;
    --hero-banner-padding-inline: 1rem;
    --hero-headline-size: 1.5rem;
    --hero-supporting-size: 1rem;
    --hero-cta-padding-block: 0.5rem;
    --hero-cta-padding-inline: 1rem;
    --hero-cta-size: 0.875rem;
    --hero-banner-gap: 0.5rem;
    --hero-banner-bottom-margin: 0.5rem;
  }
}
</style>
