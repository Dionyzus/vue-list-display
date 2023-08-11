<script setup>
import { ref } from 'vue';

const title = ref('');
const description = ref('');
</script>

<template>
  <div v-if="isOpen">
    <div>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<style scoped></style>
