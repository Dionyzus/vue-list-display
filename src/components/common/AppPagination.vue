<script setup>
import { computed, defineEmits } from 'vue';

defineEmits(['onPageChange']);

const props = defineProps({
  itemCount: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 12 },
  currentPage: { type: Number, required: true },
  maxVisiblePages: { type: Number, default: 3 }
});

const pageCount = computed(() => Math.ceil(props.itemCount / props.itemsPerPage));

const visiblePages = computed(() => {
  const startPage = Math.max(1, props.currentPage - Math.floor(props.maxVisiblePages / 2));
  const endPage = Math.min(pageCount.value, startPage + props.maxVisiblePages - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const shouldDisplayLeadingEllipsis = computed(() => {
  return visiblePages.value[0] > props.maxVisiblePages + 1;
});

const shouldDisplayTrailingEllipsis = computed(() => {
  const currentVisiblePages = visiblePages.value[visiblePages.value.length - 1];

  return currentVisiblePages < pageCount.value - props.maxVisiblePages;
});
</script>

<template>
  <div>
    <slot></slot>
    <div class="pagination">
      <button
        @click="$emit('onPageChange', currentPage - 1)"
        :disabled="currentPage === 1"
        class="page-number-btn"
        aria-label="Previous Page"
      >
        &lt;
      </button>

      <button
        :class="['page-number-btn', { 'hidden': currentPage <= maxVisiblePages }]"
        :key="1"
        :disabled="1 === currentPage"
        @click="$emit('onPageChange', 1)"
      >
        1
      </button>

      <span v-if="shouldDisplayLeadingEllipsis" class="ellipsis">...</span>

      <button
        :class="['page-number-btn', { 'active': page === currentPage }]"
        :key="page"
        :disabled="page === currentPage"
        v-for="page in visiblePages"
        @click="$emit('onPageChange', page)"
      >
        {{ page }}
      </button>

      <span v-if="shouldDisplayTrailingEllipsis" class="ellipsis">...</span>

      <button
        :class="['page-number-btn', { 'hidden': currentPage >= pageCount - 1}]"
        :key="pageCount"
        :disabled="pageCount === currentPage"
        @click="$emit('onPageChange', pageCount)"
      >
        {{ pageCount }}
      </button>

      <button
        @click="$emit('onPageChange', currentPage + 1)"
        :disabled="currentPage === pageCount"
        class="page-number-btn"
        aria-label="Next Page"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
.ellipsis {
  margin: 0 0.25rem;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.page-number-btn {
  margin: 0.15rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 1rem;
}

.page-number-btn[disabled] {
  cursor: not-allowed;
}

.page-number-btn.active {
  background-color: #003663;
  color: white;
}

.page-number-btn.hidden {
  display: none;
}
</style>
