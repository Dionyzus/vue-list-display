<script setup>
import {
  HERO_BANNER_CTA_LABEL,
  HERO_BANNER_HEADLINE,
  HERO_BANNER_SUPPORTING,
} from '../../common/constants';
import { scrollToGameCatalog } from '../../utils/scrollToGameCatalog';

function handleCtaClick() {
  scrollToGameCatalog();
}

function handleCtaKeydown(event) {
  if (event.key !== 'Enter' && event.key !== ' ') {
    return;
  }

  event.preventDefault();
  scrollToGameCatalog();
}
</script>

<template>
  <section class="hero-banner" aria-labelledby="hero-headline">
    <h1 id="hero-headline" class="hero-banner__headline">{{ HERO_BANNER_HEADLINE }}</h1>
    <p class="hero-banner__supporting">{{ HERO_BANNER_SUPPORTING }}</p>
    <button
      type="button"
      class="hero-banner__cta"
      @click="handleCtaClick"
      @keydown="handleCtaKeydown"
    >
      {{ HERO_BANNER_CTA_LABEL }}
    </button>
  </section>
</template>

<style scoped>
.hero-banner {
  background-color: #630000;
  color: white;
  text-align: center;
  padding: 3rem 1.5rem;
  margin-left: -1rem;
  margin-right: -1rem;
}

.hero-banner__headline {
  margin: 0 0 0.75rem;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-banner__supporting {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.hero-banner__cta {
  background-color: white;
  color: #630000;
  border: 2px solid white;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.25rem;
}

.hero-banner__cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero-banner {
    padding: 2rem 1rem;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }

  .hero-banner__headline {
    font-size: 1.75rem;
  }

  .hero-banner__supporting {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }

  .hero-banner__cta {
    padding: 0.625rem 1.25rem;
    font-size: 0.9375rem;
  }
}
</style>
