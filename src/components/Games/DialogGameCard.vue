<script setup>
import { computed } from 'vue';

const props = defineProps({
  game: { type: Object, required: true },
  selectedId: {type: String, required: true}
});

const isSelected = computed(() => props.game.id === props.selectedId);
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
  margin-bottom: 1rem;
  background-color: #f3f4f6;
  border-radius: 0.5rem;
  box-shadow: 0 0.375rem 0.25rem rgba(0, 0, 0, 0.1);
  transition: border 0.1s ease, box-shadow 0.1s ease;
}

.card.selected {
  border: 0.25rem solid #002849;
  box-shadow: 0 0 1.5rem rgb(0, 128, 255);
}

.card.selected::after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #3490dc;
  opacity: 0.1;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
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
  overflow: hidden;
  padding: 0.75rem;
}

.content img {
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

@media screen and (min-width: 768px) {
  .card {
    margin-bottom: 0;
    height: auto;
  }
  
  .content {
    padding: 0.75rem;
  }
}
</style>
