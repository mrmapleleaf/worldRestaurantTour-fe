<template>
  <TheHeader></TheHeader>
  <main>
    <slot></slot>
  </main>
  <TheFooter></TheFooter>
</template>

<script setup></script>

<style lang="css">
header {
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
