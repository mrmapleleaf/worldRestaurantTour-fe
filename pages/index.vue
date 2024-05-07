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
    <div class="button_area">
      <button @click="chooseNextCountry">次に行く国を選ぶ！</button><br /><br />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Country } from '~/interfaces';

const allCountries = ref<Array<Country>>([]);
const unvisitedCountry = ref<Array<Country>>([]);
const nextCountry = ref<Country | null>(null);
const choosingFlg = ref(false);

onMounted(() => {
  getAllCountries();
});

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
    (country) => !country.is_completed
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
    decideNextCountry(nextCountry.value.id, true);
  }
  choosingFlg.value = false;
};

const decideNextCountry = async (id: number, is_next: boolean) => {
  try {
    await $fetch('http://localhost:8080/country/chooseNextCountry', {
      method: 'PUT',
      body: JSON.stringify({
        id: 1000,
        is_next: is_next,
      }),
    });
  } catch (error: any) {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  }
};
</script>

<style scoped>
.container {
  text-align: center;
}

.choosing_area {
  height: 200px;
  margin: 0 auto;
  border: 1px solid #000000;
  width: 80%;
  border-radius: 1rem;
}

.country_name {
  font-size: 50px;
  margin: 0;
}

.button_area {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
