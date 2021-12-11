<template>
  <section v-if="this.getCharacters.results">
    <div class="row flex flex-center full-height" v-if="this.getCharacters.results.length > 0">
      <div
        class="col-sm-4 col-md-4 col-lg-4 col-xs-6 q-pa-sm q-mt-lg"
        v-for="item in this.getCharacters.results"
        :key="item.id"
      >
        <marvel-card
          :item="item"
          component="comicsDetail"
          @addToFavorite="addToFavorite"
        />
      </div>
      <div class="q-pa-lg flex flex-center col-12" v-if="this.getCharacters.total > perPage">
        <q-pagination
          size="13px"
          v-model="currentPage"
          :max="maxPagination"
          direction-links
          boundary-links
          color="red"
          input
          :input-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
          @input="fetchNextCharacters"
        />
      </div>
    </div>
    <div v-else class="flex flex-center full-width">
      <img
        :src="img"
        alt="no-results-img"
        width="150"
      />
      <p class="text-center full-width text-bold">
        NO RESULTS
      </p>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MarvelCard from "components/MarvelCard";
import imgNoResult from 'src/assets/no-results2.svg'

export default {
  name: "ComicCharacters",
  components: {
    MarvelCard
  },
  data: () => ({
    currentPage: 1,
    perPage: 6,
    img: imgNoResult
  }),

  computed: {
    ...mapGetters('CharactersModule', ['getCharacters']),

    maxPagination () {
      return Math.ceil(this.getCharacters.total / this.perPage)
    }
  },

  methods: {
    ...mapActions('ComicsModule', ['fetchComicsCharacters']),
    ...mapActions('FavoriteModule', ['addOrRemoveToCharacterFavorites']),

    fetchNextCharacters () {
      let offset = this.perPage * (this.currentPage - 1)
      this.fetchComicsCharacters({
        comicId: this.$route.params.id,
        offset: offset,
        limit: this.perPage
      })
    },

    addToFavorite (item) {
      this.addOrRemoveToCharacterFavorites({
        character: item,
        component: 'comicCharacters'
      })
    }
  },

  mounted () {
    this.fetchComicsCharacters({
      comicId: this.$route.params.id,
      offset: 0,
      limit: this.perPage
    })
  }
}
</script>

<style scoped>

</style>
