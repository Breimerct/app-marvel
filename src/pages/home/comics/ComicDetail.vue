<template>
  <q-page class="flex flex-center" v-if="getComicDetail.thumbnail">
    <div class="comic-detail full-width" :style="getBackground">
      <div class="row full-width q-pa-md flex-center content-center filter-blur" v-if="getComicDetail">
        <div class="col-sm-6 col-xs-12 flex flex-center">
          <q-img
            v-if="getComicDetail.thumbnail"
            :ratio="1"
            contain
            transition="jump-up"
            :src="`${this.getComicDetail.thumbnail.path + '.' +this.getComicDetail.thumbnail.extension}`"
            alt="comic-detail-img"
          />
        </div>
        <div class="col-sm-6 col-xs-12 full-height q-pl-md self-start">
          <div class="row">
            <div class="col-12 text-h6">
              {{ getComicDetail.title }}
            </div>
            <div class="col-12 q-mt-md">
              <q-scroll-area
                visible
                :thumb-style="thumbStyle"
                :content-style="contentStyle"
                :content-active-style="contentActiveStyle"
                :style="'height: ' + getHeight + 'px;'"
                class="text-left text-subtitle2"
              >
                <div
                  class="q-pr-sm"
                  v-html="getComicDetail.description || 'Not Description'"
                >
                </div>
              </q-scroll-area>
            </div>
            <div class="col-12 q-mt-md">
              <p class="text-bold q-ma-none text-subtitle1">
                Modified: <span class="text-overline">{{ modifiedDate }}</span>
              </p>
              <p class="text-bold q-ma-none text-subtitle1" v-if="getComicDetail.prices">
                price: <span class="text-overline">${{ getComicDetail.prices[0].price }}</span>
              </p>
              <p class="text-bold text-subtitle1">
                Published: <span class="text-overline">{{ getComicDetail.dates[0].date | date }}</span>
              </p>
              <p class="text-bold">
                <q-chip dense size="md" icon="bookmark" class="text-black q-pa-sm" color="white">
                  <span class="text-subtitle1">
                    {{ getComicDetail.format }}
                  </span>
                </q-chip>
              </p>
            </div>
            <div class="col-12 flex flex-center q-mt-lg">
              <q-btn
                outline
                size="md"
                @click="openUrl(getComicDetail.urls[0].url)"
                label="Read more..."
                class="q-pa-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row main-container">
      <div class="col-12 q-mt-lg">
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
          <router-view />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import moment from 'moment'

export default {
  name: "ComicDetail",

  data: () => ({
    contentStyle: {
      backgroundColor: 'rgba(0,0,0,0.02)',
      color: '#ffff'
    },

    contentActiveStyle: {
      backgroundColor: 'rgba(225,225,225, 0.1)',
      color: 'white'
    },

    thumbStyle: {
      right: '2px',
      borderRadius: '5px',
      backgroundColor: '#027be3',
      width: '5px',
      opacity: 0.75
    },

    routes: [
      {
        pathName: 'comicsCharacters', title: 'Characters'
      },
      {
        pathName: 'comicsStories', title: 'Stories'
      }
    ]
  }),

  computed: {
    ...mapGetters('ComicsModule', ['getComicDetail']),

    getBackground () {
      return `background-image: url("${this.getComicDetail.thumbnail.path + '.' +this.getComicDetail.thumbnail.extension}")`
    },

    modifiedDate () {
      return moment(this.getComicDetail.modified).format('MMM Do YYYY')
    },

    getHeight () {
      if (this.getComicDetail.description) {
        return 150
      } else {
        return 30
      }
    }
  },

  methods: {
    ...mapActions('ComicsModule', ['fetchComicDetail']),

    openUrl (url) {
      window.open(url, '_blank')
    }
  },

  filters: {
    date (val) {
      if (!val) return
      return moment(val).format('MMM Do YYYY')
    }
  },

  mounted () {
    this.fetchComicDetail({
      comicId: this.$route.params.id
    })
  }
}
</script>

<style scoped lang="scss">
.comic-detail {
  background-size: cover;
  background-repeat: no-repeat;
  color: white !important;
}
.q-img {
  max-width: 500px !important;
}
.text-subtitle1 {
  font-size: 18px;
}
.text-overline {
  font-weight: normal;
  font-size: 17px;
}
</style>
