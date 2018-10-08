<template>
  <q-layout view="lHh Lpr lFf" @scroll="scrolled">
    <q-layout-header reveal>
      <q-toolbar color="blue" text-color="dark">
        <q-toolbar-title>
          여긴 검색창  ㅇㅇ
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container class="scroll">
      <search-component :items="items"></search-component>
    </q-page-container>

    <q-layout-footer >
      <q-toolbar color="amber" >
      <q-tabs class="bottoms-qtaps" color="amber" position="bottom" text-color="dark" align="justify"> 
        <q-route-tab slot="title" to="/"  icon="home" />
        <q-route-tab default slot="title" to="/search"  icon="search" />
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
import { debounce } from 'quasar'
import SearchComponent from "../pages/search";

export default {
  name: "SearchLayout",
  data() {
    return {
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    };
  },
  methods: {
    openURL,
    scrolled(scroll){
       if(window.innerHeight + scroll.position >= document.body.offsetHeight){
         this.items = this.items.concat( [{}, {}, {} ]);
        console.log(this)
      }
    }
  },
  components: {SearchComponent}
};
</script>

<style>
.bottoms-qtaps{
    width: 100%;
}
</style>
