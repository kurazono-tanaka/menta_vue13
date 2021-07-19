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
      <button @click="signUp">新規登録</button>
      <p><router-link to="/signin" class="linkStyle">ログインはこちらから</router-link></p>
    </main>
    <footer>
      <p>Copyright ©2019 ○○Inc. All rights reserved</p>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
          this.$router.push('/dashboard')
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }
}
</script>
