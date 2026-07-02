<template>
  <section class="hero-banner" data-testid="hero-banner" aria-label="Welcome">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
.hero-banner {
  background-color: #630000;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2.5rem 1.5rem;
  margin: -1rem -1rem 1rem -1rem;
  width: calc(100% + 2rem);
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
  margin-top: 0.25rem;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
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
    padding: 1.5rem 1rem;
    margin: -0.5rem -0.5rem 0.5rem -0.5rem;
    width: calc(100% + 1rem);
    gap: 0.5rem;
  }

  .hero-headline {
    font-size: 1.5rem;
  }

  .hero-supporting {
    font-size: 1rem;
  }

  .hero-cta {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
