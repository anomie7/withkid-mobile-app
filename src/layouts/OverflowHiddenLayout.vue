<template>
  <div id="aliceblue-wrapper">
    <q-layout class="overflow-hidden-layout">
      <div class="join-login-container">
        <router-view/>
      </div>
    </q-layout>
  </div>
</template>
<script>
import { openURL } from "quasar";

export default {
  name: "OverflowHiddenLayout",
  data() {
    return {};
  },
  methods: {
    openURL
  }
};
</script>
<style>
#aliceblue-wrapper {
  background-color: aliceblue;
  position: absolute;
  width: 100%;
}

#aliceblue-wrapper .overflow-hidden-layout {
  overflow: hidden;
}
#aliceblue-wrapper .overflow-hidden-layout .join-login-container {
  margin: 0 auto;
  width: 85%;
}
</style>
