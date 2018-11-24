<template>
  <q-layout view="lHh Lpr lFf" @scroll="scrolled">
    <q-layout-header reveal>
      <q-toolbar color="blue" text-color="dark">
        <search-bar @searchBarClick="receiveSearchbarRes"></search-bar>
      </q-toolbar>
    </q-layout-header>
  
    <q-page-container class="scroll">
      <search-component :events="events" :hasNextPage="hasNextPage"></search-component>
    </q-page-container>
  
    <q-layout-footer>
      <q-toolbar color="amber">
        <q-tabs class="bottoms-qtaps" color="amber" position="bottom" text-color="dark" align="justify">
          <q-route-tab slot="title" to="/" icon="home" />
          <q-route-tab default slot="title" to="/search" icon="search" />
          <q-route-tab slot="title" to="/user" icon="account_box" />
        </q-tabs>
      </q-toolbar>
    </q-layout-footer>
    <q-btn v-back-to-top.animate="{offset: 100, duration: 0}" round color="primary" class="fixed-bottom-right animate-pop" style="margin: 0 15px 65px 0;z-index:3">
      <q-icon name="keyboard_arrow_up" />
    </q-btn>
  </q-layout>
</template>

<script>
  import {openURL} from "quasar";
  import { debounce} from "quasar";
  import axios from "axios";
  import SearchComponent from "../pages/search";
  import SearchBar from '../components/SearchBar.vue'
  import {RESOURCE_BASE_URL} from './../js/global-var'

  const BASE_URL = RESOURCE_BASE_URL;
  export default {
    name: "SearchLayout",
    data() {
      return {
        events: [],
        currentPageNum: 0,
        hasNextPage: false,
        searchParam: {
          region: null,
          kindOf: null,
          startDate: null,
          endDate: null,
          page: 0,
          size: 10
        }
      };
    },
    methods: {
      openURL,
      scrolled(scroll) {
        let a = window.innerHeight + scroll.position + 1;
        let b = document.body.offsetHeight;
        if (a >= b) {
          if (this.hasNextPage) {
            this.searchParam.page++;
            this.search();
          }else if(!this.hasNextPage){
            console.log('no more events obj!')
          }
          console.log(`${a}  ${b}`);
        }
      },
      search() {
        console.log("send request to server");
        let $this = this;
        axios
          .get("/event", {
            params: $this.searchParam,
             baseURL: BASE_URL
          })
          .then(function(res) {
            let $event = res.data;
            console.log($event);
            $this.hasNextPage = $event.hasNextPage;
            $this.currentPageNum = $event.currentPageNum;
            $this.events = $this.events.concat($event.events);
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      receiveSearchbarRes($data){
        console.log('handling searchBarClick event')
        console.log($data);
        this.hasNextPage = $data.hasNextPage;
        this.events = $data.events;
        this.searchParam = $data.searchParam;
      }
    },
    created() {
    },
    components: {
      SearchComponent,
      SearchBar
    }
  };
</script>

<style>
  .bottoms-qtaps {
    width: 100%;
  }
</style>
