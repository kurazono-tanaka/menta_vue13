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
      this.$store.dispatch('updateWallet', {destinationId: this.destinationId, destinationWallet: destinationWallet, currentId: this.userId, currentWallet: currentWallet})
      this.userList = this.$store.getters.getUserList
      this.wallet = this.$store.getters.getWallet
      this.showSendModal = this.$store.getters.getShowSendModal
    }
  },
  mounted () {
    this.username = this.$store.getters.getUserName
    this.$store.dispatch('signCheck')
    this.$store.dispatch('getUserLists')
    this.userList = this.$store.getters.getUserList
    this.wallet = this.$store.getters.getWallet
    console.log('this.userList')
    console.log(this.userList)
    console.log('this.wallet')
    console.log(this.wallet)
  }
}
</script>
