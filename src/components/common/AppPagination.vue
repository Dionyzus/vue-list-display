<script setup>
import { computed, defineEmits,ref } from 'vue';

defineEmits(['changePage']);

const props = defineProps({
  itemCount: { type: Number, required: true },
  itemsPerPage: { type: Number, default: 12 },
  currentPage: { type: Number, required: true }
});

const maxVisiblePages = ref(3);

const pageCount = computed(() => Math.ceil(props.itemCount / props.itemsPerPage));

// default pages calculation without taking ranges into account
//const pages = computed(() => Array.from({ length: pageCount.value }, (_, i) => i + 1));

const visiblePages = computed(() => {
  const startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages.value / 2));
  const endPage = Math.min(pageCount.value, startPage + maxVisiblePages.value - 1);

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const shouldDisplayLeadingEllipsis = computed(() => {
  return visiblePages.value[0] > maxVisiblePages.value + 1;
});

const shouldDisplayTrailingEllipsis = computed(() => {
  const currentVisiblePages = visiblePages.value[visiblePages.value.length - 1];

  return currentVisiblePages < pageCount.value - maxVisiblePages.value;
});
</script>

<template>
  <div>
    <slot></slot>
    <div class="pagination">
      <button @click="$emit('changePage', currentPage - 1)" :disabled="currentPage === 1">
        &lt;
      </button>

      <button
        :class="['min-max-button', { 'hidden': currentPage <= maxVisiblePages }]"
        :key="1"
        :disabled="1 === currentPage"
        @click="$emit('changePage', 1)"
      >
        1
      </button>

      <span v-if="shouldDisplayLeadingEllipsis" class="ellipsis">...</span>

      <button
        :class="['button', { 'active': page === currentPage }]"
        :key="page"
        :disabled="page === currentPage"
        v-for="page in visiblePages"
        @click="$emit('changePage', page)"
      >
        {{ page }}
      </button>

      <span v-if="shouldDisplayTrailingEllipsis" class="ellipsis">...</span>

      <button
        :class="['min-max-button', { 'hidden': currentPage >= pageCount - 1}]"
        :key="pageCount"
        :disabled="pageCount === currentPage"
        @click="$emit('changePage', pageCount)"
      >
        {{ pageCount }}
      </button>

      <button @click="$emit('changePage', currentPage + 1)" :disabled="currentPage === pageCount">
        &gt;
      </button>
    </div>
  </div>
</template>

<style scoped>
.ellipsis {
  margin: 0 0.35rem;
  font-weight: bold;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}

.min-max-button.hidden {
  display: none;
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

.active {
  background-color: #003663;
  color: white;
}
</style>
