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
          <div class="countryList">
            <table>
              <thead>
                <th>国名</th>
                <th>訪問有無</th>
                <th>訪問した店</th>
              </thead>
              <tbody>
                <tr v-for="country in countries">
                  <td>{{ country.name }}</td>
                  <td v-if="country.completed">訪問済</td>
                  <td v-else>未訪問</td>
                  <td>行った店の名前を表示</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Countries } from '~/interfaces';

let countries = ref([] as Array<Countries>);
const loading = ref(false);

const getAllCountries = async () => {
  loading.value = true;
  try {
    countries.value = await $fetch(
      'http://localhost:8080/country/allCountries'
    );
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

<style scoped>
th {
  border: 1px grey solid;
  border-collapse: collapse;
  background-color: rgb(246, 242, 242);
  width: 200px;
}

.countryList {
  text-align: center;
  display: inline-block;
}
</style>
