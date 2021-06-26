<template>
  <div class="flex flex-center full-width q-mt-xl">
    <img
      :src="img"
      alt="no-results-img"
      :width="isMobile ? '150' : '250'"
    />
    <p class="text-center text-bold full-width">
      NO RESULTS
    </p>
  </div>
</template>

<script>
import imgNoResult from 'src/assets/no-results.svg'
export default {
  name: "NoResults",

  data: () => ({
    img: imgNoResult
  }),

  computed: {
    isMobile () {
      return this.$q.platform.is.mobile
    }
  }
}
</script>

<style scoped lang="scss">
p {
  font-size: 20px;
}
</style>
