<script setup>
import {
  HERO_CTA_LABEL,
  HERO_HEADLINE,
  HERO_SUPPORTING,
} from '../../common/heroCopy.js';
import { scrollToCatalog } from '../../utils/scrollToCatalog.js';
</script>

<template>
  <section class="hero" aria-labelledby="hero-headline">
    <h1 id="hero-headline" class="hero-headline">{{ HERO_HEADLINE }}</h1>
    <p class="hero-supporting">{{ HERO_SUPPORTING }}</p>
    <button
      type="button"
      class="hero-cta"
      @click="scrollToCatalog"
      @keydown.enter.prevent="scrollToCatalog"
      @keydown.space.prevent="scrollToCatalog"
    >
      {{ HERO_CTA_LABEL }}
    </button>
  </section>
</template>

<style scoped>
.hero {
  background-color: #630000;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  width: 100vw;
  max-width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  margin-bottom: 1rem;
}

.hero-headline {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}

.hero-supporting {
  margin: 0;
  font-size: 1.125rem;
}

.hero-cta {
  margin-top: 0.5rem;
  padding: 0.5rem 1.5rem;
  background-color: white;
  color: #630000;
  border: 2px solid white;
  border-radius: 0.25rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}

.hero-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 1rem 0.5rem;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  .hero-headline {
    font-size: 1.5rem;
  }

  .hero-supporting {
    font-size: 0.875rem;
  }

  .hero-cta {
    font-size: 0.875rem;
    padding: 0.4rem 1rem;
  }
}
</style>
