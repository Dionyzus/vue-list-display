<script setup>
import { defineProps, ref } from 'vue';

defineProps({
  game: { type: Object, required: true }
});

const isHovered = ref(false);
</script>

<template>
  <div class="card" @mouseover="isHovered = true" @mouseout="isHovered = false">
    <div class="title" :class="{ 'hovered': isHovered }">
      {{ game.title }}
    </div>
    <div class="content">
      <img :src="game.imageSrc" alt="Card Image" loading="lazy" :class="{ 'hovered': isHovered }" />
      <button class="modal-trigger" @click="$emit('isModalVisible', true)">
        <font-awesome-icon icon="info-circle" />
        <span class="trigger-text">Details</span>
      </button>
    </div>
    <div class="provider" :class="{ 'hovered': isHovered }">
      <div class="chip" :class="{ 'hovered': isHovered }">
        {{ game.provider }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
}

.modal-trigger {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #6a49ff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: none;
  text-transform: uppercase;
}

.card:hover .modal-trigger {
  display: block;
}

.trigger-text {
  padding-left: 0.35rem;
}

.title {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #4e0000;
  color: white;
  font-size: 1.2rem;
  text-transform: uppercase;
  transition: filter 0.3s ease;
}

.title.hovered {
  filter: blur(2px);
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.content img {
  max-width: 100%;
  height: 15rem;
  transition: filter 0.3s ease;
}

.content img.hovered {
  filter: blur(2px);
}

.provider {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  background-color: #6a49ff;
  transition: filter 0.3s ease;
}

.provider.hovered {
  filter: blur(2px);
}

.chip {
  display: flex;
  justify-content: center;
  min-width: 10rem;
  padding: 0.5rem;
  background-color: #9fb9ff;
  border-radius: 16px;
}
</style>
