import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'
// import store from '@/store'

Vue.use(Vuex)

const state = {
  username: '',
  mailaddress: '',
  password: ''
}

const mutations = {
  setUserName (state, username) {
    state.username = username
  },
  setMailAddress (state, mailaddress) {
    state.mailaddress = mailaddress
  },
  setPassword (state, password) {
    state.password = password
  }
}

const getters = {
  getUserName: (state) => {
    return state.username
  }
}

const actions = {
  signUp ({commit}) {
    firebase.auth().createUserWithEmailAndPassword(state.mailaddress, state.password).then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: state.username
      }).then(() => {
        router.push('/dashboard')
      })
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  },
  signIn ({commit}) {
    firebase.auth().signInWithEmailAndPassword(state.mailaddress, state.password).then(user => {
      const userObject = user.user
      commit('setUserName', userObject.displayName)
      router.push('/dashboard')
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
