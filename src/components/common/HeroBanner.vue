<template>
  <section
    class="hero-banner"
    data-testid="hero-banner"
    style="background-color: #630000"
  >
    <h1 class="hero-headline" data-testid="hero-headline">Online Casino</h1>
    <p class="hero-supporting" data-testid="hero-supporting">Browse our game catalog</p>
    <button class="hero-cta" type="button" data-testid="hero-cta">Browse games</button>
  </section>
</template>

<style scoped>
.hero-banner {
  width: 100%;
  color: white;
  text-align: center;
  padding: 2rem 1.5rem;
}

.hero-headline {
  margin: 0 0 0.75rem;
  font-size: 2rem;
  font-weight: 700;
}

.hero-supporting {
  margin: 0 0 1.25rem;
  font-size: 1.125rem;
}

.hero-cta {
  background: transparent;
  border: 2px solid white;
  border-radius: 0.25rem;
  color: white;
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
  .hero-banner {
    padding: 1.25rem 1rem;
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
