<script setup>
import { computed, ref } from 'vue';

import { CATEGORIES } from '../../common/constants';
import AppFilter from '../common/AppFilter.vue';
import AppPagination from '../common/AppPagination.vue';
import AppSearchBar from '../common/AppSearchBar.vue';
import availableGames from './data.js';
import GameItem from './GameItem.vue';

const itemsPerPage = ref(12);
const currentPage = ref(1);
const searchQuery = ref('');
const selectedCategory = ref('');

const searchGames = newQuery => searchQuery.value = newQuery;
const selectCategory = category => selectedCategory.value = category;

const filteredGames = computed(() => {
  let result = availableGames;

  if (searchQuery.value) result = filterBySearchQuery(result);
  if (selectedCategory.value) result = filterByCategory(result);

  return result;
});

const filterBySearchQuery = (games) => {
  return games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const filterByCategory = (games) => {
  return games.filter(game => game.categories.includes(selectedCategory.value));
};

const gamesOnCurrentPage = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;

  return filteredGames.value.slice(startIndex, endIndex);
});

const handlePageChange = pageNumber => {
  window.scrollTo({ top: 0 });
  currentPage.value = pageNumber;
};
</script>

<template>
  <div class="game-grid">
    <div class="filter-section">
      <div class="filter-column">
        <AppSearchBar @onSearch="searchGames" />
      </div>
      <div class="filter-column">
        <AppFilter
          @onFilterChange="selectCategory" label="Category" :availableFilters="CATEGORIES" />
      </div>
    </div>
    <AppPagination 
      :itemCount="filteredGames.length"
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
.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-column {
  flex: 1;
  padding: 0.5rem;
}

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