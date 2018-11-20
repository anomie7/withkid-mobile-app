<template>
  <q-page class="scroll">
    <q-carousel class="text-white" style="height:150px;margin-bottom:10px">
      <q-carousel-slide class="bg-primary">
        광고 기획전
      </q-carousel-slide>
      <q-carousel-slide class="bg-secondary">
        기획전 2
      </q-carousel-slide>
      <q-carousel-slide class="bg-tertiary">
        몰라 3
      </q-carousel-slide>
    </q-carousel>
    <content-swiper v-for="k in [1, 2]" :event-log="latestClickLOgs" :key="k"></content-swiper>
    <div style="padding: 10px;">
      <div class="main-footer">
        <ul style="padding: 0 10px;margin: 0;">
          footer
          <li>대포: anomie7</li>
          <li> 게발자: anomie7</li>
          <li>본 서비스는 정보 제공을 목적으로 하며 각 컨텐츠에 대한 책임은 주최사와 판매업체에 있음을 고시함당</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<style>
  .swiper-slide {
    background-color: white;
  }
  
  .swiper-container {
    margin-bottom: 5px;
    padding: 5px 0;
  }
  
  .main-footer {
    font-size: 0.5em;
    width: 100%;
    padding: 5px;
    border: 1px solid black;
  }
</style>

<script>
  import contentSwiper from "./../components/contentSwiperComponent";
  import { SessionStorage} from 'quasar';
  import axios from 'axios';
  export default {
    name: "PageIndex",
    data() {
      return {
        latestClickLOgs: null
      };
    },
    methods: {
      getLatestEvents() {
        const BASE_URL = "http://www.localhost:8081";
        let accessTkn = SessionStorage.get.item('accessToken');
        let $this = this;
        axios.get('/eventLog', {
          headers: {
            'Authorization': accessTkn
          },
           baseURL: BASE_URL
        }).then((result) => {
          $this.latestClickLOgs = result.data; 
        }).catch((err) => {
          console.log(err);
        });
      }
    },
    components: {
      contentSwiper
    },
    created() {
      this.getLatestEvents();
    },
  };
</script>
