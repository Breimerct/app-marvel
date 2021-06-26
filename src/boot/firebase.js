import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseApp = firebase.default.initializeApp(process.env.firebaseConfig)
const auth = firebaseApp.auth()
const db = firebaseApp.database()

export {
  auth,
  db
}

