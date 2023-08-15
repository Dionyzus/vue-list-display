<script setup>
import { computed, ref } from 'vue';

import { findGamesByProvider } from '../../utils/query';
import DialogGameCard from './DialogGameCard.vue';

const props = defineProps({
  game: { type: Object, required: true }
});

const itemsPerPage = 1;
const currentPage = ref(1);
const selectedGameId = ref(props.game.id);
const selectedGame = ref(props.game);

const filteredGames = computed(() => {
  return findGamesByProvider(props.game.provider);
});

const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredGames.value.slice(startIndex, endIndex);
});

const pageCount = computed(() =>
  Math.ceil(filteredGames.value.length / itemsPerPage)
);

function goToPage(page) {
  currentPage.value = page;
}

const selectGame = (game) => {
  selectedGameId.value = game.id;
  selectedGame.value = game;
};
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
  <div class="grid-layout">
    <DialogGameCard 
      v-for="game in displayedGames" 
      :key="game.id"
      :game="game"
      :selectedId="selectedGameId"
      @click="selectGame(game)" />
  </div>
  <div class="pagination">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
      &lt; Previous
    </button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === pageCount">
      Next &gt;
    </button>
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

.grid-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  padding: 1.25rem 0 0.25rem 0;
}
</style>