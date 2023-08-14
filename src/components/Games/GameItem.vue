<script setup>
defineProps({
  title: String,
  imageSrc: String,
  provider: String
});
</script>

<template>
  <div class="card">
    <div class="title">{{ title }}</div>
    <div class="content">
      <img :src="imageSrc" alt="Card Image" loading="lazy" />
    </div>
    <div class="provider">
      <div class="chip">{{ provider }}</div>
    </div>
  </div>
</template>

<style scoped>
.card {
  min-width: 12.5rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  min-height: 12.5rem;
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