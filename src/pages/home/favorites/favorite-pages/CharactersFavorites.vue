<template>
  <section>
    <div class="row flex flex-center" v-if="charactersFavorites.length > 0">
      <div
        class="col-sm-4 col-md-4 col-lg-4 col-xs-6 q-pa-sm q-mt-lg"
        v-for="item in charactersFavorites"
        :key="item.id"
      >
        <marvel-card
          :item="item"
          component="characters"
          @addToFavorite="addOrRemoveToFavorite"
        />
      </div>
      <div class="q-pa-lg flex flex-center col-12">
        <q-pagination
          v-if="charactersFavorites.length !== 0"
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
    perPage: 20
  }),

  computed: {
    ...mapGetters('FavoriteModule', ['getCharactersFavorites']),

    maxPagination () {
      return Math.ceil(this.getCharactersFavorites.length / this.perPage)
    },

    start () {
      return this.perPage * (this.current - 1)
    },

    end () {
      return this.current * this.perPage
    },

    charactersFavorites () {
      return this.getCharactersFavorites.slice(this.start, this.end)
    }
  },

  methods: {
    ...mapActions('FavoriteModule', ['addOrRemoveToCharacterFavorites', 'fetchFavoritesCharacters']),

    addOrRemoveToFavorite (item) {
      this.addOrRemoveToCharacterFavorites({
        character: item,
        component: 'characterFavorites'
      })
    }
  },

  mounted () {
    this.fetchFavoritesCharacters()
  }
}
</script>

<style scoped lang="scss">

</style>
