<template>
  <section class="hero" aria-label="Welcome">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
.hero {
  background-color: #630000;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: calc(100% + 2rem);
  margin-left: -1rem;
  margin-right: -1rem;
  padding: 2.5rem 1.5rem;
}

.hero-headline {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 0.75rem;
}

.hero-supporting {
  font-size: 1.125rem;
  margin: 0 0 1.5rem;
}

.hero-cta {
  background-color: white;
  border: 2px solid white;
  border-radius: 0.25rem;
  color: #630000;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.625rem 1.25rem;
}

.hero-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero {
    width: calc(100% + 1rem);
    margin-left: -0.5rem;
    margin-right: -0.5rem;
    padding: 1.5rem 1rem;
  }

  .hero-headline {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-supporting {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-cta {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}
</style>
