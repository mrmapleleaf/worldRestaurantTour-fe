<template>
  <div class="container">
    <h1>世界の国々</h1>
    <countryContainer></countryContainer>
    <NuxtLink v-bind:to="{ name: 'index' }">Topに戻る</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import countryContainer from '~/components/countries/countryContainer.vue';
</script>

<style scoped>
.container {
  text-align: center;
}
</style>
