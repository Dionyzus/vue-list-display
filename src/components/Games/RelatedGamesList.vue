<script setup>
import { computed, ref } from 'vue';

import { findGamesByProvider } from '../../utils/query';
import DialogGameCard from './DialogGameCard.vue';

//TODO: extract pagination to separate component
const props = defineProps({
  game: { type: Object, required: true }
});

const itemsPerPage = 4;
const currentPage = ref(1);
const selectedGameId = ref(props.game.id);
const selectedGame = ref(props.game);

const emit = defineEmits(['selectedGame']);

const filteredGames = computed(() =>  findGamesByProvider(props.game.provider));
const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredGames.value.slice(startIndex, endIndex);
});
const pageCount = computed(() => Math.ceil(filteredGames.value.length / itemsPerPage));

const goToPage = (page) => currentPage.value = page;

const selectGame = (game) => {
  selectedGameId.value = game.id;
  selectedGame.value = game;
  emit("selectedGame", game);
};
</script>

<template>
  <div class="wrapper">
    <h3 class="secondary-title">More from {{ game.provider }}</h3>
    <div class="pagination-arrows">
      <button 
        class="pagination-arrow" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">
        <font-awesome-icon icon="chevron-left" />
      </button>
      <div class="grid-layout">
        <DialogGameCard 
          v-for="game in displayedGames" :key="game.id" :game="game" :selectedId="selectedGameId"
          @click="selectGame(game)" />
      </div>
      <button 
        class="pagination-arrow"
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === pageCount">
        <font-awesome-icon icon="chevron-right" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 1.25rem;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 6px 4px rgba(0, 0, 0, 0.1);
}

.secondary-title {
  display: flex;
  justify-content: flex-start;
  font-size: 1.25rem;
  font-weight: bold;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.25rem;
  padding: 1.25rem 0 0.25rem 0;
}

.pagination-arrows {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-arrow {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin: 0 1rem;
}

.pagination-arrow[disabled] {
  color: #ccc;
  cursor: not-allowed;
}
</style>