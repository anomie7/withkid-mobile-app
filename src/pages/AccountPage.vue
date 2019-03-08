<template>
  <q-page padding>
    <!-- content -->
    사용자 페이지
    <div @click="logout">로그아웃</div>
  </q-page>
</template>

<script>
import { LocalStorage, SessionStorage } from "quasar";

export default {
  name: "AccountPage",
  methods: {
    logout() {
      SessionStorage.remove("accessToken");
      LocalStorage.remove("refreshToken");
      document.location.reload();
      alert("로그아웃 되었습니다.");
    }
  }
};
</script>

<style>
</style>
