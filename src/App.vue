<script setup>
import AppNavigation from './components/common/AppNavigation.vue';
import AppPage from './components/common/AppPage.vue';
import HeroBanner from './components/common/HeroBanner.vue';
import GamesList from './components/Games/GamesList.vue';
</script>

<template>
  <AppPage>
    <template v-slot:header>
      <AppNavigation />
    </template>
    <template v-slot:content>
      <HeroBanner />
      <GamesList />
    </template>
  </AppPage>
</template>