<template>
  <div>
    <template v-if="loading">
      <p>読み込み中</p>
    </template>
    <template v-else>
      <template v-if="restaurants.length === 0">
        <p>表示する内容がありません</p>
      </template>
      <template v-else>
        <div class="restaurantsList">
          <table>
            <thead>
              <th>店名</th>
              <th>国名</th>
            </thead>
            <tbody>
              <tr v-for="restaurant in restaurants">
                <td>
                  <NuxtLink
                    class="link"
                    :to="{
                      name: 'restaurants-id',
                      params: { id: restaurant.id },
                    }"
                  >
                    {{ restaurant.name }}
                  </NuxtLink>
                </td>
                <td>
                  {{ restaurant.countries.name }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant, AllRestaurantsIndexResponse } from '~/interfaces';

let restaurants = ref([] as Array<Restaurant>);
let loading = ref(false);

onMounted((): void => {
  getAllRestaurant();
});

const getAllRestaurant = async () => {
  loading.value = true;
  try {
    const response = await $fetch<AllRestaurantsIndexResponse>(
      'http://localhost:8080/restaurant/allRestaurants'
    );
    restaurants.value = response.contents;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="css">
table {
  border-collapse: collapse;
}

th {
  border: 1px grey solid;
  border-collapse: collapse;
  background-color: rgb(246, 242, 242);
  width: 200px;
}

.restaurantsList {
  text-align: center;
  display: inline-block;
}

.link {
  display: block;
  text-decoration: none;
  color: black;
}

.link:hover {
  background-color: #fce2aa;
}
</style>
