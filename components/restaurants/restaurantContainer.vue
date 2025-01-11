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
          <q-table
            :rows="rows"
            :columns="columns"
            row-key="id"
            bordered
            :rows-per-page-options="[10, 25, 0]"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th class="text-h1" v-for="column in columns">
                  <span class="text-weight-bolder text-subtitle2">{{
                    column.label
                  }}</span></q-th
                >
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props" :key="`m_${props.row.id}`">
                <q-td>
                  <NuxtLink
                    class="link"
                    :to="{
                      name: 'restaurants-id',
                      params: { id: props.row.id },
                    }"
                  >
                    {{ props.row.name }}
                  </NuxtLink>
                </q-td>
                <q-td>
                  {{ props.row.countryName }}
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Restaurant, AllRestaurantsIndexResponse } from '~/interfaces';

let restaurants = ref([] as Array<Restaurant>);
let loading = ref(false);
const columns = ref([] as any);
const rows = ref([] as any);

onMounted(async () => {
  await getAllRestaurant();
  arrangeDataForQTable();
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

const arrangeDataForQTable = () => {
  columns.value = [
    {
      name: 'restaurantName',
      required: true,
      label: '店名',
      align: 'center',
      field: (row: { name: any }) => row.name,
      format: (val: any) => `${val}`,
    },
    {
      name: 'countryName',
      required: true,
      label: '国名',
      align: 'center',
      field: 'countryName',
    },
  ];
  rows.value = restaurants.value.map((restaurant) => {
    return {
      name: restaurant.name,
      id: restaurant.id,
      countryName: restaurant.countries.name,
    };
  });
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
