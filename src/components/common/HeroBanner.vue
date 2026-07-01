<template>
  <section class="hero" aria-labelledby="hero-headline">
    <h1 id="hero-headline" class="hero-headline">Online Casino</h1>
    <p class="hero-supporting">Browse our game catalog</p>
    <button type="button" class="hero-cta">Browse games</button>
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
  gap: 0.75rem;
  padding: 2.5rem 1.5rem;
  margin-bottom: 1rem;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
}

.hero-headline {
  margin: 0;
  font-size: 2.25rem;
  font-weight: 700;
}

.hero-supporting {
  margin: 0;
  font-size: 1.125rem;
}

.hero-cta {
  margin-top: 0.5rem;
  padding: 0.625rem 1.5rem;
  background: transparent;
  border: 2px solid white;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0.25rem;
}

.hero-cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero {
    padding: 1.5rem 1rem;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
  }

  .hero-headline {
    font-size: 1.75rem;
  }

  .hero-supporting {
    font-size: 1rem;
  }

  .hero-cta {
    font-size: 0.875rem;
    padding: 0.5rem 1.25rem;
  }
}
</style>
