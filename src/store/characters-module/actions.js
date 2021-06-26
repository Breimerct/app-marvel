import store from '../index'
import { http } from "boot/axios";
import {Loading, Notify, QSpinnerOrbit} from 'quasar'
Loading.setDefaults({
  spinner: QSpinnerOrbit
})

export const fetchCharacters = ({ commit, state }, payload) => {
  Loading.show()
  commit('setCharacterDetail', {})
  commit('setCharacters', {})
  http.get('/characters', {
    params: {
      offset: payload.offset,
      nameStartsWith: payload.name,
      orderBy: payload.orderBy
    }
  })
    .then(({ data }) => {
      let results = []
      results = data.data
      let favoritesCh = store.getters["FavoriteModule/getCharactersFavorites"]
      if (favoritesCh.length > 0) {
        favoritesCh.forEach(cDB => {
          results.results = results.results.map((c, index) => {
            if (c.id === cDB.id) {
              return {
                index,
                ...c,
                isFavorite: cDB.isFavorite
              }
            } else {
              return {
                index,
                isFavorite: false,
                ...c
              }
            }
          })
        })
      } else {
        results.results = results.results.map((ch, index) => ({
          index,
          isFavorite: false,
          ...ch
        }))
      }
      commit('setCharacters', results)
    })
    .catch(err => {
      if (err.response.data) {
        Notify.create({
          message: err.response.data.message,
          type: 'negative'
        })
      }
    })
    .finally(() => {
      Loading.hide()
    })
}

export const fetchCharacterDetails = ({commit}, payload) => {
  return new Promise((resolve, reject) => {
    Loading.show()
    commit('setCharacterDetail', {})
    commit('setCharactersStories', {})
    store.commit('ComicsModule/setComicDetail', {})
    http.get(`/characters/${payload.characterId}`)
      .then(({ data }) => {
        commit('setCharacterDetail', data.data.results[0])
        resolve(data.data.results[0])
      })
      .catch(err => {
        reject(err)
        if (err.response.data) {
          Notify.create({
            message: err.response.data.message,
            type: 'negative'
          })
        }
      })
      .finally(() => {
        Loading.hide()
      })
  })
}

export const fetchCharacterComics = ({commit}, payload) => {
  Loading.show()
  store.dispatch("FavoriteModule/fetchFavoritesComics")
    .then(comic => {
      http.get(`/characters/${payload.characterId}/comics`,{
        params: {
          offset: payload.offset,
          limit: payload.limit
        }
      })
        .then(({data}) => {
          let cmApi = data.data
          let favoritesCm = comic
          if (favoritesCm.length > 0) {
            favoritesCm.forEach(cDB => {
              cmApi.results = cmApi.results.map((c, index) => {
                if (c.id === cDB.id) {
                  return {
                    index,
                    ...c,
                    isFavorite: cDB.isFavorite
                  }
                } else {
                  return {
                    index,
                    isFavorite: false,
                    ...c
                  }
                }
              })
            })
          } else {
            cmApi.results = cmApi.results.map((ch, index) => ({
              index,
              isFavorite: false,
              ...ch
            }))
          }
          store.commit('ComicsModule/setComics', cmApi)
        })
    })
    .catch(err => {
      if (err.response.data) {
        Notify.create({
          message: err.response.data.message,
          type: 'negative'
        })
      }
    })
    .finally(() => {
      Loading.hide()
    })
}

export const fetchCharacterStories = ({commit}, payload) => {
  Loading.show()
  http.get(`/characters/${payload.characterId}/stories`,{
    params: {
      offset: payload.offset,
      limit: payload.limit
    }
  })
    .then(({data}) => {
      commit('setCharactersStories', data.data)
    })
    .catch(err => {
      if (err.response.data) {
        Notify.create({
          message: err.response.data.message,
          type: 'negative'
        })
      }
    })
    .finally(() => {
      Loading.hide()
    })
}
