/* eslint-disable */
<template>
  <div class="dashboard">
    <header>
      <p class="header-username">{{$store.getters.getUserName}}さんようこそ！！</p>
      <div class="header-content">
        <p>残高：{{balance}}</p>
        <button class="btn-style2">ログアウト</button>
      </div>
    </header>
    <main>
      <h1>ユーザ一覧</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in userList" :key="index">
          </tr>
        </tbody>
      </table>
    </main>
    <footer>
      <p>Copyright ©2019 ○○Inc. All rights reserved</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data () {
    return {
      username: '',
      money: 0,
      userList: []
    }
  },
  methods: {
  },
  computed: {
    balance () {
      return 1000 - this.money
    }
  }
}
</script>
