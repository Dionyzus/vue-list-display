<script setup>
import { ref } from 'vue';

defineProps({
  label: { type: String, default: 'Filter By' },
  availableFilters: { type: [Array, Object], required: true }
});
const emit = defineEmits(['onFilterChange']);

const selectedFilter = ref('');

const handleFilterChange = () => emit('onFilterChange', selectedFilter.value);
</script>

<template>
  <div class="filter">
    <label class="label">{{ label }}:</label>
    <select v-model="selectedFilter" @change="handleFilterChange">
      <option value="">All</option>
      <option v-for="filter in availableFilters" :value="filter" :key="filter">
        {{ filter }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.filter {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  padding: 0.25rem;
  background-color: #001c77;
  border-radius: 0.25rem;
}

.label {
  margin-left: 0.75rem;
  margin-right: 1.25rem;
  color: white;
}

@media screen and (max-width: 768px) {
  .label {
    display: none;
  }
}

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>