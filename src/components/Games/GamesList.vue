<script setup>
import { computed, ref } from 'vue';

import AppPagination from '../common/AppPagination.vue';
import GAMES from './data.js';
import GameItem from './GameItem.vue';

const itemsPerPage = ref(4);
const currentPage = ref(1);

const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return GAMES.slice(startIndex, endIndex);
});

const changePage = (pageNumber) => currentPage.value = pageNumber;
</script>

<template>
  <AppPagination :itemCount="GAMES.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage"
    @changePage="changePage">
    <div class="grid-layout">
      <GameItem v-for="game in displayedGames" :key="game.id" :game="game" />
    </div>
  </AppPagination>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem;
}
</style>