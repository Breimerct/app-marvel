import store from '../index'

export const setCharactersFavorites = (state, payload) => {
  state.charactersFavorites = payload
}

export const setFavoriteCharacter = (state, payload) => {
  let index
  let condition = payload.component !== 'characterFavorites' || payload.component === 'comicCharacters'
  let characters = store.getters["CharactersModule/getCharacters"]

  if (condition) {
    index = characters.results.findIndex(c => c.id === payload.id)
  }

  if (payload.isFavorite) {

    if (condition) {
      characters.results[index].isFavorite = false
    }

    const indexFavorite = state.charactersFavorites.findIndex(c => c.id === payload.id)
    state.charactersFavorites.splice(indexFavorite, 1)

  } else {

    if (condition) {
      characters.results[index].isFavorite = true
    }

    state.charactersFavorites.push(payload)

  }
}

export const setComicsFavorites = (state, payload) => {
  state.comicsFavorites = payload
}

export const setFavoriteComic = (state, payload) => {
  let index
  let condition = payload.component !== 'comicsFavorites'
  let comics = store.getters["ComicsModule/getComics"]

  if (condition) {
    index = comics.results.findIndex(c => c.id === payload.id)
  }

  if (payload.isFavorite) {
    if (condition) {
      comics.results[index].isFavorite = false
    }
    const indexFavorite = state.comicsFavorites.findIndex(c => c.id === payload.id)
    state.comicsFavorites.splice(indexFavorite, 1)

  } else {
    if (condition) {
      comics.results[index].isFavorite = true
    }
    state.comicsFavorites.push(payload)
  }
}
