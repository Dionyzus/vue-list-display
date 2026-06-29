<template>
  <section class="hero-banner" aria-label="Welcome">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
.hero-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #630000;
  color: white;
  width: calc(100% + 2rem);
  margin: -1rem -1rem 1rem;
  padding: 2rem 1rem;
}

.hero-headline {
  margin: 0 0 0.5rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-supporting {
  margin: 0 0 1.25rem;
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
  .hero-banner {
    width: calc(100% + 1rem);
    margin: -0.5rem -0.5rem 0.75rem;
    padding: 1.25rem 0.75rem;
  }

  .hero-headline {
    font-size: 1.5rem;
  }

  .hero-supporting {
    margin-bottom: 1rem;
    font-size: 0.9375rem;
  }

  .hero-cta {
    padding: 0.5rem 1.25rem;
    font-size: 0.875rem;
  }
}
</style>
