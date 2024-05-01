<template>
  <div class="container">
    <h1>世界の料理を食べに行こう🍳</h1>
    <div class="choosing_area">
      <div class="inner_choosing_area">
        <p>次に行く国は...？</p>
        <template v-if="nextCountry">
          <p class="country_name">{{ nextCountry.name }}</p>
        </template>
      </div>
    </div>
    <button @click="chooseNextCountry">次に行く国を選ぶ！</button><br /><br />
    <NuxtLink :to="{ name: 'countries' }">世界の国々</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Country } from '~/interfaces';

const allCountries = ref<Array<Country>>([]);
const unvisitedCountry = ref<Array<Country>>([]);
const nextCountry = ref<Country | null>(null);
const choosingFlg = ref(false);

const getAllCountries = async () => {
  try {
    allCountries.value = await $fetch(
      'http://localhost:8080/country/allCountries'
    );
  } catch (error) {
    console.error(error);
  }
};

const getUnvisitedCountry = () => {
  unvisitedCountry.value = allCountries.value.filter(
    (country) => !country.completed
  );
};

const chooseNextCountry = () => {
  choosingFlg.value = true;
  getUnvisitedCountry();
  const index = Math.floor(Math.random() * unvisitedCountry.value.length);
  const selectedCountry = unvisitedCountry.value[index];
  const confirmFlg = confirm(
    `次に行く国は　${selectedCountry.name}　です！この国に決定していいですか？`
  );
  if (confirmFlg) {
    nextCountry.value = selectedCountry;
  }
  choosingFlg.value = false;
};

onMounted(() => {
  getAllCountries();
});
</script>

<style scoped>
.container {
  text-align: center;
}

.choosing_area {
  height: 200px;
}

.inner_choosing_area {
  margin: 0 auto;
  border: 1px solid #000000;
  width: 1200px;
  height: 150px;
  border-radius: 1rem;
}

.country_name {
  font-size: 50px;
  margin: 0;
}
</style>
