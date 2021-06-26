<template>
  <section class="flex flex-center">
    <div class="row full-width">
      <div class="col-12 q-pa-sm">
        <q-list bordered>
          <q-expansion-item
            v-for="item in getCharacterStories.results"
            :key="item.id"
            group="storiesGroup"
            icon="eva-book-open-outline"
            :label="item.title"
            :header-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
          >
            <q-card>
              <q-card-section>
                <p class="full-width">
                  modified: <span class="text-overline">{{ item.modified | date }}</span>
                </p>
                <p>
                  {{ item.description || 'Not description' }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
      <div class="q-pa-lg flex flex-center col-12" v-if="getCharacterStories.total > perPage">
        <q-pagination
          size="15px"
          v-model="currentPage"
          :max="maxPagination"
          direction-links
          boundary-links
          color="red"
          input
          :input-class="[$q.dark.isActive ? 'text-white' : 'text-black']"
          @input="fetchNextStories"
        />
      </div>
    </div>
  </section>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from "moment";

export default {
  name: "Stories",

  data: () => ({
    currentPage: 1,
    perPage: 6
  }),

  computed: {
    ...mapGetters('CharactersModule', ['getCharacterStories']),

    maxPagination () {
      return Math.ceil(this.getCharacterStories.total / this.perPage)
    }
  },

  methods: {
    ...mapActions('CharactersModule', ['fetchCharacterStories']),

    fetchNextStories () {
      let offset = this.perPage * (this.currentPage - 1)
      this.fetchCharacterStories({
        characterId: this.$route.params.id,
        offset: offset,
        limit: this.perPage
      })
    }
  },

  filters: {
    date (val) {
      return moment(val).format('MMM Do YYYY')
    }
  },

  mounted() {
    this.fetchCharacterStories({
      characterId: this.$route.params.id,
      offset: 0,
      limit: this.perPage
    })
  }
}
</script>

<style scoped lang="scss">

</style>
