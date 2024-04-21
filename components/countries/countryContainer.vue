<template>
  <div>
    <p>国の一覧を表示するコンテナです</p>
  </div>
</template>

<script setup lang="ts">
import type { Country } from '~/interfaces';

const countries = ref([] as Array<Country>);
const loading = ref(false);

const getAllCountries = async () => {
  loading.value = true;
  try {
  } catch (error) {
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
