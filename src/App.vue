<script setup>
import AppNavigation from './components/common/AppNavigation.vue';
import AppPage from './components/common/AppPage.vue';
import GamesList from './components/Games/GamesList.vue';
</script>

<template>
  <AppPage>
    <template v-slot:header>
      <AppNavigation />
    </template>
    <template v-slot:content>
      <GamesList />
    </template>
  </AppPage>
</template>