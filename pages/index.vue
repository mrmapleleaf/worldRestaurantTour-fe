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
      <template v-if="!nextCountry">
        <button @click="chooseNextCountry">次に行く国を選ぶ！</button
        ><br /><br />
      </template>
      <template v-else>
        <button @click="visitChosenCountry">この国に行ってきました！</button
        ><br /><br />
        <button @click="resetNextCountry">別の国にする</button><br /><br />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Countries } from '~/interfaces';

const allCountries = ref<Array<Countries>>([]);
const unvisitedCountry = ref<Array<Countries>>([]);
const nextCountry = ref<Countries | null>(null!);

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
    decideNextCountry(nextCountry.value.id, true);
  }
};

const resetNextCountry = () => {
  const confirmFlg = confirm(
    `次に行く国は${nextCountry.value!.name}でした。この国に行くのをやめますか？`
  );
  if (confirmFlg) {
    decideNextCountry(nextCountry.value!.id, false);
    nextCountry.value = null;
  }
};
const visitChosenCountry = () => {
  const confirmFlg = confirm(`${nextCountry.value!.name}に行ってきましたか？`);
  if (confirmFlg) {
    makeChosenCountryCompleted(nextCountry.value!.id, false, true);
    nextCountry.value = null;
  }
};

const makeChosenCountryCompleted = async (
  id: number,
  next: boolean,
  completed: boolean
) => {
  await $fetch('http://localhost:8080/country/makeChosenCountryCompleted', {
    method: 'PUT',
    body: {
      id: id,
      next: next,
      completed: completed,
    },
  }).catch((error: any) => {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  });
};

const decideNextCountry = async (id: number, next: boolean) => {
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
