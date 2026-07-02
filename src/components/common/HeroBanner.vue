<template>
  <section class="hero">
    <h1 class="hero-headline">Online Casino</h1>
    <p class="hero-tagline">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
.hero {
  background-color: #630000;
  color: white;
  text-align: center;
  margin: -1rem -1rem 1rem;
  padding: 3rem 1.5rem;
}

.hero-headline {
  margin: 0 0 0.75rem;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-tagline {
  margin: 0 0 1.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.hero-cta {
  padding: 0.75rem 1.5rem;
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
    margin: -0.5rem -0.5rem 1rem;
    padding: 1.5rem 1rem;
  }

  .hero-headline {
    font-size: 1.75rem;
  }

  .hero-tagline {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-cta {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
