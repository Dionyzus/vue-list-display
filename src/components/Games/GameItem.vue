<script setup>
import { ref } from 'vue';

import AppDialog from '../common/AppDialog.vue';
import GameCard from './GameCard.vue';
import GameDetails from './GameDetails.vue';

const isVisible = ref(false);

defineProps({
  game: { type: Object, required: true },
});

const isModalVisible = (value) => isVisible.value = value;
</script>

<template>
  <div class="grid-item">
    <GameCard :game="game" @isModalVisible="isModalVisible" />
    <AppDialog :is-visible="isVisible" @isModalVisible="isModalVisible">
      <GameDetails :game="game" />
    </AppDialog>
  </div>
</template>

<style scoped>
.grid-item {
  width: 100%;
}
</style>