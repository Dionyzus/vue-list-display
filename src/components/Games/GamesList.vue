<script setup>
import { computed, ref } from 'vue';

import AppPagination from '../common/AppPagination.vue';
import availableGames from './data.js';
import GameItem from './GameItem.vue';

const itemsPerPage = ref(12);
const currentPage = ref(1);

const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return availableGames.slice(startIndex, endIndex);
});

const changePage = pageNumber => currentPage.value = pageNumber;
</script>

<template>
  <AppPagination 
    :itemCount="availableGames.length"
    :itemsPerPage="itemsPerPage"
    :currentPage="currentPage"
    @changePage="changePage">
    <div class="grid-layout">
      <GameItem v-for="game in displayedGames" :key="game.id" :game="game" />
    </div>
  </AppPagination>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 2rem;
}
</style>