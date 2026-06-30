<script setup>
import { CATALOG_SCROLL_ANCHOR_ID } from '../../common/constants';

const scrollToCatalog = () => {
  const target = document.getElementById(CATALOG_SCROLL_ANCHOR_ID);
  if (!target) return;

  target.scrollIntoView({
    behavior: 'scrollBehavior' in document.documentElement.style ? 'smooth' : 'auto',
    block: 'start',
  });
};
</script>

<template>
  <section class="hero" aria-label="Welcome">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta" @click="scrollToCatalog">Browse games</button>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #630000;
  color: white;
  padding: 2rem 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: 1rem;
  width: calc(100% + 2rem);
}

.hero-headline {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.hero-supporting {
  font-size: 1.125rem;
  margin-bottom: 1rem;
}

.hero-cta {
  padding: 0.625rem 1.25rem;
  border: 2px solid white;
  border-radius: 0.25rem;
  background-color: transparent;
  color: white;
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
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    width: calc(100% + 1rem);
  }

  .hero-headline {
    font-size: 1.5rem;
  }

  .hero-supporting {
    font-size: 1rem;
  }

  .hero-cta {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}
</style>
