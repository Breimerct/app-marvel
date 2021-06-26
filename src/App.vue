<template>
  <div id="q-app" class="non-selectable">
    <router-view />
  </div>
</template>
<script>
import {mapActions} from 'vuex'

export default {
  name: 'App',

  methods: {
    ...mapActions('UserModule', ['fetchUserDB']),
    ...mapActions(['darkMode'])
  },

  created () {
    this.darkMode()
    this.fetchUserDB()
  }
}
</script>
<style scoped lang="scss">
#q-app {
  min-height: 100vh !important;
}
</style>
