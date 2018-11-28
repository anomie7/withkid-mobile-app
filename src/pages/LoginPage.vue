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
  import {AUTH_BASE_URL} from './../js/global-var'
  import {
    LocalStorage,
    SessionStorage
  } from 'quasar';
  
  
  const BASE_URL = AUTH_BASE_URL;
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
          },
          {
            baseURL: BASE_URL
          })
          .then(function(res) {
            let data = res.data;
            console.log(data);
            let accessToken = data.accessToken;
            let refreshToken = data.refreshToken;
            $this.storeToken(accessToken, refreshToken);
            $this.$router.replace('/')
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
