<script setup>
import { ref } from 'vue';

import AppDialog from '../common/AppDialog.vue';
import GameCard from './GameCard.vue';
import GameDetails from './GameDetails.vue';

defineProps({
  game: { type: Object, required: true },
});

const isVisible = ref(false);

const handleShowGameDetails = (value) => isVisible.value = value;
</script>

<template>
  <div class="grid-item">
    <GameCard :game="game" @onShowGameDetails="handleShowGameDetails" />
    <AppDialog :is-visible="isVisible" @onModalToggle="handleShowGameDetails">
      <GameDetails :game="game" :isDetailsDialogOpen="isVisible"/>
    </AppDialog>
  </div>
</template>

<style scoped>
.grid-item {
  width: 100%;
  padding: 0.25rem;
}

@media screen and (min-width: 768px) {
  .grid-item {
    padding: 0.5rem;
  }
}
</style>
