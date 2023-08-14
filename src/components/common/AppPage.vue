<script setup>
import AppNavigation from './AppNavigation.vue';
</script>

<template>
  <div class="page">
    <header class="header">
      <AppNavigation />
    </header>
    <main class="content">
      <slot></slot>
    </main>
  </div>
</template>
  
<style scoped>
.page {
  font-family: "Open Sans", sans-serif;
}

.header {
  background-color: #630000;
  padding: 1rem;
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.content {
  display: flex;
}
</style>
  