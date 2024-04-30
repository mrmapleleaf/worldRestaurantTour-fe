import { defineStore } from 'pinia';
import type { Country } from '~/interfaces';

export const useCounterStore = defineStore('countries', () => {
  const countries = ref([] as Array<Country>);
  return countries;
});
