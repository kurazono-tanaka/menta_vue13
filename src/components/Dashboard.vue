/* eslint-disable */
<template>
  <div class="dashboard">
    <header>
      <p class="header-username">{{username}}さんようこそ！！</p>
      <div class="header-content">
        <p>残高：{{wallet}}</p>
        <button class="btn-style2" @click="signOut">ログアウト</button>
      </div>
    </header>
    <main>
      <h1>ユーザ一覧</h1>
      <table>
        <thead>
          <tr>
            <th class="table-name">ユーザ名</th>
            <th class="table-wallet"></th>
            <th class="table-send"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user[0]">
            <td class="table-name">{{user[1]}}</td>
            <td>
              <button @click="openModal(user[0])" class="table-wallet table-button">walletを見る</button>
            </td>
            <td>
              <button class="table-send table-button" @click="openSendModal(user[0])">送る</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <p>Copyright ©2019 ○○Inc. All rights reserved</p>
    </footer>
    <transition>
      <div>
        <div id="overlay" @click="closeModal" v-show="showModal">
          <section id="modal" @click="stopEvent">
            <p class="modal-sentences">{{modalName}}さんの残高</p>
            <p>{{modalWallet}}</p>
            <div class="modal-footer">
              <button class="btn-style-close" @click="closeModal">close</button>
            </div>
          </section>
        </div>
        <div id="overlay-sendmodal" @click="closeSendModal" v-show="showSendModal">
          <section id="sendmodal" @click="stopEvent">
            <p class="modal-sentences">あなたの残高：{{wallet}}</p>
            <p>送る金額</p>
            <input type="text" class="modal-input" v-model.number="sendingMoney">
            <div class="modal-footer">
              <button class="btn-style-send" @click="updateWallet">送信</button>
            </div>
          </section>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'dashboard',
  data () {
    return {
      username: '',
      wallet: 0,
      userId: '',
      modalName: '',
      modalWallet: 0,
      userList: [],
      showModal: false,
      showSendModal: false,
      sendingMoney: 0,
      destinationId: ''
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('signOut')
    },
    openModal (id) {
      // 該当ユーザの名前と残高表示
      const createUserArray = this.userList.filter(doc => doc[0] === id)
      const createUser = createUserArray[0]
      this.modalName = createUser[1]
      this.modalWallet = createUser[3]
      // モーダルウィンドウ表示
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    stopEvent () {
      event.stopPropagation()
    },
    openSendModal (id) {
      // モーダルウィンドウ表示
      this.showSendModal = true
      this.destinationId = id
    },
    closeSendModal () {
      this.showSendModal = false
    },
    updateWallet () {
      // 送信先ユーザの残高取得
      const createUserArray = this.userList.filter(doc => doc[0] === this.destinationId)
      const createUser = createUserArray[0]
      const destinationWallet = createUser[3] + this.sendingMoney
      const currentWallet = this.wallet - this.sendingMoney
      // DBの金額更新
      const destinationDoc = firebase.firestore().collection('users').doc(this.destinationId)
      const currentWalletDoc = firebase.firestore().collection('users').doc(this.userId)
      return firebase.firestore().runTransaction((transaction) => {
        // 送金される側の更新
        return transaction.update(destinationDoc, { wallet: destinationWallet }).then(() => {
          console.log('送信先の残高更新に成功しました')
          // 送金する側の更新
          return transaction.update(currentWalletDoc, { wallet: currentWallet }).then(() => {
            console.log('ログインユーザの残高更新に成功しました')
          })
        })
      }).then(() => {
        console.log('Transaction successfully committed!')
        // DBの金額更新後、userListを更新
        firebase.firestore().collection('users').get().then((query) => {
          console.log('ユーザリストの参照に成功しました')
          const buff = []
          query.forEach((doc) => {
            const data = doc.data()
            buff.push([doc.id, data.name, data.email, data.wallet])
          })
          this.userList = buff
          const createUserArray = buff.filter(doc => doc[1] === this.username)
          const createUser = createUserArray[0]
          this.wallet = createUser[3]
          // モーダルウィンドウ非表示
          this.showSendModal = false
        }).catch(error => {
          console.log(`ユーザリストの参照に失敗しました：${error}`)
        })
      }).catch((error) => {
        console.log(`Transaction failed: ${error}`)
      })
    }
  },
  mounted () {
    this.username = this.$store.getters.getUserName
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('login')
      } else {
        console.log('logout')
      }
    })
    firebase.firestore().collection('users').get().then((query) => {
      const buff = []
      query.forEach((doc) => {
        const data = doc.data()
        buff.push([doc.id, data.name, data.email, data.wallet])
      })
      this.userList = buff
      const createUserArray = buff.filter(doc => doc[1] === this.username)
      const createUser = createUserArray[0]
      this.userId = createUser[0]
      this.wallet = createUser[3]
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  }
}
</script>
