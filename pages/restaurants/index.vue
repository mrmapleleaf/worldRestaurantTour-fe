<template>
  <div class="container">
    <h1>行ったレストラン一覧</h1>
    <restaurantContainer></restaurantContainer>
  </div>
</template>

<script setup lang="ts">
import restaurantContainer from '~/components/restaurants/restaurantContainer.vue';
</script>

<style lang="css" scoped>
.container {
  text-align: center;
}
</style>
