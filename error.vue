<template>
  <h1>StatusCode : {{ $props.error.statusCode }}</h1>
  <h2>{{ $props.error.statusMessage }}</h2>
  <component :is="errorPage" /><br />
  <button @click="handleError">TOPへ戻ります</button>
</template>

<script setup lang="ts">
import error403 from '~/components/error/403.vue';
import error404 from '~/components/error/404.vue';
import error500 from '~/components/error/500.vue';

// Props
interface Props {
  error: Error;
}
const props = defineProps<Props>();

// Valiables
const errorPage = computed(() => {
  if (props.error.statusCode === 403) {
    return error403;
  } else if (props.error.statusCode === 404) {
    return error404;
  } else {
    return error500;
  }
});

// Functions
const handleError = () => clearError({ redirect: '/' });
</script>
