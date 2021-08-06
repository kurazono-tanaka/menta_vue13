import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import router from '@/router'
import {db} from '../main.js'

Vue.use(Vuex)

const state = {
  username: '',
  mailaddress: '',
  password: '',
  userList: [],
  wallet: 0,
  showSendModal: true
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
  setUserList (state, userList) {
    state.userList = userList
  },
  setWallet (state, wallet) {
    state.wallet = wallet
  },
  setShowSendModal (state, showSendModal) {
    state.showSendModal = showSendModal
  }
}

const getters = {
  getUserName: (state) => {
    return state.username
  },
  getUserList: (state) => {
    return state.userList
  },
  getWallet: (state) => {
    return state.wallet
  },
  getShowSendModal: (state) => {
    return state.showSendModal
  }
}

const actions = {
  signUp ({commit}, {username, mailaddress, password}) {
    firebase.auth().createUserWithEmailAndPassword(mailaddress, password).then((response) => {
      const user = response.user
      db.collection('users').add({
        name: username,
        email: user.email,
        wallet: 2000
      }).then((doc) => {
        console.log(`DB追加に成功しました`)
        firebase.auth().currentUser.updateProfile({
          displayName: username
        }).then(() => {
          console.log(`ユーザ名登録に成功しました`)
          console.log(username)
          commit('setUserName', username)
          commit('setMailAddress', mailaddress)
          commit('setPassword', password)
          router.push('/dashboard')
        }).catch(error => {
          console.log(`currentUser.updateProfileでエラー発生：${error}`)
        })
      }).catch(error => {
        console.log(`collectionでエラー発生：${error}`)
      })
    }).catch(error => {
      console.log(`createUserWithEmailAndPasswordでエラー発生：${error}`)
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
  },
  async updateWallet ({commit}, {destinationId, destinationWallet, currentId, currentWallet}) {
    // DBの金額更新
    const destinationDoc = db.collection('users').doc(destinationId)
    const currentWalletDoc = db.collection('users').doc(currentId)
    return db.runTransaction(async (transaction) => {
      // 送金される側の更新
      transaction.update(destinationDoc, { wallet: destinationWallet })
      console.log('送信先の残高更新に成功しました')
      // 送金する側の更新
      transaction.update(currentWalletDoc, { wallet: currentWallet })
      console.log('ログインユーザの残高更新に成功しました')
    }).then(() => {
      console.log('Transaction successfully committed!')
      // DBの金額更新後、userListを更新
      db.collection('users').get().then((query) => {
        console.log('ユーザリストの参照に成功しました')
        const buff = []
        query.forEach((doc) => {
          const data = doc.data()
          buff.push([doc.id, data.name, data.email, data.wallet])
        })
        commit('setUserList', buff)
        const createUserArray = buff.filter(doc => doc[1] === state.username)
        const createUser = createUserArray[0]
        commit('setWallet', createUser[3])
        // モーダルウィンドウ非表示
        commit('setShowSendModal', false)
      }).catch(error => {
        console.log(`ユーザリストの参照に失敗しました：${error}`)
      })
    }).catch((error) => {
      console.log(`Transaction failed: ${error}`)
    })
  },
  signCheck ({commit}) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('login')
      } else {
        console.log('logout')
      }
    })
  },
  async getUserLists ({commit}) {
    db.collection('users').get().then((query) => {
      console.log('ユーザリストの参照に成功しました')
      const buff = []
      query.forEach((doc) => {
        const data = doc.data()
        buff.push([doc.id, data.name, data.email, data.wallet])
      })
      commit('setUserList', buff)
      console.log('buff')
      console.log(buff)
      console.log('state.userList')
      console.log(state.userList)
      const createUserArray = buff.filter(doc => doc[1] === state.username)
      const createUser = createUserArray[0]
      commit('setWallet', createUser[3])
      console.log('state.wallet')
      console.log(state.wallet)
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
