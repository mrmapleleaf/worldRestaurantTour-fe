<template>
  <div class="container">
    <div class="q-pa-md">
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
        ref="restaurantFrom"
      >
        <q-input
          filled
          v-model="name"
          label="レストラン名"
          hint="※必須"
          lazy-rules
          :rules="[
            (val) => baseValidation(val),
            (val) => controlCharValidation(val),
            (val) => symbolValidation(val),
            (val) => lengthValidation(val, 50),
          ]"
        />
        <q-select
          filled
          v-model="countryId"
          :options="countriesOptions"
          option-label="label"
          option-value="value"
          emit-value
          map-options
          label="国"
          hint="※必須"
          :rules="[(val) => val || 'このフィールドは必須です']"
        />
        <q-input
          filled
          v-model="url"
          label="食べログやホームページのURL"
          hint=""
          lazy-rules
          :rules="[
            (val) => urlValidation(val),
            (val) => lengthValidation(val, 200),
          ]"
        />
        <q-input
          filled
          v-model="thoughts"
          label="感想"
          hint="※必須"
          type="textarea"
          lazy-rules
          :rules="[
            (val) => baseValidation(val),
            (val) => controlCharValidation(val),
            (val) => symbolValidation(val),
            (val) => lengthValidation(val, 200),
          ]"
        />
        <div>
          <q-btn label="Submit" type="submit" color="amber-7" />
          <q-btn
            label="Reset"
            type="reset"
            color="amber-7"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  AllCountriesIndexResponse,
  Countries,
  RestaurantResponse,
} from '~/interfaces';

const name = ref(null);
const countryId = ref(null);
const url = ref(null);
const thoughts = ref(null);

let countries = ref([] as Array<Countries>);
let countriesMap = ref(new Map());
let countriesOptions = ref([] as Array<{ value: number; label: string }>);

const onSubmit = async () => {
  const confirmFlg = confirm(
    '下記の内容で登録しますか？\n' +
      `レストラン名：${name.value} \n` +
      `国名：${countriesMap.value.get(countryId.value)} \n` +
      `URL：${url.value || '登録なし'} \n` +
      `感想：\n` +
      `${thoughts.value}`
  );
  if (confirmFlg) {
    // レストラン登録処理
    await registerRestaurant();
    makeChosenCountryCompleted();
  }
};

const onReset = () => {
  name.value = null;
  countryId.value = null;
  url.value = null;
  thoughts.value = null;
};

const getOptionsForQSelect = onMounted(async () => {
  // すべての国を取得
  await getAllCountries();

  // idと国名を抜き出して、Map化
  countries.value.map((country) => {
    countriesMap.value.set(country.id, country.name);
  });

  // Qselectの選択肢用にMapのエントリを配列化
  countriesOptions.value = Array.from(countriesMap.value.entries()).map(
    ([key, value]) => ({
      value: key,
      label: value,
    })
  );
  console.log(countriesOptions.value);
});

const getAllCountries = async () => {
  try {
    const response = await $fetch<AllCountriesIndexResponse>(
      'http://localhost:8080/country/allCountries'
    );
    countries.value = response.countries;
  } catch (error) {
    console.log(error);
  }
};

const registerRestaurant = async () => {
  let response: any;
  try {
    response = await $fetch<RestaurantResponse>(
      'http://localhost:8080/restaurant/register',
      {
        method: 'POST',
        body: {
          countryId: countryId.value,
          name: name.value,
          thoughts: thoughts.value,
          url: url.value,
        },
      }
    );
  } catch (error) {
    console.log(error);
  }

  if (response != null) {
    useModalStore().$state.isVisible = false;
    await navigateTo(`/restaurants/${response.id}`);
  }
};

const makeChosenCountryCompleted = async () => {
  await $fetch('http://localhost:8080/country/setCompleted', {
    method: 'PUT',
    body: {
      id: countryId.value,
    },
  }).catch((error: any) => {
    showError({
      statusCode: error.status,
      statusMessage: error.message,
    });
  });
};
</script>

<style lang="css" scoped>
.container {
  text-align: center;
}
.q-pa-md {
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
.q-select {
  padding-bottom: 20px;
}
</style>
