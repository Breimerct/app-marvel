<template>
  <q-page>
    <div class="row main-container">
      <div class="col-12">
        <h4 class="q-ma-none text-uppercase">
          marvel characters list
        </h4>
      </div>
      <div class="col-lg-9 col-sm-8 col-xs-7 q-pa-md">
        <q-input
          ref="inputSearch"
          v-model="search"
          label="Enter the name of the character"
          @keyup.enter="filterCharactersByName"
        >
          <template v-slot:after>
            <q-btn
              size="md"
              icon="search"
              color="primary"
              round
              @click="filterCharactersByName"
            />
          </template>
        </q-input>
      </div>
      <div class="col-lg-3 col-sm-4 col-xs-5 flex flex-center content-center">
        <q-btn
          flat
          icon="filter_list"
          label="Sort by"
        >
          <q-menu
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section>
                  <q-radio
                    keep-color
                    v-model="sort"
                    val="name"
                    label="Name"
                    color="red"
                    @input="sortBy"
                  />
                </q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>
                  <q-radio
                    keep-color
                    v-model="sort"
                    val="-modified"
                    label="Modified"
                    color="red"
                    @input="sortBy"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <section class="col-12 row" v-if="getCharacters.results">
        <div
          class="col-sm-4 col-md-3 col-lg-3 col-xs-6 q-pa-sm q-mt-lg"
          v-for="item in getCharacters.results"
          :key="item.id"
        >
          <marvel-card
            :item="item"
            component="characters"
            @addToFavorite="addOrRemoveToFavorite"
          />
        </div>
        <no-results v-if="getCharacters.results.length === 0"/>
      </section>
      <div class="q-pa-lg flex flex-center col-12" v-if="getCharacters.results">
        <q-pagination
          v-if="getCharacters.results.length !== 0"
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
  </q-page>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import MarvelCard from "components/MarvelCard";
import NoResults from "components/NoResults";
export default {
  name: "Home",
  components: {NoResults, MarvelCard},
  data: () => ({
    search: '',
    current: 1,
    perPage: 20,
    sort: 'name',
  }),

  computed: {
    ...mapGetters('CharactersModule', ['getCharacters']),
    ...mapGetters('UserModule', ['getUser']),
    maxPagination () {
      return Math.ceil(this.getCharacters.total / this.perPage)
    },
  },

  methods: {
    ...mapActions('CharactersModule', ['fetchCharacters']),
    ...mapActions('FavoriteModule', ['addOrRemoveToCharacterFavorites', 'fetchFavoritesCharacters']),
    ...mapMutations('FavoriteModule', ['setFavoriteCharacter']),

    fetchNextCharacters () {
      let offset = this.perPage * (this.current - 1)
      let params = {}
      if (this.search) {
        params.name = this.search
        params.offset = offset
        params.orderBy = this.sort
      } else {
        params.offset = offset
        params.orderBy = this.sort
      }
      this.fetchCharacters({
        ...params
      })
    },

    filterCharactersByName () {
      if (this.search.length > 0) {
        this.fetchCharacters({
          name: this.search,
          offset: 0
        })
      }
      this.$refs.inputSearch.focus()
    },

    sortBy (sort) {
      this.fetchCharacters({
        offset: 0,
        orderBy: sort
      })
    },

    addOrRemoveToFavorite (character) {
      this.addOrRemoveToCharacterFavorites({
        userId: this.getUser.id,
        character: character
      })
    }
  },

  filters: {
    getYear (val) {
      let date = new Date(val)
      return date.getFullYear()
    },

    minimizedWords (val) {
      val = val.toString()
      let points = val.length > 20 ? '...' : ''
      return val.substr(0, 20) + points
    }
  },

  watch: {
    'search' (oldVal, newVal) {
      if (oldVal.length === 0) {
        this.fetchCharacters({offset: 0})
      }
    }
  },

  mounted () {
    this.fetchFavoritesCharacters ()
      .then(() => {
        this.fetchCharacters({
          offset: 0,
          orderBy: this.sort
        })
        this.$refs.inputSearch.focus()
      })
  }
}
</script>

<style scoped lang="scss">
.q-card {
  img {
    width: 100%;
    height: 100%;
  }
}
.q-page {
  min-height: 94vh !important;
}
</style>
