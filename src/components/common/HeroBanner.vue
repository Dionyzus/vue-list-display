<template>
  <section class="hero-banner" aria-label="Welcome">
    <h1 class="hero-banner__headline">Online Casino</h1>
    <p class="hero-banner__supporting">Browse our game catalog</p>
    <button type="button" class="hero-banner__cta">Browse games</button>
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
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding: 2rem 1rem;
  gap: 0.75rem;
}

.hero-banner__headline {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-banner__supporting {
  font-size: 1.125rem;
  line-height: 1.4;
}

.hero-banner__cta {
  margin-top: 0.5rem;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  color: #630000;
  background-color: white;
  border: 2px solid white;
  border-radius: 4px;
  cursor: pointer;
}

.hero-banner__cta:focus-visible {
  outline: 2px solid white;
  outline-offset: 2px;
}

@media screen and (max-width: 768px) {
  .hero-banner {
    padding: 1rem 0.5rem;
    gap: 0.5rem;
  }

  .hero-banner__headline {
    font-size: 1.5rem;
  }

  .hero-banner__supporting {
    font-size: 1rem;
  }

  .hero-banner__cta {
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
  }
}
</style>
