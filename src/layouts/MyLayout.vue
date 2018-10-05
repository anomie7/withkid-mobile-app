<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header reveal>
      <q-toolbar color="amber" text-color="dark">
        <q-toolbar-title>
          위드키즈
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container class="scroll">
      <router-view />
    </q-page-container>

    <q-layout-footer >
      <q-toolbar color="amber" >
      <q-tabs class="bottoms-qtaps" color="amber" position="bottom" text-color="dark" align="justify"> 
        <q-route-tab default slot="title" to="/"  icon="home" />
        <q-route-tab slot="title" to="/search"  icon="search" />
        <q-route-tab slot="title" to="/user" icon="account_box" />
      </q-tabs>
      </q-toolbar>
    </q-layout-footer>
    <q-btn
          v-back-to-top.animate="{offset: 100, duration: 0}"
          round
          color="primary"
          class="fixed-bottom-right animate-pop"
          style="margin: 0 15px 65px 0;z-index:3"
        >
          <q-icon name="keyboard_arrow_up" />
    </q-btn>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {};
  },
  methods: {
    openURL
  }
};
</script>

<style>
.bottoms-qtaps{
    width: 100%;
}
</style>
