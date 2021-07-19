<template>
  <div class="signin">
    <main>
      <h1>ログイン画面</h1>
      <ul>
        <li>
          <label for="mailaddress">メールアドレス</label>
          <input type="email" id="mailaddress" placeholder="E-mail" v-model="mailaddress"/>
        </li>
        <li>
          <label for="password">パスワード</label>
          <input type="password" id="password" placeholder="Password" v-model="password"/>
        </li>
      </ul>
      <button @click="signIn">ログイン</button>
      <p><router-link to="/signup" class="linkStyle">新規登録はこちらから</router-link></p>
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
  name: 'signin',
  data () {
    return {
      mailaddress: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mailaddress, this.password)
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
