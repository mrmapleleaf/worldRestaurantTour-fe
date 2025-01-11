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
        <div class="restaurantsList q-pb-xl">
          <q-markup-table bordered>
            <thead>
              <tr>
                <th>
                  <span class="text-weight-bolder text-subtitle2">店名</span>
                </th>
                <th>
                  <span class="text-weight-bolder text-subtitle2">国名</span>
                </th>
              </tr>
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
          </q-markup-table>
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

<style lang="css" scoped>
.q-table thead {
  height: 70px;
}

th {
  width: 200px;
  background-color: whitesmoke;
}

.restaurantsList {
  text-align: center;
  display: inline-block;
}

.link {
  text-decoration: none;
  color: #3ea6ff;
  display: inline-block;
  transition: 0.3s;
  transform: scale(1);
}
.link:hover {
  font-weight: bold;
  transform: scale(1.05);
}
</style>
