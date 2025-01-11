<template>
  <div class="container">
    <h1>世界の国一覧<q-icon :name="mdiEarth" /></h1>
    <countryContainer></countryContainer>
  </div>
</template>

<script setup lang="ts">
import countryContainer from '~/components/countries/countryContainer.vue';
import { mdiEarth } from '@quasar/extras/mdi-v6';
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
