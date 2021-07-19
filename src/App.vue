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

button {
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

.linkStyle {
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
</style>
