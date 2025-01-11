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
          <div class="countryList q-pb-xl">
            <q-markup-table bordered>
              <thead>
                <tr>
                  <th>
                    <span class="text-weight-bolder text-subtitle2">国名</span>
                  </th>
                  <th>
                    <span class="text-weight-bolder text-subtitle2"
                      >訪問経験</span
                    >
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="country in countries">
                  <td>
                    {{ country.name }}
                  </td>
                  <td v-if="country.completed">
                    <a @click="onClickCountryName(country.id)">訪問済</a>
                  </td>
                  <td v-else>未訪問</td>
                </tr>
              </tbody>
            </q-markup-table>
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

const onClickCountryName = async (countryId: number) => {
  try {
    const response = await $fetch<RestaurantResponse>(
      `http://localhost:8080/restaurant/detail/${countryId}`
    );

    console.log(response);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getAllCountries();
});
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

.countryList {
  text-align: center;
  display: inline-block;
}
</style>
