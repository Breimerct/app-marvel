<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated :class="[isDark ? 'bg-dark text-white' : 'bg-grey-3 text-dark']">
      <q-toolbar>
        <q-toolbar-title>
          <router-link to="/" class="flex content-center items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/800px-Marvel_Logo.svg.png"
              alt="logo-img"
              width="100"
            />
          </router-link>
        </q-toolbar-title>
        <q-btn
          v-if="!isMobile"
          flat
          :label="isDark ? 'light theme' : 'dark theme'"
          :icon="isDark ? 'eva-sun-outline' : 'eva-moon-outline'"
          @click="darkToggle"
        />
        <q-btn
          v-else
          flat
          round
          dense
          icon="menu"
        >
          <q-menu>
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar color="red" class="text-white">
                  {{ getInitialWords }}
                </q-avatar>
                <div class="text-subtitle1 q-mt-sm">
                  {{ getUser.name }} {{ getUser.firstLastname }}
                </div>
                <div class="text-caption q-mb-md">
                  {{ getUser.email }}
                </div>
                <q-btn-group>
                  <q-btn
                    color="red"
                    label="Logout"
                    push
                    @click="logOut"
                    size="xs"
                    icon="logout"
                  />
                  <q-btn
                    color="red"
                    :label="isDark ? 'light' : 'dark'"
                    push
                    @click="darkToggle"
                    size="xs"
                    :icon="isDark ? 'eva-sun-outline' : 'eva-moon-outline'"
                  />
                </q-btn-group>
              </div>
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      :width="250"
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      mini-to-overlay
      :breakpoint="0"
      bordered
      v-if="!isMobile"
    >
      <q-scroll-area style="height: calc(100% - 150px); border-right: 1px solid #ddd">
        <q-list padding>
          <q-item :class="[isDark ? 'text-white' : 'text-black']">
            <q-item-section avatar>
              <q-avatar color="red" class="text-white">
                {{ getInitialWords }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
                <span>
                  {{ getUser.fullName }}
                </span>
              <span class="text-caption">
                  {{ getUser.email }}
                </span>
            </q-item-section>
          </q-item>

          <q-item
            v-for="(route, index) in routes"
            :key="index"
            clickable
            v-ripple
            :to="{name: route.to}"
          >
            <q-item-section avatar>
              <q-icon :name="route.icon" />
            </q-item-section>

            <q-item-section>
              {{ route.name }}
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple @click="logOut" class="fixed fixed-bottom">
            <q-item-section avatar>
              <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
              logout
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        v-show="false"
        class="absolute-top"
        src="https://tentulogo.com/wp-content/uploads/2019/03/marvel-logo.jpg"
        style="height: 150px"
      >
      </q-img>
    </q-drawer>

    <q-page-container
      class="q-mx-md q-mt-md"
      :class="{ 'q-mx-lg q-mt-lg': isMobile }"
    >
      <router-view/>
    </q-page-container>

    <q-footer elevated reveal v-if="isMobile" :class="[isDark ? 'bg-dark text-white' : 'bg-grey-3 text-dark']">
      <q-tabs
        align="justify"
        active-color="red"
      >
        <q-route-tab
          v-for="(route, index) in routes"
          :key="index"
          :to="{name: route.to}"
          :icon="route.icon"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    drawer: false,
    miniState: true,
    routes: [
      {
        name: 'characters',
        to: 'characters',
        icon: 'person'
      },
      {
        name: 'comics',
        to: 'comics',
        icon: 'menu_book'
      },
      {
        name: 'favorites',
        to: 'favorites',
        icon: 'favorite'
      }
    ]
  }),

  methods: {
    ...mapActions('UserModule', ['logOut']),
    ...mapActions(['darkToggle'])
  },

  computed: {
    ...mapGetters('UserModule', ['getUser']),
    getInitialWords () {
      if (this.getUser.name || this.getUser.firstLastname) {
        const name = this.getUser.name.split('')
        const lastname = this.getUser.firstLastname.split('')
        return `${name[0]}${lastname[0]}`
      } else {
        return ''
      }
    },
    isDark () {
      return this.$q.dark.isActive
    },
    isMobile () {
      return this.$q.platform.is.mobile
    }
  }
}
</script>

<style scoped lang="scss">
.q-page {
  min-height: 100% !important;
}
.q-scrollarea {
  border: none !important;
}
</style>
