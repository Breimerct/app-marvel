import store from '../index'
import { db } from "boot/firebase";
import {Loading, Notify, QSpinnerOrbit} from "quasar";
Loading.setDefaults({
  spinner: QSpinnerOrbit
})

export const addOrRemoveToCharacterFavorites = ({commit}, payload) => {
  const currentUser = store.getters["UserModule/getUser"]
  let favoritesDB = db.ref(`/users/${currentUser.id}/characters/${payload.character.id}`)
  if (payload.character.isFavorite) {
    favoritesDB.remove()
      .then(() => {
        commit('setFavoriteCharacter', {
          component: payload.component,
          ...payload.character
        })
      })
      .catch(err => {
        Notify.create({
          message: err.message,
          type: 'negative'
        })
      })
  } else {
    favoritesDB
      .set({
        ...payload.character,
        isFavorite: true
      })
      .then(res => {
        commit('setFavoriteCharacter', payload.character)
      })
      .catch(err => {
        console.log(err)
        Notify.create({
          message: err.message,
          type: 'negative'
        })
      })
  }
}

export const fetchFavoritesCharacters = ({ commit }, payload) => {
  Loading.show()
  return new Promise((resolve, reject) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    db.ref(`/users/${atob(user.id)}/characters/`)
      .once('value', (snapshot) => {
        let character = []
        if (snapshot.val()) {
          Object.values(snapshot.val()).forEach(ch => {
            character.push(ch)
          })
        }
        resolve(character)
        commit('setCharactersFavorites', character)
      })
      .catch(err => {
        Notify.create({
          message: err.message,
          type: 'negative'
        })
      })
      .finally(() => {
        Loading.hide()
      })
  })
}

export const addOrRemoveToComicsFavorites = ({ commit }, payload) => {
  const currentUser = store.getters["UserModule/getUser"]
  let favoritesDB = db.ref(`/users/${currentUser.id}/comics/${payload.comic.id}`)
  if (payload.comic.isFavorite) {
    removeFavorite(favoritesDB, payload, commit)
  } else {
    addFavorite(favoritesDB, payload, commit)
  }
}

export const fetchFavoritesComics = ({ commit }) => {
  Loading.show()
  return new Promise((resolve, reject) => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    db.ref(`/users/${atob(user.id)}/comics/`)
      .once('value', (snapshot) => {
        let comics = []
        if (snapshot.val()) {
          Object.values(snapshot.val()).forEach(ch => {
            comics.push(ch)
          })
        }
        resolve(comics)
        commit('setComicsFavorites', comics)
      })
      .catch(err => {
        Notify.create({
          message: err.message,
          type: 'negative'
        })
      })
      .finally(() => {
        Loading.hide()
      })
  })
}

const addFavorite = (favoritesDB, payload, commit) => {
  favoritesDB
    .set({
      ...payload.comic,
      isFavorite: true
    })
    .then(res => {
      commit('setFavoriteComic', payload.comic)
    })
    .catch(err => {
      console.log(err)
      Notify.create({
        message: err.message,
        type: 'negative'
      })
    })
}

const removeFavorite = (favoritesDB, payload, commit) => {
  favoritesDB.remove()
    .then(() => {
      commit('setFavoriteComic', {
        component: payload.component || '',
        ...payload.comic
      })
    })
    .catch(err => {
      Notify.create({
        message: err.message,
        type: 'negative'
      })
    })
}
