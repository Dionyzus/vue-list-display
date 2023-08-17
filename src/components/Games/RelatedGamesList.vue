<script setup>
import { computed, ref } from 'vue';

import { findGamesByProvider } from '../../utils/query';
import DialogGameCard from './DialogGameCard.vue';
import DialogPagination from './DialogPagination.vue';

const props = defineProps({
  game: { type: Object, required: true },
  itemsPerPage: { type: Number, default: 4 }
});

const currentPage = ref(1);
const selectedGame = ref(props.game);

const emit = defineEmits(['onGameSelect']);

const filteredGames = computed(() => findGamesByProvider(props.game.provider));
const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = startIndex + props.itemsPerPage;

  return filteredGames.value.slice(startIndex, endIndex);
});

const handlePageChange = (page) => currentPage.value = page;

const selectGame = (game) => {
  selectedGame.value = game;
  emit("onGameSelect", game);
};
</script>

<template>
  <div class="wrapper">
    <h3 class="secondary-title">More from {{ game.provider }}</h3>
    <DialogPagination 
      :itemCount="filteredGames.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage"
      @onPageChange="handlePageChange">
      <div class="grid-layout">
        <DialogGameCard 
          v-for="game in displayedGames" :key="game.id" :game="game" :selectedId="selectedGame.id"
          @click="selectGame(game)" />
      </div>
    </DialogPagination>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 1rem;
  background-color: #f3f4f6;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 6px 4px rgba(0, 0, 0, 0.1);
}

.secondary-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  padding-top: 0.5rem;
}

@media screen and (min-width: 768px) {
  .grid-layout {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>