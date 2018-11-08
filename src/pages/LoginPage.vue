<template>
  <div>
    <h5>로그인 페이지</h5>
    <input type="email" v-model="user.email" />
    <input type="password" v-model="user.password">
    <button @click="login">login</button>
  </div>
</template>

<script>
  import axios from 'axios';

  import {
    LocalStorage,
    SessionStorage
  } from 'quasar';
  
  axios.defaults.baseURL = "http://www.localhost:8082";
  export default {
    // name: 'PageName',
    data() {
      return {
        user: {
          email: null,
          password: null
        }
      }
    },
    methods: {
      login() {
        let $this = this;
        axios.post('/login', {
            ...$this.user
          })
          .then(function(res) {
            let data = res.data;
            console.log(data);
            let accessToken = data.accessToken;
            let refreshToken = data.refreshToken;
            $this.storeToken(accessToken, refreshToken);
            $this.$router.push('/')
          })
          .catch(function(err) {
            console.error(err);
          })
      },
      storeToken(access, refresh) {
        LocalStorage.set("refreshToken", refresh);
        SessionStorage.set("accessToken", access);
      }
    }
  }
</script>

<style>
  
</style>
