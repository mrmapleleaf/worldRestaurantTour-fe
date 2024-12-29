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

const baseValidation = (val: any) => {
  return (val && val.length > 0) || 'このフィールドは必須です';
};
const controlCharValidation = (val: any) => {
  const controlCharPattern = /[\x00-\x1F\x7F]/;
  return controlCharPattern.test(val) ? '制御文字は含められません' : true;
};
const symbolValidation = (val: any) => {
  const symbolPattern =
    /[\u0021-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u007E]/;
  return symbolPattern.test(val) ? '記号は含められません' : true;
};
const lengthValidation = (val: any, length: number) => {
  console.log('valのlength', val.length);
  return val.length <= length || `${length}文字以内で入力してください`;
};
const urlValidation = (val: any) => {
  console.log('urlValidation');
  // regex-weburl.js(https://gist.github.com/dperini/729294)を利用
  const re_weburl = new RegExp(
    '^' +
      // protocol identifier (optional)
      // short syntax // still required
      '(?:(?:(?:https?|ftp):)?\\/\\/)' +
      // user:pass BasicAuth (optional)
      '(?:\\S+(?::\\S*)?@)?' +
      '(?:' +
      // IP address exclusion
      // private & local networks
      '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
      '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
      '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broadcast addresses
      // (first & last IP address of each class)
      '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
      '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
      '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
      '|' +
      // host & domain names, may end with dot
      // can be replaced by a shortest alternative
      // (?![-_])(?:[-\\w\\u00a1-\\uffff]{0,63}[^-_]\\.)+
      '(?:' +
      '(?:' +
      '[a-z0-9\\u00a1-\\uffff]' +
      '[a-z0-9\\u00a1-\\uffff_-]{0,62}' +
      ')?' +
      '[a-z0-9\\u00a1-\\uffff]\\.' +
      ')+' +
      // TLD identifier name, may end with dot
      '(?:[a-z\\u00a1-\\uffff]{2,}\\.?)' +
      ')' +
      // port number (optional)
      '(?::\\d{2,5})?' +
      // resource path (optional)
      '(?:[/?#]\\S*)?' +
      '$',
    'i'
  );
  return re_weburl.test(val) || '不適切なurlです';
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
