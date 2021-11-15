<template>
  <section class="row flex flex-center">
    <div
      class="col-sm-4 col-md-4 col-lg-4 col-xs-6 q-pa-sm q-mt-lg"
      v-for="item in getComics.results"
      :key="item.id"
    >
      <marvel-card
        :item="item"
        component="charactersDetail"
        @addToFavorite="addOrRemoveToFavorite"
      />
    </div>
    <div class="q-pa-lg flex flex-center col-12" v-if="getComics.total > perPage">
      <q-pagination
        size="13px"
        v-model="currentPage"
        :max="maxPagination"
        direction-links
        boundary-links
        color="red"
        input
        :input-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
        @input="fetchNextComics"
      />
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MarvelCard from "components/MarvelCard";

export default {
  name: "comics",

  components: {
    MarvelCard
  },

  data: () => ({
    currentPage: 1,
    perPage: 6
  }),

  methods: {
    ...mapActions('CharactersModule', ['fetchCharacterComics']),
    ...mapActions('FavoriteModule', ['addOrRemoveToComicsFavorites']),

    fetchNextComics () {
      let offset = this.perPage * (this.currentPage - 1)
      this.fetchCharacterComics({
        characterId: this.$route.params.id,
        offset: offset,
        limit: this.perPage
      })
    },

    addOrRemoveToFavorite (item) {
      this.addOrRemoveToComicsFavorites({
        comic: item,
        component: 'characterComics'
      })
    }
  },

  computed: {
    ...mapGetters('ComicsModule', ['getComics']),

    maxPagination () {
      return Math.ceil(this.getComics.total / this.perPage)
    }
  },

  mounted() {
    this.fetchCharacterComics({
      characterId: this.$route.params.id,
      offset: 0,
      limit: this.perPage
    })
  }
}
</script>

<style scoped lang="scss">
.text-white {
  color: #ffff !important;
}
</style>
