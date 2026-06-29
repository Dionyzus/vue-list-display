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
  text-align: center;
  padding: 2.5rem 1.5rem;
  margin: -1rem -1rem 1rem;
  width: calc(100% + 2rem);
}

.hero-headline {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}

.hero-supporting {
  font-size: 1.125rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
}

.hero-cta {
  background-color: white;
  color: #630000;
  border: 2px solid white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.625rem 1.5rem;
}

.hero-cta:focus {
  outline: 2px solid white;
  outline-offset: 2px;
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
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .hero-supporting {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .hero-cta {
    font-size: 0.875rem;
    padding: 0.5rem 1.25rem;
  }
}
</style>
