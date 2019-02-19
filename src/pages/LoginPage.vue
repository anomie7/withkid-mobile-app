<template>
  <q-layout>
    <div class="login-container">
      <h1 style="margin: 100px auto;text-align:center;color:green">Login</h1>
      <q-input color="black" type="email" autofocus float-label="email" v-model="user.email"/>
      <q-input color="black" type="password" float-label="password" v-model="user.password"/>
      <q-btn class="full-width login-btn" @click="login" color="primary" size="lg" label="login"/>
      <q-btn
        class="facebook-color full-width login-btn"
        @click="facebookLogin"
        size="lg"
        label="facebook으로 시작하기"
      />
      <div>
        <div style="padding-top: 20px">demo email User</div>
        <div>Id: test</div>
        <div>password: 1234</div>
      </div>
      <div>
        <div style="padding-top: 20px">demo facebook user</div>
        <div>email: uzmnobofjr_1550131691@tfbnw.net</div>
        <div>password: asd1212</div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import axios from "axios";
import { AUTH_BASE_URL } from "./../js/global-var";
import { LocalStorage, SessionStorage } from "quasar";

const BASE_URL = AUTH_BASE_URL;
export default {
  // name: 'PageName',
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      authUrl: "",
      temporaryCode: null
    };
  },
  methods: {
    login() {
      if (!this.userValidate(this.user)) {
        return;
      }

      let $this = this;
      axios
        .post(
          "/login",
          {
            ...$this.user
          },
          {
            baseURL: BASE_URL
          }
        )
        .then(function(res) {
          let data = res.data;
          console.log(data);
          let accessToken = data.accessToken;
          let refreshToken = data.refreshToken;
          $this.storeToken(accessToken, refreshToken);
          $this.$router.replace("/");
        })
        .catch(function(err) {
          let responseData = err.response.data;
          if (responseData.name == "UserNotFoundException") {
            alert(responseData.msg);
            return;
          }

          if ((responseData.name = "PasswordNotMatchException")) {
            alert(responseData.msg);
            return;
          }
          console.error(err);
        });
    },
    async facebookLogin() {
      let tokens = { accessToken: "", refreshToken: "" };
      try {
        let windowReference = await this.getFacebookAuthUrl(this.temporaryCode);
        while (tokens.accessToken == "" && tokens.refreshToken == "") {
          tokens = await this.getTokensByFireStore(
            this.temporaryCode,
            windowReference
          );
        }
        this.storeToken(tokens.accessToken, tokens.refreshToken);
        this.$router.replace("/");
        windowReference.close();
      } catch (error) {
        console.error(error);
      }
    },
    getFacebookAuthUrl(temporaryCode) {
      return new Promise(async (resolve, reject) => {
        try {
          let url = await axios.get("/authURL", {
            params: { temporaryCode: temporaryCode },
            baseURL: AUTH_BASE_URL
          });
          let windowReference = window.open(
            url.data,
            "_blank",
            "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes"
          );
          resolve(windowReference);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    getTokensByFireStore(temporaryCode, windowReference) {
      return new Promise((resolve, reject) => {
        try {
          axios
            .get("/authtoken", {
              params: { temporaryCode: temporaryCode },
              baseURL: AUTH_BASE_URL
            })
            .then(result => {
              setTimeout(function() {
                resolve(result.data);
              }, 1500);
            });
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });
    },
    storeToken(access, refresh) {
      console.log(6);
      LocalStorage.set("refreshToken", refresh);
      SessionStorage.set("accessToken", access);
    },
    userValidate(user) {
      if (this.isEmpty(user.email) || this.isEmpty(user.password)) {
        alert("입력되지 않은 값이 있습니다.");
        return false;
      }
      return true;
    },
    isEmpty(value) {
      if (value == null || value == "") {
        return true;
      }
      return false;
    }
  },
  created() {
    let temporaryCode = Math.random()
      .toString(36)
      .substring(2);
    SessionStorage.set("temporaryCode", temporaryCode);
    this.temporaryCode = temporaryCode;
  }
};
</script>

<style>
body {
  background-color: aliceblue;
  overflow: hidden;
}
.login-container {
  margin: 0 auto;
  width: 85%;
}

.login-container .login-btn {
  margin-top: 1.2rem;
}

.facebook-color {
  background-color: #3b5998;
  color: white;
}
</style>
