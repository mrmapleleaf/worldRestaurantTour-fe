<template>
  <div class="container">
    <h1>レストラン詳細</h1>
    <restaurantDetailContainer
      v-bind:restaurantId="restaurantId"
    ></restaurantDetailContainer>
  </div>
</template>

<script setup lang="ts">
import restaurantDetailContainer from '~/components/restaurants/restaurantDetailContainer.vue';

interface Props {
  restaurantId: string | string[];
}
const route = useRoute();
const restaurantId = route.params.id;
</script>

<style lang="css">
.container {
  text-align: center;
}
</style>
