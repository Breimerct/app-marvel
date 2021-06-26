import { auth, db } from "boot/firebase";
import {Loading, QSpinnerOrbit, Notify} from 'quasar'
Loading.setDefaults({
  spinner: QSpinnerOrbit
})
Notify.setDefaults({
  position: 'top-right',
  progress: true
})

export const login = ({ commit, dispatch }, payload) => {
  Loading.show()
  auth.signInWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      localStorage.setItem('user', JSON.stringify({id: btoa(user.user.uid)}))
    })
    .catch(err => {
      console.log(err)
        Notify.create({
          message: err.message,
          type: 'negative'
        })
    })
    .finally(() => {
        Loading.hide()
    })
}

export const logOut = async ({ commit }) => {
  await auth.signOut().then(res => {
    commit('setUser', {})
    localStorage.removeItem('user')
  })
    .catch(err => {
      Notify.create({
        message: err.message,
        type: 'negative'
      })
    })
}

export const registerUser = async ({ commit }, payload) => {
  Loading.show()
  await auth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(async (userCredential) => {
      localStorage.setItem('user', JSON.stringify({id: btoa(userCredential.user.uid)}))
      let userObj = {
        id: userCredential.user.uid,
        name: payload.name,
        firstLastname: payload.firstLastname,
        fullName: `${payload.name} ${payload.firstLastname}`,
        email: payload.email,
        isVerify: userCredential.user.emailVerified
      }
      await db
        .ref(`users/${userCredential.user.uid}`)
        .set(userObj)
        .then(() => {
          commit('setUser', userObj)
        })
    })
    .catch(err => {
      console.log(err)
      Notify.create({
        message: err.message,
        type: 'negative'
      })
    })
    .finally(() => {
      Loading.hide()
    })
}

export const resetPassword = ({}, payload) => {
  Loading.show()
  auth.sendPasswordResetEmail(
    payload.email,
    {
      url: 'https://marvel-app-comics.web.app/'
    }
  )
    .then(() => {
      Notify.create({
        message: 'check your email please',
        type: 'positive'
      })
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
}

export const fetchUserDB = async ({commit}) => {
  await auth.onAuthStateChanged(async (user) => {
    if (user) {
      await db.ref(`users/${user.uid}`)
        .once('value', snapshot => {
          commit('setUser', snapshot.val())
        })
        .catch(err => {
          console.log(err)
          Notify.create({
            message: err.message,
            type: 'negative'
          })
        })
    }
  })
}
