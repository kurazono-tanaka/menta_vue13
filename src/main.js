// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDqOUQGoToaRvyq8DyqXJ_5Rc7tsdJESoc',
  authDomain: 'menta-vue13.firebaseapp.com',
  projectId: 'menta-vue13',
  storageBucket: 'menta-vue13.appspot.com',
  messagingSenderId: '224376323134',
  appId: '1:224376323134:web:5a597160883135887c656f',
  measurementId: 'G-EVH5434R44'
}

firebase.initializeApp(firebaseConfig)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
