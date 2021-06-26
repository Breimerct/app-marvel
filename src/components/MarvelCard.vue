<template>
  <q-card>
    <q-img
      :ratio="1"
      contain
      transition="scale"
      :src="item.thumbnail.path + '.' + item.thumbnail.extension"
      alt="comic-img"
    />
    <q-card-section>
      <q-btn
        color="white"
        :icon="!item.isFavorite ? 'eva-heart-outline' : 'eva-heart'"
        class="absolute text-black"
        :class="{'text-red': item.isFavorite}"
        size="md"
        round
        style="top: 0; right: 12px; transform: translateY(-50%);"
        @click="addToFavorite"
      />

      <div class="row no-wrap items-center">
        <div class="col-12 full-width ellipsis">
          <q-btn
            :label="minimizedWords(item.title || item.name)"
            flat
            color="red"
            class="full-width q-mt-md text-caption text-bold"
            :class="[$q.dark.isActive ? 'text-white' : 'text-black']"
            :to="{
                    name: getRoute,
                    params: {
                      id: item.id
                    }
                  }"
          />
          <span
            class="text-caption full-width block"
            v-if="this.component === 'characters' || this.component === 'comics' || this.component === 'comicsDetail'"
          >
            modified: {{ item.modified | getYear }}
          </span>
        </div>
      </div>
      <q-scroll-area
        :thumb-style="thumbStyle"
        :content-style="contentStyle"
        :content-active-style="contentActiveStyle"
        style="height: 100px;"
        class="q-mb-md"
        v-if="this.component === 'charactersDetail' || this.component === 'comicDetail'"
      >
        <div
          class="q-pa-xs"
          v-html="item.description || 'Not Description'"
        >
        </div>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "marvelCard",

  props: {
    item: {
      type: Object
    },
    component: {
      type: String
    }
  },

  data: () => ({
    thumbStyle: {
      right: '2px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75
    }
  }),

  computed: {
    contentStyle () {
      return {
        backgroundColor: 'rgba(0,0,0,0.02)',
        color: this.$q.dark.isActive ? '#ffff' : '#555'
      }
    },
    contentActiveStyle () {
      return {
        backgroundColor: this.$q.dark.isActive ? 'rgba(225,225,225, 0.1)' : 'rgba(0,0,0, 0.1)',
        color: this.$q.dark.isActive ? '#ffff' : '#555'
      }
    },
    getRoute () {
      if (this.component === 'characters' || this.component === 'comicsDetail') {
        return 'characterDetail'
      } else if (this.component === 'comics' || this.component === 'charactersDetail') {
        return 'comicsDetail'
      } else {
        return ''
      }
    }
  },

  methods: {
    minimizedWords (val) {
      val = val.toString()
      let points = val.length > 7 ? '...' : ''
      val = val.substr(0, 7) + points
      return val
    },

    addToFavorite () {
      this.$emit('addToFavorite', this.item)
    }
  },

  filters: {
    minimizedWords (val) {
      val = val.toString()
      let points = val.length > 25 ? '...' : ''
      return val.substr(0, 25) + points
    },

    getYear (val) {
      let date = new Date(val)
      return date.getFullYear()
    },
  }
}
</script>

<style scoped lang="scss">

</style>
