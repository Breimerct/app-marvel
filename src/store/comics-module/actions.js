import { http } from "boot/axios";
import {Loading, Notify, QSpinnerOrbit} from 'quasar'
import store from "../index";
Loading.setDefaults({
  spinner: QSpinnerOrbit
})

export const fetchComics = ({ commit }, payload) => {
  Loading.show()
  commit('setComicDetail', {})
  commit('setComics', {})
  http.get('/comics', {
    params: {
      offset: payload.offset || 0,
      limit: 20,
      orderBy: 'title',
      titleStartsWith: payload.title,
      format: payload.format
    }
  })
    .then(({ data }) => {
      let comicsResults = []
      comicsResults = data.data
      let favoritesCm = store.getters["FavoriteModule/getComicsFavorites"]
      if (favoritesCm.length > 0) {
        favoritesCm.forEach(cm => {
          comicsResults.results = comicsResults.results.map((c, index) => {
            if (c.id === cm.id) {
              return {
                index,
                ...c,
                isFavorite: cm.isFavorite
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
        comicsResults.results = comicsResults.results.map((ch, index) => ({
          index,
          isFavorite: false,
          ...ch
        }))
      }
      commit('setComics', comicsResults)
    })
    .catch(err => {
      console.log(err)
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

export const fetchComicDetail = ({ commit }, payload) => {
  return new Promise((resolve, reject) => {
    Loading.show()
    commit('setComicDetail', {})
    store.commit("CharactersModule/setCharacters", {})
    http.get(`/comics/${payload.comicId}`)
      .then(({ data }) => {
        commit('setComicDetail', data.data.results[0])
        resolve(data.data.results[0])
      })
      .catch(err => {
        console.log(err)
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

export const fetchComicsCharacters = ({ commit }, payload) => {
  store.dispatch('FavoriteModule/fetchFavoritesCharacters')
    .then(ch => {
      Loading.show()
      store.commit("CharactersModule/setCharacters", {})
      http.get(`/comics/${payload.comicId}/characters`,{
        params: {
          offset: payload.offset,
          limit: payload.limit
        }
      })
        .then(({ data }) => {
          let chApi = data.data
          let favorites = ch
          if (favorites.length > 0) {
            favorites.forEach(cDB => {
              chApi.results = chApi.results.map((c, index) => {
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
            chApi.results = chApi.results.map((ch, index) => ({
              index,
              isFavorite: false,
              ...ch
            }))
          }
          store.commit("CharactersModule/setCharacters", chApi)
        })
        .catch(err => {
          console.log(err)
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

export const fetchComicsStories = ({ commit }, payload) => {
  Loading.show()
  commit('setComicsStories', {})
  http.get(`/comics/${payload.comicId}/stories`, {
    params: {
      offset: payload.offset,
      limit: payload.limit
    }
  })
    .then(({ data }) => {
      commit('setComicsStories', data.data)
    })
    .catch(err => {
      console.log(err)
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
