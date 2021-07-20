<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

ul {
  list-style: none;
  width: 280px;
  margin: 0 auto;
  padding:0;
  text-align: right;
}

label {
  display:inline-block;
  width: 120px;
  text-align: center;
}

.btn-style1 {
  display:block;
  margin: 50px auto 0;
  width: 100px;
  height: 40px;
  border: #1E90FF solid 1px;
  border-radius: 4px;
  background-color: white;
  color: #1E90FF;
  cursor: pointer
}

.btn-style2 {
  display:block;
  margin: 0 0 0 20px;
  width: 100px;
  height: 30px;
  border-style: none;
  border-radius: 4px;
  background-color:#005FFF;
  color: white;
  cursor: pointer
}

.link-style {
  color: #1E90FF;
  text-decoration: none;
}

p {
  margin: 0;
}

footer {
  margin-top: 70px;
  font-size: 10px;
}

header {
  display:flex;
  justify-content: space-around;
  height: 35px;
}

.header-username {
  line-height: 35px;
}

.header-content {
  display:flex;
  align-items:center;
}

table {
  width: 200px;
}
</style>
