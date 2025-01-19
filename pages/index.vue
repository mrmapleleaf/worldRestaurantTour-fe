<template>
  <div class="container">
    <h1>世界の料理を食べに行こう🍳</h1>
    <span>次に行く国は...？🌏</span>
    <div class="choosing_area">
      <template v-if="nextCountry">
        <div class="country_name">
          <span>{{ nextCountry.name }}</span>
        </div>
      </template>
    </div>
    <div class="button_area">
      <template v-if="!nextCountry">
        <button @click="setNextCountry">
          <label class="button-text">次に行く国を選ぶ！</label></button
        ><br /><br />
        <button @click="openModal">
          <label class="button-text">サンプル</label>
        </button>
      </template>
      <template v-else>
        <button @click="visitChosenCountry">
          <label class="button-text">この国に行ってきました！</label></button
        ><br /><br />
        <button @click="unsetNextCountry">
          <label class="button-text">別の国にする</label></button
        ><br /><br />
      </template>
    </div>
    <template v-if="modalStore.isVisible">
      <RegisterRestaurantModal></RegisterRestaurantModal>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import RegisterRestaurantModal from '~/components/restaurants/registerRestaurantModal.vue';
import type {
  Countries,
  AllCountriesIndexResponse,
  NextCountryResponse,
} from '~/interfaces';
import { useModalStore } from '~/stores/modal';

const allCountries = ref<Array<Countries>>([]);
const unvisitedCountry = ref<Array<Countries>>([]);
const nextCountry = ref<Countries | null>(null!);

const modalStore = useModalStore();

onMounted(() => {
  getAllCountries();
  getNextCountry();
});

const openModal = () => {
  const confirmFlg = confirm(`あの国に行ってきましたか？`);

  if (confirmFlg) {
    console.log(confirmFlg);
    const result = modalStore.showModal();
    console.log('isVisible', modalStore.$state.isVisible);
    console.log('open modal');
  }
};

const getAllCountries = async () => {
  try {
    const response = await $fetch<AllCountriesIndexResponse>(
      'http://localhost:8080/country/allCountries'
    );

    allCountries.value = response.countries;
  } catch (error) {
    console.error(error);
  }
};

const setNextCountry = () => {
  getUnvisitedCountry();

  const index = Math.floor(Math.random() * unvisitedCountry.value.length);
  const selectedCountry = unvisitedCountry.value[index];
  const confirmFlg = confirm(
    `次に行く国は　${selectedCountry.name}　です！この国に決定していいですか？`
  );
  if (confirmFlg) {
    nextCountry.value = selectedCountry;
    decideNextCountry(nextCountry.value.id);
  }
};

const getUnvisitedCountry = () => {
  unvisitedCountry.value = allCountries.value.filter(
    (country) => !country.completed
  );
};

const unsetNextCountry = () => {
  const confirmFlg = confirm(
    `次に行く国は${nextCountry.value!.name}でした。この国に行くのをやめますか？`
  );
  if (confirmFlg) {
    resetNextCountry(nextCountry.value!.id);
    nextCountry.value = null;
  }
};
const visitChosenCountry = async () => {
  const confirmFlg = confirm(`${nextCountry.value!.name}に行ってきましたか？`);

  if (confirmFlg) {
    modalStore.showModal();
  }
};

const decideNextCountry = async (id: number) => {
  await $fetch('http://localhost:8080/country/decideNextCountry', {
    method: 'PUT',
    body: {
      id: id,
    },
  }).catch((error: any) => {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  });
};

const resetNextCountry = async (id: number) => {
  await $fetch('http://localhost:8080/country/resetNextCountry', {
    method: 'PUT',
    body: {
      id: id,
    },
  }).catch((error: any) => {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  });
};

const getNextCountry = async () => {
  try {
    let response = await $fetch<NextCountryResponse>(
      'http://localhost:8080/country/nextCountry',
      {
        params: {
          next: true,
        },
      }
    );

    let nextCountryList = new Array<Countries>();
    nextCountryList = response.nextCountry;
    if (nextCountryList) {
      nextCountry.value = nextCountryList[0];
    } else {
      nextCountry.value = null;
    }
  } catch (error) {
    console.log(error);
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
  display: table;
}

.country_name {
  font-size: 50px;
  display: table-cell;
  vertical-align: middle;
}

.button_area {
  margin-top: 50px;
  margin-bottom: 50px;
}

button {
  width: 200px;
  height: 50px;
  background: #ffbb70;
  border: none;
  border-radius: 5px;
  font-weight: bold;
}

button:hover {
  background-color: #a46b15;
}

.button-text {
  color: white;
}
</style>
