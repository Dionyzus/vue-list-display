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
    const pageCount = computed(() =>
      Math.ceil(props.itemCount / props.itemsPerPage)
    );

    const pages = computed(() => {
      return Array.from({ length: pageCount.value }, (_, i) => i + 1);
    });

    return { pageCount, pages };
  }
};
</script>

<template>
  <div>
    <slot></slot>
    <div class="pagination">
      <button type="button" :class="[
        'button--link button--large',
        { isActive: page === currentPage }
      ]" v-for="page in pages" :key="page" @click="$emit('changePage', page)">
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
  margin-top: 1rem;
}

button {
  margin: 0 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>
