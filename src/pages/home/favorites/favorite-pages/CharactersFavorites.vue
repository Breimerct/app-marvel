<template>
  <section>
    <div class="row flex flex-center" v-if="favoriteCharacters.length > 0">
      <div
        class="col-sm-4 col-md-4 col-lg-4 col-xs-6 q-pa-sm q-mt-lg"
        v-for="item in favoriteCharacters"
        :key="item.id"
      >
        <marvel-card
          :item="item"
          component="characters"
          @addToFavorite="addToFavorite"
        />
      </div>
      <div class="q-pa-lg flex flex-center col-12">
        <q-pagination
          v-if="favoriteCharacters.length !== 0"
          size="20px"
          v-model="current"
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
    <no-results v-else/>
  </section>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import MarvelCard from "components/MarvelCard";
import NoResults from "components/NoResults";

export default {
  name: "CharactersFavorites",

  components: {
    NoResults,
    MarvelCard
  },

  data: () => ({
    current: 1,
    perPage: 20,
    favoriteCharacters: []
  }),

  computed: {
    ...mapGetters('FavoriteModule', ['getCharactersFavorites']),

    maxPagination () {
      return Math.ceil(this.getCharactersFavorites.length / this.perPage)
    },
  },

  methods: {
    ...mapActions('FavoriteModule', ['addToCharacterFavorites', 'fetchFavoritesCharacters']),

    addToFavorite (item) {
      this.addToCharacterFavorites({
        character: item,
        component: 'characterFavorites'
      })
    },

    fetchNextCharacters () {
      let start = this.perPage * (this.current - 1)
      let end = this.current * this.perPage
      this.favoriteCharacters = this.getCharactersFavorites.slice(start, end)
    }
  },

  mounted () {
    this.fetchFavoritesCharacters()
      .then(() => {
        this.favoriteCharacters = this.getCharactersFavorites
        this.fetchNextCharacters()
      })
  }
}
</script>

<style scoped lang="scss">

</style>
