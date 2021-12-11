<template>
  <section id="comicsFavorites">
    <div class="row flex flex-center" v-if="this.getComicsFavorites.length > 0">
      <div
        class="col-sm-4 col-md-4 col-lg-4 col-xs-6 q-pa-sm q-mt-lg"
        v-for="item in this.comicsFavorites"
        :key="item.id"
      >
        <marvel-card
          :item="item"
          component="comics"
          @addToFavorite="addToFavorite"
        />
      </div>
      <div class="q-pa-lg flex flex-center col-12">
        <q-pagination
          v-if="comicsFavorites.length !== 0"
          size="20px"
          v-model="current"
          :max="maxPagination"
          direction-links
          boundary-links
          color="red"
          input
          :input-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
        />
      </div>
    </div>
    <no-results v-else/>
  </section>
</template>

<script>
import MarvelCard from "components/MarvelCard";
import {mapActions, mapGetters} from "vuex";
import NoResults from "components/NoResults";

export default {
  name: "ComicsFavorites",

  components: {
    NoResults,
    MarvelCard
  },

  data: () => ({
    current: 1,
    perPage: 20,
  }),

  computed: {
    ...mapGetters('FavoriteModule', ['getComicsFavorites']),

    maxPagination () {
      return Math.ceil(this.getComicsFavorites.length / this.perPage)
    },

    start () {
      return this.perPage * (this.current - 1)
    },

    end () {
      return this.current * this.perPage
    },

    comicsFavorites () {
      return this.getComicsFavorites.slice(this.start, this.end)
    }
  },

  methods: {
    ...mapActions('FavoriteModule', ['addOrRemoveToComicsFavorites', 'fetchFavoritesComics']),

    addToFavorite (item) {
      this.addOrRemoveToComicsFavorites({
        comic: item,
        component: 'comicsFavorites'
      })
    }
  },

  mounted () {
    this.fetchFavoritesComics()
  }
}
</script>

<style scoped>

</style>
