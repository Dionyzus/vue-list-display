<script setup>
defineProps({
  game: { type: Object, required: true }
});
</script>

<template>
  <h2 class="title">{{ game.title }}</h2>
  <div class="provider">{{ game.provider }}</div>
  <div class="image-and-text">
    <img :src="game.imageSrc" alt="Game Image" class="game-image" />
    <div class="game-summary">
      <div class="game-description">{{ game.description }}</div>
      <span>Volatility: <b>{{ game.volatility }}</b></span>
      <span>RTP: <b>{{ game.RTP }}</b></span>
    </div>
  </div>
  <div class="chips">
    <div class="chip" v-for="category in game.categories" :key="category">{{ category }}</div>
  </div>
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
}

.provider {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.625rem;
}

.image-and-text {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
}

.game-image {
  max-width: 50%;
  border-radius: 0.5rem;
}

.game-summary {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  flex: 1;
}

.game-description {
  font-size: 1rem;
  color: #666;
  padding-bottom: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.chip {
  padding: 0.25rem 0.5rem;
  background-color: #9fb9ff;
  border-radius: 1rem;
  font-size: 0.85rem;
}
</style>