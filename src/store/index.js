import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user-module'
import CharactersModule from './characters-module'
import ComicsModule from './comics-module'
import FavoriteModule from './favorites-module'
import { Dark } from 'quasar'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

// noinspection JSCheckFunctionSignatures
export default new Vuex.Store({
    modules: {
      UserModule,
      CharactersModule,
      ComicsModule,
      FavoriteModule
    },
    actions: {
      darkToggle () {
        Dark.toggle()
        localStorage.setItem('dark', JSON.stringify({value: Dark.isActive}))
      },
      darkMode () {
        if (localStorage.getItem('dark')) {
          let mode = JSON.parse(localStorage.getItem('dark'))
          Dark.set(mode.value)
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
})
