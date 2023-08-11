<script setup>
const items = [
  { id: 1, name: 'Game 1' },
  { id: 2, name: 'Game 2' },
  { id: 3, name: 'Game 3' },
  { id: 4, name: 'Game 4' },
  { id: 5, name: 'Game 5' }
];
</script>

<template>
  <div>
    <h2>Games</h2>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
</style>