<script setup>
import { ref } from 'vue';

import RelatedGamesList from './RelatedGamesList.vue';

const props = defineProps({
  game: { type: Object, required: true },
  isDetailsDialogOpen: { type: Boolean, required: true }
});

const emit = defineEmits(['onScrollToTop']);
const selectedGame = ref(props.game);

const handleGameSelect = newGame => {
  selectedGame.value = newGame;
  emit('onScrollToTop');
};
</script>

<template>
  <div class="game-details">
    <h2 class="title">{{ selectedGame.title }}</h2>
    <div class="provider">{{ selectedGame.provider }}</div>
    <div class="image-and-summary">
      <img v-lazy="selectedGame.imageSrc" alt="Game Image" class="image" loading="lazy" />
      <div class="summary">
        <div class="description">{{ selectedGame.description }}</div>
        <p>Volatility: <strong>{{ selectedGame.volatility }}</strong></p>
        <p>RTP: <strong>{{ selectedGame.RTP }}</strong></p>
      </div>
    </div>
    <div class="chips">
      <div class="chip" v-for="category in selectedGame.categories" :key="category">
        {{ category }}
      </div>
    </div>
    <RelatedGamesList v-if="isDetailsDialogOpen" :game="game" @onGameSelect="handleGameSelect" />
  </div>
</template>

<style scoped>
.game-details {
  padding: 0.25rem;
}

.title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
}

.provider {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.image-and-summary {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.image {
  max-width: 100%;
  border-radius: 0.5rem;
}

.summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.description {
  font-size: 0.875rem;
  color: #666;
  padding-bottom: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  overflow-x: auto;
  padding-bottom: 0.25rem;
}

.chip {
  padding: 0.15rem 0.5rem;
  background-color: #9fb9ff;
  border-radius: 0.75rem;
  font-size: 0.75rem;
}

@media screen and (min-width: 768px) {
  .image-and-summary {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  .image {
    max-width: 50%;
  }

  .summary {
    max-width: 50%;
    flex: 1;
  }

  .chips {
    overflow-x: visible;
    padding-bottom: 0;
  }
}
</style>