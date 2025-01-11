<template>
  <div class="container">
    <h1>レストラン一覧<q-icon :name="mdiSilverwareForkKnife" /></h1>
    <restaurantContainer></restaurantContainer>
  </div>
</template>

<script setup lang="ts">
import restaurantContainer from '~/components/restaurants/restaurantContainer.vue';
import { mdiAccountKey, mdiSilverwareForkKnife } from '@quasar/extras/mdi-v6';
</script>

<style lang="css" scoped>
.container {
  text-align: center;
}
</style>
