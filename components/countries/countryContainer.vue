<template>
  <ClientOnly>
    <div>
      <template v-if="loading">
        <p>リストに表示する内容がありません</p>
      </template>
      <template v-else>
        <li v-for="country in countries">{{ country.name }}</li>
      </template>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Country } from '~/interfaces';

let countries = ref([] as Array<Country>);
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

<style scoped></style>
