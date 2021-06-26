<template>
  <q-page>
    <div class="row main-container q-mt-lg">
      <div class="col-12 flex flex-center">
        <q-img src="https://lacovacha.mx/wp-content/uploads/2017/11/Marvel-banner.png" contain>
          <div class="absolute-full text-center favorite-caption text-h3 text-uppercase flex flex-center">
            your favorite comics and characters
          </div>
        </q-img>
      </div>
      <div class="col-12">
        <q-tabs
          align="justify"
          active-color="red"
          indicator-color="red"
        >
          <q-route-tab
            v-for="(tab, index) in routes"
            :key="index"
            :to="{
              name: tab.pathName
            }"
            :label="tab.title"
          />
        </q-tabs>
        <q-separator />
        <div class="q-mt-lg q-pa-md container">
          <transition
            appear
            enter-active-class="animated fadeIn slow delay-2s"
            leave-active-class="animated fadeOut"
          >
            <router-view/>
          </transition>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: "Favorites",

  data: () => ({
    routes: [
      {
        pathName: 'charactersFavorites', title: 'Characters'
      },
      {
        pathName: 'comicsFavorites', title: 'Comics'
      }
    ]
  })
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

.favorite-caption {
  font-family: 'Anton', sans-serif;
  text-shadow: -4px 3px 0 #ff2d33, -14px 7px 0 #0a0e27;
  font-size: 2rem;
}
</style>
