<script setup>
const props = defineProps({
  scrollTargetId: { type: String, default: '' }
});

const scrollToCatalog = () => {
  if (!props.scrollTargetId) return;

  const target = document.getElementById(props.scrollTargetId);
  if (target && typeof target.scrollIntoView === 'function') {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
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
  padding: 2.5rem 1.5rem;
  margin: -1rem -1rem 1rem;
  width: calc(100% + 2rem);
}

.hero-headline {
  margin: 0 0 0.75rem;
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-supporting {
  margin: 0 0 1.5rem;
  font-size: 1.125rem;
  line-height: 1.4;
}

.hero-cta {
  padding: 0.625rem 1.5rem;
  border: 2px solid white;
  border-radius: 0.25rem;
  background-color: white;
  color: #630000;
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
    padding: 1.5rem 1rem;
    margin: -0.5rem -0.5rem 0.75rem;
    width: calc(100% + 1rem);
  }

  .hero-headline {
    font-size: 1.75rem;
  }

  .hero-supporting {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }

  .hero-cta {
    padding: 0.5rem 1.25rem;
    font-size: 0.9375rem;
  }
}
</style>
