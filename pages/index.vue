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
import type { Countries } from '~/interfaces';

const allCountries = ref<Array<Countries>>([]);
const unvisitedCountry = ref<Array<Countries>>([]);
const nextCountry = ref<Countries | null>(null);

onMounted(() => {
  getAllCountries();
  getNextCountry();
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
    (country) => !country.completed
  );
};

const chooseNextCountry = () => {
  getUnvisitedCountry();

  const index = Math.floor(Math.random() * unvisitedCountry.value.length);
  const selectedCountry = unvisitedCountry.value[index];
  const confirmFlg = confirm(
    `次に行く国は　${selectedCountry.name}　です！この国に決定していいですか？`
  );
  if (confirmFlg) {
    nextCountry.value = selectedCountry;
    changeNextCountry(nextCountry.value.id, true);
  }
};

const changeNextCountry = async (id: number, next: boolean) => {
  await $fetch('http://localhost:8080/country/changeNextCountry', {
    method: 'PUT',
    body: {
      id: id,
      next: next,
    },
  }).catch((error: any) => {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  });
};

const getNextCountry = async () => {
  let nextCountryList = new Array<Countries>();
  try {
    nextCountryList = await $fetch(
      'http://localhost:8080/country/nextCountry',
      {
        params: {
          next: true,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (nextCountryList.length !== 0) {
    nextCountry.value = nextCountryList[0];
  } else {
    nextCountry.value = null;
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
