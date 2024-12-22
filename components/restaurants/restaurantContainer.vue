<template>
  <ClientOnly>
    <div>
      <h2>一覧のコンテナです</h2>
      <template v-if="loading">
        <p>読み込み中</p>
      </template>
      <template v-else>
        <template v-if="restaurants.length === 0">
          <p>表示する内容がありません</p>
        </template>
        <template v-else>
          {{ restaurants }}
        </template>
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Restaurant, AllRestaurantsIndexResponse } from '~/interfaces';

let restaurants = ref([] as Array<Restaurant>);
let loading = ref(false);

const getAllRestaurant = async () => {
  loading.value = true;
  try {
    const response = await $fetch<AllRestaurantsIndexResponse>(
      'http://localhost:8080/restaurant/allRestaurants'
    );
    restaurants.value = response.restaurants;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="css"></style>
