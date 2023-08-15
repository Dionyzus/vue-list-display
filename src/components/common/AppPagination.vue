<script>
import { computed } from 'vue';

export default {
  emits: ['changePage'],
  props: {
    itemCount: { type: Number, required: true },
    itemsPerPage: { type: Number, default: 10 },
    currentPage: { type: Number, required: true }
  },
  setup(props) {
    const pageCount = computed(() =>Math.ceil(props.itemCount / props.itemsPerPage));
    const pages = computed(() =>  Array.from({ length: pageCount.value }, (_, i) => i + 1));

    return { pageCount, pages };
  }
};
</script>

<template>
  <div>
    <slot></slot>
    <div class="pagination">
      <button 
        type="button"
        :class="['button', { isActive: page === currentPage }]"
        :key="page"
        :disabled="page === currentPage"
        v-for="page in pages"
        @click="$emit('changePage', page)">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  margin: 0 0.15rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.button[disabled] {
  cursor: not-allowed;
}

.isActive {
  background-color: #003663;
  color: white;
}
</style>
