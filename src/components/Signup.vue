<template>
  <div class="signup">
    <main>
      <h1>新規登録画面</h1>
      <ul>
        <li>
          <label for="username">ユーザー名</label>
          <input type="text" id="username" placeholder="userName" class="inputStyle" v-model="username"/>
        </li>
        <li>
          <label for="mailaddress">メールアドレス</label>
          <input type="email" id="mailaddress" placeholder="E-mail" v-model="mailaddress"/>
        </li>
        <li>
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="Password" v-model="password"/>
        </li>
      </ul>
      <button @click="signUp">
        <router-link to="/dashboard" class="buttonStyle">新規登録</router-link>
      </button>
      <p><router-link to="/signin" class="linkStyle">ログインはこちらから</router-link></p>
    </main>
    <footer>
      <p>Copyright ©2019 ○○Inc. All rights reserved</p>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signup',
  data () {
    return {
      username: '',
      mailaddress: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.mailaddress, this.password)
        .then(user => {
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>
