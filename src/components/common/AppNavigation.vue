<template>
  <nav class="navbar">
    <div>Online Casino</div>
    <button class="navbar-toggler" @click="toggleNav">
      <font-awesome-icon icon="bars" />
    </button>
    <ul :class="['nav-links', { 'open': isNavOpen }]">
      <li><a href="#">SPORT</a></li>
      <li><a href="#">LIVE</a></li>
      <li><a href="#">LOTO</a></li>
      <li><a href="#">CASINO</a></li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue';

const isNavOpen = ref(false);
const toggleNav = () => isNavOpen.value = !isNavOpen.value;
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #630000;
  color: white;
  padding: 0.25rem;
}

.navbar-toggler {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: white;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 1rem;
}

.nav-links li a {
  text-decoration: none;
  color: white;
  padding: 0.2rem 0.4rem;
}

.nav-links.open {
  display: block;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #630000;
  padding: 1rem 0;
}

@media screen and (max-width: 768px) {
  .navbar-toggler {
    display: block;
  }

  .nav-links {
    display: none;
    position: static;
    background-color: transparent;
    padding: 0;
    width: auto;
  }

  .nav-links.open {
    display: block;
    flex-direction: column;
  }

  .nav-links.open li a {
    padding: 0.5rem 1rem;
  }
}
</style>