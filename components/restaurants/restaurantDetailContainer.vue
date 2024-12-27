<template>
  <ClientOnly>
    <template v-if="loading">
      <p>読み込み中</p>
    </template>
    <template v-else>
      <table>
        <th>レストラン名</th>

        <th>国名</th>

        <th>URL</th>

        <th>感想</th>

        <td>{{ restaurantDetail.name }}</td>

        <td>{{ restaurantDetail.countries.name }}</td>

        <td>{{ restaurantDetail.url }}</td>

        <td>{{ restaurantDetail.thoughts }}</td>
      </table>
    </template>
  </ClientOnly>
</template>
<script setup lang="ts">
import type {
  Restaurant,
  RestaurantDetailResponse,
  Countries,
} from '~/interfaces';

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
table {
  margin-left: auto;
  margin-right: auto;
}
</style>
