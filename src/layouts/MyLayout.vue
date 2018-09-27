<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header >
      <q-toolbar color="amber" text-color="dark">
        <q-toolbar-title>
          위드키즈
          <div slot="subtitle">Running on Quasar v{{ $q.version }}</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    
    <q-tabs class="bottoms-qtaps" color="amber" position="bottom" text-color="dark" align="justify"> 
      <q-route-tab default slot="title" to="/"  icon="message" />
      <q-route-tab slot="title" to="#"  icon="fingerprint" />
      <q-route-tab slot="title" to="#" icon="account_box" />
    </q-tabs>
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
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
