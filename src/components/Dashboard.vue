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
              <button class="table-send table-button">送る</button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <p>Copyright ©2019 ○○Inc. All rights reserved</p>
    </footer>
    <transition>
      <div id="overlay" @click="closeModal" v-show="showModal">
        <section id="modal" @click="stopEvent">
          <p class="modal-sentences">{{modalName}}さんの残高</p>
          <p>{{modalWallet}}</p>
          <div class="modal-footer">
            <button class="btn-style-close" @click="closeModal">close</button>
          </div>
        </section>
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
      modalName: '',
      modalWallet: 0,
      userList: [],
      showModal: false
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
      console.log('buffの中身')
      console.log(buff)
      this.userList = buff
      const createUserArray = buff.filter(doc => doc[1] === this.username)
      const createUser = createUserArray[0]
      this.wallet = createUser[3]
      console.log('this.usernameの中身')
      console.log(this.username)
      console.log('createUserArrayの中身')
      console.log(createUserArray)
      console.log('createUserArray[0]の中身')
      console.log(createUserArray[0])
      console.log('createUserの中身')
      console.log(createUser)
      console.log('createUser[3]の中身')
      console.log(createUser[3])
      console.log('this.walletの中身')
      console.log(this.wallet)
    }).catch(error => {
      console.log(`エラー発生：${error}`)
    })
  },
  computed: {
    // wallet () {
    //   return 1000 - this.money
    // }
  }
}
</script>
