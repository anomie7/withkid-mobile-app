<template>
  <div>
    <div class="swiper-container-title">최근 조회한 이벤트</div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, i) in eventLog" :key="i">
        <q-card>
          <q-card-media>
            <img :src="BASE_URL + item.imageFilePath" @click="opened = true" :style="mediaImgHeight">
          </q-card-media>
          <q-card-title class="main-q-card-title">
            {{item.name}}
            <span slot="subtitle">{{item.startDate}} ~ {{item.endDate}}</span>
          </q-card-title>
        </q-card>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <q-modal v-model="opened">
      <h4>Basic Modal</h4>
      <q-btn color="primary" @click="opened = false" label="Close" />
    </q-modal>
  </div>
</template>

<script>
  import {RESOURCE_BASE_URL} from './../js/global-var'

  export default {
    name: "ContentSwiper",
    props: ['eventLog'],
    data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 20,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
          pagination: {
            el: "",
            clickable: true
          }
        },
        opened: false,
        BASE_URL: RESOURCE_BASE_URL,
        mediaImgHeight: {
          height: '10rem'
        }
      };
    }
  };
</script>

<style>
  .swiper-container-title {
    margin: 0 10px;
    font-size: 15px;
    font-weight: 600;
  }
  
  .q-card-container {
    padding: 0px;
  }
  
  .main-q-card-title .q-card-title {
    height: 4rem;
    overflow: hidden;
    font-size: 13px;
    line-height: 1.2rem;
  }
  
  .q-card-subtitle,
  .q-card-title-extra {
    font-size: 12px;
  }
  
  .q-card-media img {
    cursor: pointer;
  }
</style>
