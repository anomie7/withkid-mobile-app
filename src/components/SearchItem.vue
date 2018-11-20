<template>
  <div>
    <div @click="storeLog">
      <q-card-media :height="150">
          <img :src="imgUrl">
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
            <div v-for="(p, i) of item.price" :key="i" class="price">
              {{p.price}}원
            </div>
          </q-collapsible>
        </q-list>
  </div>
</template>

<script>
import axios from 'axios'
import { SessionStorage, LocalStorage } from 'quasar'
import  validateRefreshToken from "./auth.js";

export default {
  name: 'SearchItem',
  props: ["item"],
  methods: {
    storeLog(e){
      let access = SessionStorage.get.item('accessToken');
      let $this = this;
       axios({
        method: 'post',
        url: '/eventLog',
        headers: {
          'Authorization': access
        },
        data: {
           ...$this.item
        },
        baseURL: $this.hostDomain
      }).then(function(res){
        console.log(res.data)
      })
      .catch(function(err){
        console.log(err.response.data)
        if(err.response.status == 401){
          let refresh = LocalStorage.get.item('refreshToken')
          console.log('401 error')
          validateRefreshToken.apply($this, refresh);
        }
      })
    }
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
       hostDomain: "http://www.localhost:8081"
    }
  }
}
</script>

<style>
</style>
