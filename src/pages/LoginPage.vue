<template>
  <div>
    <h5>로그인 페이지</h5>
    <input type="email" v-model="user.email" />
    <input type="password" v-model="user.password">
    <button @click="login">login</button>
    <div style="padding-top: 20px">demo User</div>
    <div>Id: test</div>
    <div>password: 1234</div>
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
        if(this.userValidate(this.user)){
          return;
        }

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
            let responseData = err.response.data;
            if(responseData.name == "UserNotFoundException"){
              alert(responseData.msg)
              return;
            }
            console.error(err);
          })
      },
      storeToken(access, refresh) {
        LocalStorage.set("refreshToken", refresh);
        SessionStorage.set("accessToken", access);
      },
      userValidate(user){
         if(this.isEmpty(user.email) || this.isEmpty(user.password)){
          alert('입력되지 않은 값이 있습니다.');
          return true;
        }
        return false;
      },
      isEmpty(value){
        if(value == null || value == ''){
          return true;
        }
        return false;
      }
    }
  }
</script>

<style>
  
</style>
