<template>
  <div class="container">
    <div class="q-pa-md">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
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
        <q-select filled v-model="countryId" :options="options" label="国" />
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
const $q = useQuasar();
const name = ref(null);
const countryId = ref(null);
const url = ref(null);
const thoughts = ref(null);
const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

const onSubmit = () => {};

const onReset = () => {
  name.value = null;
  countryId.value = null;
  url.value = null;
  thoughts.value = null;
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
