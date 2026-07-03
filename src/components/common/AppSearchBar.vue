<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['onSearch']);

const searchQuery = ref('');

watch(searchQuery, (newQuery) => emit('onSearch', newQuery));
</script>

<template>
  <div class="search-bar">
    <input v-model="searchQuery" @input="handleSearch" placeholder="Search..." />
  </div>
</template>

<style scoped>
.search-bar {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background-color: #001c77;
  border-radius: 0.25rem;
}

input {
  padding: 0.5rem 1rem;;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
}
</style>
