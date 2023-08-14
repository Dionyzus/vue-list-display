<script setup>
defineProps({
  game: { type: Object, required: true },
});
</script>

<template>
  <div class="card">
    <div class="title">{{ game.title }}</div>
    <div class="content">
      <img :src="game.imageSrc" alt="Card Image" loading="lazy" />
    </div>
    <div class="provider">
      <div class="chip">{{ game.provider }}</div>
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

.title {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #4e0000;
  color: white;
  font-size: 1.2rem;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content img {
  max-width: 100%;
  height: 15rem;
}

.provider {
  display: flex;
  justify-content: center;
  padding: 0.75rem;
  background-color: #6a49ff;
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