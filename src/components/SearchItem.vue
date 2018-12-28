<template>
  <div>
    <div @click="storeLog">
      <q-card-media :height="150">
          <img :src="imgUrl" :style="mediaImgHeight">
      </q-card-media>
        <q-card-title>
           {{item.name}}
        </q-card-title>
        <q-card-main>
          <div class="category-badge">
            <p>{{category}}</p>
          </div>
          <p>{{item.location}}</p>
          <p class="text-faded">{{item.startDate}} ~ {{item.endDate}}</p>
        </q-card-main>
        <q-card-separator />
    </div>
        <q-list>
          <q-collapsible icon="payment" label="Price">
            <div v-for="(p, i) of getDefaultPrice()" :key="i" class="price">
              {{p.ticketInfo}} {{p.price}}원
            </div>
          </q-collapsible>
        </q-list>
  </div>
</template>

<script>
import axios from 'axios'
import { SessionStorage, LocalStorage } from 'quasar'
import {validateRefreshToken, storeEventLog} from "./SearchItemMethods";
import {RESOURCE_BASE_URL} from './../js/global-var';
import {IMAGE_BASE_URL} from './../js/global-var';

export default {
  name: 'SearchItem',
  props: ["item"],
  methods: {
    storeLog(){
      storeEventLog(this.item, this.$router);
    },
    getDefaultPrice(){
      let defaultPrices = this.item.price.filter(p => p.defaultPrice == true);

      if(defaultPrices.length == 0){
        defaultPrices = this.item.price.filter(p => p.extraInfo == "기본할인");
      }

      return defaultPrices;
    },
  },
  computed: {
    imgUrl(){
      return this.hostDomain + this.item.imageFilePath
    },
    category(){
      switch (this.item.kindOf) {
        case "Mu":
           return "뮤지컬";
          break;
        case "Pl":
          return "연극";
        case "Cl":
          return "클래식/무용"
        case "Ex":
          return "전시/행사"
        default:
          break;
      }
    }
  },
  data () {
    return {
       hostDomain: IMAGE_BASE_URL,
       mediaImgHeight: {
         height: '20rem'
       }
    }
  }
}
</script>

<style>

</style>
