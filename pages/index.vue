<template>
  <div>
    <h1>indexページです</h1>
    <template v-if="nextCountry">
      <template v-if="choosingFlg">
        <h2>選択中...</h2>
      </template>
      <template v-else>
        <h2>{{ nextCountry.name }}</h2>
      </template>
    </template>
    <template v-else>
      <h2>何が出るかな？</h2>
    </template>
    <button v-on:click="chooseNextCountry()">次に行く国を選ぶ！</button
    ><br /><br />
    <NuxtLink v-bind:to="{ name: 'countries' }">世界の国々</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Country } from '~/interfaces';

let allCountries = ref([] as Array<Country>);
let unvisitedCountry = ref([] as Array<Country>);
let nextCountry = ref();
let choosingFlg = ref(false);

const getAllCountries = async () => {
  try {
    allCountries.value = await $fetch(
      'http://localhost:8080/country/allCountries'
    );
  } catch (error) {
    console.log(error);
  }
};

const getUnvisitedCountry = () => {
  unvisitedCountry.value = allCountries.value.filter((country) => {
    return !country.completed;
  });
};

const chooseNextCountry = () => {
  choosingFlg.value = true;

  getUnvisitedCountry();
  const index = Math.floor(Math.random() * unvisitedCountry.value.length);
  nextCountry.value = unvisitedCountry.value[index];

  setTimeout(() => {
    choosingFlg.value = false;
  }, 3000);
};

onMounted(() => {
  getAllCountries();
});
</script>

<style scoped></style>
