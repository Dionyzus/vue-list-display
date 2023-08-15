<script setup>
import { ref } from 'vue';

import RelatedGamesList from './RelatedGamesList.vue';

const props = defineProps({
  game: { type: Object, required: true }
});

const selectedGame = ref(props.game);

const setSelectedGame = game => selectedGame.value = game;
</script>

<template>
  <h2 class="title">{{ selectedGame.title }}</h2>
  <div class="provider">{{ selectedGame.provider }}</div>
  <div class="image-and-text">
    <img :src="selectedGame.imageSrc" alt="Game Image" class="image" />
    <div class="summary">
      <div class="description">{{ selectedGame.description }}</div>
      <span>Volatility: <strong>{{ selectedGame.volatility }}</strong></span>
      <span>RTP: <strong>{{ selectedGame.RTP }}</strong></span>
    </div>
  </div>
  <div class="chips">
    <div class="chip" v-for="category in selectedGame.categories" :key="category">
      {{ category }}
    </div>
  </div>
  <RelatedGamesList :game="game" @selectedGame="setSelectedGame" />
</template>

<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.625rem;
  text-transform: capitalize;
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
  margin-bottom: 1rem;
}

.image {
  max-width: 50%;
  border-radius: 0.5rem;
}

.summary {
  display: flex;
  flex-direction: column;
  max-width: 50%;
  flex: 1;
}

.description {
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