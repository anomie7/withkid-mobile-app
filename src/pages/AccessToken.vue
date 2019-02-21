<template>
  <div></div>
</template>
<script>
import axios from "axios";
import { AUTH_BASE_URL } from "./../js/global-var";
import { LocalStorage, SessionStorage } from "quasar";

export default {
  data() {
    return {};
  },
  props: ["query"],
  methods: {
    async getTokens(code) {
      try {
        let res = await axios.get("/facebookToken", {
          params: { code },
          baseURL: AUTH_BASE_URL
        });
        let token = res.data;
        this.storeToken(token.accessToken, token.refreshToken);
        this.$router.replace("/");
      } catch (error) {
        console.error(error);
      }
    },
    storeToken(access, refresh) {
      console.log(6);
      LocalStorage.set("refreshToken", refresh);
      SessionStorage.set("accessToken", access);
    }
  },
  created() {
    this.getTokens(this.query);
  }
};
</script>
<style>
</style>