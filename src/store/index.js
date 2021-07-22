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
  signUp ({commit}, {username, mailaddress, password}) {
    firebase.auth().createUserWithEmailAndPassword(mailaddress, password).then(() => {
      firebase.auth().currentUser.updateProfile({
        displayName: username
      }).then(() => {
        commit('setUserName', username)
        commit('setMailAddress', mailaddress)
        commit('setPassword', password)
        router.push('/dashboard')
      })
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  },
  signIn ({commit}, {mailaddress, password}) {
    firebase.auth().signInWithEmailAndPassword(mailaddress, password).then(user => {
      const userObject = user.user
      console.log(userObject.displayName)
      commit('setUserName', userObject.displayName)
      commit('setMailAddress', mailaddress)
      commit('setPassword', password)
      router.push('/dashboard')
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  },
  signOut ({commit}) {
    firebase.auth().signOut().then(() => {
      console.log('ログアウト成功！')
      commit('setUserName', '')
      commit('setMailAddress', '')
      commit('setPassword', '')
    }).catch((error) => {
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
