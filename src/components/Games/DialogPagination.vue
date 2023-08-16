<script setup>
import { computed } from 'vue';

const props = defineProps({
  itemCount: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 4 },
  currentPage: { type: Number, required: true }
});

defineEmits(['goToPage']);

const pageCount = computed(() => Math.ceil(props.itemCount / props.itemsPerPage));
</script>

<template>
  <div class="pagination-arrows">
    <button 
      class="pagination-arrow"
      @click="$emit('goToPage', currentPage - 1)"
      :disabled="currentPage === 1">
      <font-awesome-icon :icon="['fas', 'chevron-left']" />
    </button>
    <slot></slot>
    <button
      class="pagination-arrow"
      @click="$emit('goToPage', currentPage + 1)"
      :disabled="currentPage === pageCount">
      <font-awesome-icon :icon="['fas', 'chevron-right']" />
    </button>
  </div>
</template>

<style scoped>
.pagination-arrows {
  display: flex;
  justify-content: center;
  align-items: center;
}

.pagination-arrow {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin: 0 0.5rem;
}

.pagination-arrow[disabled] {
  color: #ccc;
  cursor: not-allowed;
}

@media screen and (max-width: 768px) {
  .pagination-arrows {
    flex-direction: column;
    align-items: center;
  }

  .pagination-arrow {
    margin: 0.25rem;
    font-size: 1rem;
  }
}
</style>