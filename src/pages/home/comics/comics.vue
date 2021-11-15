<template>
  <q-page>
    <div class="row main-container">
      <div class="col-12">
        <h4 class="q-ma-none text-uppercase">
          marvel comics list
        </h4>
      </div>
      <div :class="[isMobile ? 'col-lg-9 col-sm-8 col-xs-7 q-pa-md' : 'col-12']">
        <q-input
          ref="inputSearch"
          v-model="search"
          label="Enter the title of the comic"
          @keyup.enter="filterComicsByTitles"
        >
          <template v-slot:after>
            <q-btn
              size="md"
              round
              color="primary"
              icon="search"
              @click="filterComicsByTitles"
            />
          </template>
        </q-input>
      </div>
      <div class="col-lg-3 col-sm-4 col-xs-5 flex flex-center content-center" v-if="isMobile">
        <q-btn
          flat
          icon="filter_list"
          label="formats"
        >
          <q-menu
            transition-show="scale"
            transition-hide="scale"
          >
            <q-list style="min-width: 100px">
              <q-item clickable v-for="(item, index) in formats" :key="index">
                <q-item-section>
                  <q-radio
                    keep-color
                    v-model="format"
                    :val="item.value"
                    :label="item.name"
                    color="red"
                    @input="getFormats(item.value)"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <section class="col-12 row justify-end" v-if="!isMobile">
        <div class="col-12">
          <q-tabs
            v-model="format"
            active-color="red"
          >
            <q-tab
              v-for="(tab, index) in formats"
              :key="index"
              :name="tab.name"
              :label="tab.name"
              @click="getFormats(tab.value)"
            />
          </q-tabs>
        </div>
      </section>
      <section
        class="col-12 row"
        v-if="getComics.results"
      >
        <div
          class="col-sm-4 col-md-4 col-lg-3 col-xs-6 q-pa-sm q-mt-lg"
          v-for="item in getComics.results"
          :key="item.id"
        >
          <marvel-card
            :item="item"
            component="comics"
            @addToFavorite="addOrRemoveToFavorite"
          />
        </div>
        <no-results v-if="getComics.results.length === 0"/>
      </section>
      <div
        class="q-pa-lg flex flex-center col-12"
        v-if="getComics.results"
      >
        <q-pagination
          v-if="getComics.results.length > 0"
          size="20px"
          v-model="currentPage"
          :max="maxPagination"
          direction-links
          boundary-links
          input
          :input-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
          color="red"
          @input="fetchNextComics"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import MarvelCard from '../../../components/MarvelCard.vue'
import NoResults from "components/NoResults";

export default {
  name: "comics",

  components: {
    NoResults,
    MarvelCard
  },

  data: () => ({
    search: '',
    currentPage: 1,
    perPage: 20,
    format: 'all',
    formats: [
      { name: 'all', value: null },
      { name: 'hardcover', value: 'hardcover' },
      { name: 'comic', value: 'comic' },
      { name: 'trade paperback', value: 'trade paperback' }
    ]
  }),

  computed: {
    ...mapGetters('ComicsModule', ['getComics']),
    ...mapGetters('UserModule', ['getUser']),

    maxPagination () {
      return Math.ceil(this.getComics.total / this.perPage)
    },

    isMobile () {
      return this.$q.platform.is.mobile
    }
  },

  methods: {
    ...mapActions('ComicsModule', ['fetchComics']),
    ...mapActions('FavoriteModule', ['addOrRemoveToComicsFavorites', 'fetchFavoritesComics']),

    fetchNextComics () {
      this.search = ''
      let offset = this.perPage * (this.currentPage - 1)
      let params = {}
      if (this.search) {
        params.title = this.search
        params.offset = offset
      } else {
        params.offset = offset
      }
      this.fetchComics({
        ...params
      })
    },

    addOrRemoveToFavorite (item) {
      this.addOrRemoveToComicsFavorites({
        userId: this.getUser.id,
        comic: item
      })
    },

    filterComicsByTitles () {
      if (this.search.length > 0) {
        this.fetchComics({
          offset: 0,
          title: this.search
        })
      }
      this.$refs.inputSearch.focus()
    },

    getFormats (value) {
      this.fetchComics({
        format: value,
        offset: 0
      })
    }
  },

  watch: {
    'search' (oldVal, newVal) {
      if (oldVal.length === 0) {
        this.fetchComics({offset: 0})
      }
    }
  },

  mounted () {
    this.fetchFavoritesComics ()
      .then(() => {
        this.fetchComics({offset: 0})
        this.$refs.inputSearch.focus()
      })

    if (this.isMobile) {
      this.format = null
    } else {
      this.format = 'all'
    }
  }
}
</script>

<style scoped lang="scss">
.q-page {
  min-height: 94vh !important;
}
</style>
