import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'
import store from '@/store'

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
  },
  signUp (state) {
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
  signIn (state) {
    firebase.auth().signInWithEmailAndPassword(state.mailaddress, state.password).then(user => {
      let userObject = user.user
      store.commit('setUserName', userObject.displayName)
      router.push('/dashboard')
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  }
}

const getters = {
  getUserName: (state) => {
    return state.username
  }
}

const actions = {
  signUp ({commit}) {
    commit('signUp')
  },
  signIn ({commit}) {
    commit('signIn')
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
