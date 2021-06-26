<template>
  <q-page class="flex flex-center" v-if="getCharacterDetail">
    <div class="character-detail full-width" :style="getBackground" v-if="getCharacterDetail.thumbnail">
      <div class="row filter-blur">
        <div class="col-sm-6 col-xs-12 q-pa-md flex flex-center" v-if="getCharacterDetail.thumbnail">
          <q-img
            :ratio="1"
            contain
            :src="`${getCharacterDetail.thumbnail.path}.${getCharacterDetail.thumbnail.extension}`"
            alt="character-detail-img"
          />
        </div>
        <div class="col-sm-6 col-xs-12 q-pa-md self-start">
          <div class="col-12 text-h6">
            {{ getCharacterDetail.name }}
          </div>
          <p class="text-left full-width text-subtitle1 q-mt-md">
            {{ getCharacterDetail.description || 'Not Description' }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="row main-container flex-center content-center"
      v-if="getCharacterDetail && getCharacterDetail.comics && getCharacterDetail.stories"
    >
      <div
        class="col-12 q-mt-lg"
        v-if="getCharacterDetail.comics.items.length > 0 &&
        getCharacterDetail.stories.items.length > 0"
      >
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
        <div class="q-mt-lg q-pa-md">
          <router-view/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "characterDetail",

  data: () => ({
    routes: [
      {
        pathName: 'characterComics', title: 'Comics'
      },
      {
        pathName: 'characterStories', title: 'Stories'
      }
    ]
  }),

  methods: {
    ...mapActions('CharactersModule', ['fetchCharacterDetails'])
  },

  computed: {
    ...mapGetters('CharactersModule', ['getCharacterDetail']),

    getBackground () {
      return `background-image: url("${this.getCharacterDetail.thumbnail.path + '.' +this.getCharacterDetail.thumbnail.extension}")`
    }
  },

  mounted() {
    this.fetchCharacterDetails({characterId: this.$route.params.id})
      .then(() => {
        this.$router.push({
          name: 'characterComics'
        })
      })
  }
}
</script>

<style scoped lang="scss">
.character-detail {
  background-size: cover;
  background-repeat: no-repeat;
  color: white !important;
}
.q-img {
  max-width: 500px !important;
}
</style>
