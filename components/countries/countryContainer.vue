<template>
  <ClientOnly>
    <div>
      <template v-if="loading">
        <p>読み込み中</p>
      </template>
      <template v-else>
        <template v-if="countries.length === 0">
          <p>表示する内容がありません</p>
        </template>
        <template v-else>
          <div class="country-list q-pb-xl">
            <div class="competed-countries-counter q-pb-lg">
              <span class="q-pa-lg"
                >訪問した国数：<span class="text-h4"
                  >{{ completedCountryCount }} / {{ countries.length }}</span
                >
                ヵ国</span
              >
            </div>
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
                    {{ props.row.isCompleted }}
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </template>
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type {
  Countries,
  AllCountriesIndexResponse,
  RestaurantResponse,
} from '~/interfaces';

let countries = ref([] as Array<Countries>);
const loading = ref(false);
const completedCountryCount = ref(0);
const columns = ref([] as any);
const rows = ref([] as any);

const getAllCountries = async () => {
  loading.value = true;
  try {
    const response = await $fetch<AllCountriesIndexResponse>(
      'http://localhost:8080/country/allCountries'
    );
    countries.value = response.countries;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

const countCompletedCountry = (countries: Array<Countries>) => {
  return countries.filter((country: Countries) => country.completed).length;
};

onMounted(async () => {
  await getAllCountries();
  completedCountryCount.value = countCompletedCountry(countries.value);
  arrangeDataForQTable();
});

const arrangeDataForQTable = () => {
  columns.value = [
    {
      name: 'countryName',
      required: true,
      label: '国名',
      align: 'center',
      field: (row: { name: any }) => row.name,
      format: (val: any) => `${val}`,
    },
    {
      name: 'isCompleted',
      required: true,
      label: '訪問経験',
      align: 'center',
      field: 'isCompleted',
    },
  ];
  rows.value = countries.value.map((country) => {
    return {
      id: country.id,
      name: country.name,
      isCompleted: country.completed ? '訪問済み' : '未訪問',
    };
  });
};
</script>

<style lang="css" scoped>
th {
  border-collapse: collapse;
  background-color: rgb(246, 242, 242);
  width: 200px;
}

.q-table thead {
  height: 70px;
}

.country-list {
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
