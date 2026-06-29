<script setup>
import { CATALOG_SCROLL_ANCHOR_ID } from '../../common/constants';
import { scrollToAnchor } from '../../utils/scroll';

const browseGames = () => scrollToAnchor(CATALOG_SCROLL_ANCHOR_ID);
</script>

<template>
  <section class="hero-banner" aria-label="Promotional banner">
    <h2 class="hero-banner__title">Discover top casino games</h2>
    <p class="hero-banner__subtitle">Slots, table games, and more — all in one place.</p>
    <button type="button" class="hero-banner__cta" @click="browseGames">
      Browse games
    </button>
  </section>
</template>

<style scoped>
.hero-banner {
  background-color: #630000;
  color: white;
  text-align: center;
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
}

.hero-banner__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero-banner__subtitle {
  font-size: 1rem;
  margin-bottom: 1.25rem;
  opacity: 0.9;
}

.hero-banner__cta {
  background-color: white;
  color: #630000;
  border: none;
  border-radius: 0.25rem;
  padding: 0.625rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.hero-banner__cta:hover,
.hero-banner__cta:focus-visible {
  background-color: #f2f2f2;
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero-banner {
    padding: 1.25rem 0.75rem;
    margin-bottom: 0.5rem;
  }

  .hero-banner__title {
    font-size: 1.25rem;
  }

  .hero-banner__subtitle {
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }

  .hero-banner__cta {
    font-size: 0.875rem;
    padding: 0.5rem 1.25rem;
  }
}
</style>
