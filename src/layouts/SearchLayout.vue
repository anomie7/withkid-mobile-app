<template>
  <q-layout view="lHh Lpr lFf" @scroll="scrolled">
    <q-layout-header reveal>
      <q-toolbar color="blue" text-color="dark">
        <q-toolbar-title>
          검색창
          <q-datetime clearable v-model="startDate" type="date" />
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container class="scroll">
      <search-component :events="events"></search-component>
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
import axios from "axios";
import SearchComponent from "../pages/search";

axios.defaults.baseURL = 'http://localhost:8081/'
export default {
  name: "SearchLayout",
  data() {
    return {
      startDate: null,
      events: [],
      currentPageNum: 0,
      hasNextPage: false
    };
  },
  methods: {
    openURL,
    scrolled(scroll){
      let a = window.innerHeight + scroll.position + 1;
      let b = document.body.offsetHeight;
      if(a >= b){
        if(this.hasNextPage){
          this.currentPageNum++;
          this.search();
        }
        console.log(`${a}  ${b}`);
      }
    },
    search(){
      console.log('send request to server')
      let $this = this;
      axios.get('/event', {
        params: {
          city: null,
          kindOf: null,
          startDateTime: null,
          endDateTime: null,
          page: $this.currentPageNum,
          size: 10
        },
      })
      .then(function (res){
        let $event = res.data;
        console.log($event);
        $this.hasNextPage = $event.hasNextPage
        $this.events = $this.events.concat($event.events);
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },
  created() {
      this.search();
  },
  components: {SearchComponent}
};
</script>

<style>
.bottoms-qtaps{
    width: 100%;
}
</style>
