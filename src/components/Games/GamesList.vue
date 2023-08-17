<script setup>
import { computed, ref } from 'vue';

import AppPagination from '../common/AppPagination.vue';
import availableGames from './data.js';
import GameItem from './GameItem.vue';

const itemsPerPage = ref(12);
const currentPage = ref(1);

const gamesOnCurrentPage = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return availableGames.slice(startIndex, endIndex);
});

const handlePageChange = pageNumber => {
  window.scrollTo({ top: 0 });
  currentPage.value = pageNumber;
};
</script>

<template>
  <div class="game-grid">
    <AppPagination 
      :itemCount="availableGames.length"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @onPageChange="handlePageChange">
      <div class="grid-layout">
        <GameItem v-for="game in gamesOnCurrentPage" :key="game.id" :game="game" />
      </div>
    </AppPagination>
  </div>
</template>

<style scoped>
.game-grid {
  padding: 1rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 1rem;
}

@media screen and (min-width: 768px) {
  .game-grid {
    padding: 1.5rem;
  }

  .grid-layout {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
  }
}

@media screen and (min-width: 1280px) {
  .game-grid {
    padding: 2rem;
  }

  .grid-layout {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }
}
</style>