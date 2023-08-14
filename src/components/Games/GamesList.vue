<script setup>
import GAMES from './data.js';
import GameItem from './GameItem.vue';
</script>

<template>
  <div class="grid-layout">
    <div v-for="game in GAMES" :key="game.id">
      <GameItem 
        :title="game.title"
        :image-src="game.image" 
        :provider="game.provider" />
    </div>
  </div>
</template>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 2rem;
}
</style>