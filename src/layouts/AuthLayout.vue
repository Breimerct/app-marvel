<template>
  <q-layout view="lHh Lpr lff" class="non-selectable">
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout"
}
</script>

<style scoped lang="scss">
.q-layout {
  min-height: 100vh !important;
}
</style>
