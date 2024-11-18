import { defineStore } from 'pinia';
import type { Countries } from '~/interfaces';

export const useCounterStore = defineStore('countries', () => {
  const countries = ref([] as Array<Countries>);
  return countries;
});
