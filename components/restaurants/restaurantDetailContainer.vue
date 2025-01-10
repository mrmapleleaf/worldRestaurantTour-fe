<template>
  <ClientOnly>
    <template v-if="loading">
      <p>読み込み中</p>
    </template>

    <template v-else>
      <div class="q-pa-lg">
        <q-markup-table bordered>
          <thead>
            <tr>
              <th>
                <span class="text-weight-bolder text-subtitle2">店名</span>
              </th>
            </tr>
            <tr>
              <td>{{ restaurantDetail.name }}</td>
            </tr>
            <tr>
              <th>
                <span class="text-weight-bolder text-subtitle2">国名</span>
              </th>
            </tr>
            <tr>
              <td>{{ restaurantDetail.countries.name }}</td>
            </tr>
            <tr>
              <th>
                <span class="text-weight-bolder text-subtitle2">URL</span>
              </th>
            </tr>
            <tr>
              <td v-if="restaurantDetail.url">{{ restaurantDetail.url }}</td>
              <td v-else>未登録</td>
            </tr>
            <tr>
              <th>
                <span class="text-weight-bolder text-subtitle2">感想</span>
              </th>
            </tr>
            <tr>
              <td>{{ restaurantDetail.thoughts }}</td>
            </tr>
          </thead>
        </q-markup-table>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Restaurant, RestaurantDetailResponse } from '~/interfaces';
import { mdiAccountKey, mdiTableChair } from '@quasar/extras/mdi-v6';

let restaurantDetail: Restaurant = reactive<Restaurant>({
  id: 0,
  name: '',
  thoughts: '',
  url: '',
  countries: {
    id: 0,
    name: '',
    next: false,
    completed: false,
    created_at: '',
    updated_at: '',
  },
  created_at: '',
  updated_at: '',
});
let loading = ref(false);

interface Props {
  restaurantId: string | string[];
}
const props = defineProps<Props>();
const restaurantId = props.restaurantId;

const getRestaurantDetail = async () => {
  try {
    loading.value = true;
    const response = await $fetch<RestaurantDetailResponse>(
      `http://localhost:8080/restaurant/detail/${restaurantId}`
    );
    console.log(response);
    restaurantDetail = response.restaurant;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getRestaurantDetail();
});
</script>

<style lang="css" scoped>
.table_header {
  background-color: #ffbb70;
}
th {
  background-color: whitesmoke;
}
</style>
