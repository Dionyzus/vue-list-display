<script setup>
import { CATALOG_SCROLL_TARGET_ID } from '../../common/constants';

const scrollToCatalog = () => {
  document.getElementById(CATALOG_SCROLL_TARGET_ID)?.scrollIntoView({
    behavior: 'smooth',
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
  background-color: #630000;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  margin: -1rem -1rem 1rem;
  width: calc(100% + 2rem);
  box-sizing: border-box;
}

.hero-headline {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.hero-supporting {
  font-size: 1.25rem;
  margin: 0;
}

.hero-cta {
  background-color: white;
  color: #630000;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.25rem;
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
    margin: -0.5rem -0.5rem 0.75rem;
    width: calc(100% + 1rem);
    gap: 0.75rem;
  }

  .hero-headline {
    font-size: 1.75rem;
  }

  .hero-supporting {
    font-size: 1rem;
  }

  .hero-cta {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
}
</style>
