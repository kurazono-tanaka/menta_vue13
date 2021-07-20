import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
    firebase.auth().createUserWithEmailAndPassword(state.mailaddress, state.password).then(user => {
      this.$store.commit('setUserName', state.username)
      this.$router.push('/dashboard')
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
  }
}

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
