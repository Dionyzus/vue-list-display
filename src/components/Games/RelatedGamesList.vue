<script setup>
import { computed, ref } from 'vue';

import { findGamesByProvider } from '../../utils/query';
import DialogGameCard from './DialogGameCard.vue';
import DialogPagination from './DialogPagination.vue';

const props = defineProps({
  game: { type: Object, required: true }
});

const itemsPerPage = 4;
const currentPage = ref(1);
const selectedGameId = ref(props.game.id);
const selectedGame = ref(props.game);

const emit = defineEmits(['selectedGame']);

const filteredGames = computed(() => findGamesByProvider(props.game.provider));
const displayedGames = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return filteredGames.value.slice(startIndex, endIndex);
});

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
    <DialogPagination 
      :itemCount="filteredGames.length" :itemsPerPage="itemsPerPage" :currentPage="currentPage"
      @goToPage="goToPage">
      <div class="grid-layout">
        <DialogGameCard 
          v-for="game in displayedGames" :key="game.id" :game="game" :selectedId="selectedGameId"
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