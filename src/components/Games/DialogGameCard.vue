<script setup>
import { computed } from 'vue';

const props = defineProps({
  game: { type: Object, required: true },
  selectedId: {type: String, required: true}
});

const isSelected = computed(() => {
  return props.game.id === props.selectedId;
});

</script>

<template>
  <div class="card" :class="{ 'selected': isSelected }">
    <div class="title">
      {{ game.title }}
    </div>
    <div class="content">
      <img :src="game.imageSrc" alt="Card Image" loading="lazy" />
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  height: max-content;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.card {
  transition: border 0.1s ease, box-shadow 0.1s ease;
}

.card.selected {
  border: 0.25rem solid #002849;
  box-shadow: 0 0 1.5rem rgb(0, 128, 255);
}

.card.selected::after {
  background-color: #3490dc;
}

.title {
  display: flex;
  justify-content: center;
  padding: 0.25rem;
  background-color: #4e0000;
  color: white;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content img {
  max-width: 100%;
  min-height: 100%;
}
</style>
