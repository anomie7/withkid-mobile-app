<template>
  <div>
  <div class="swiper-container-title">타이틀에는 무엇이 들어갈까요.</div>
  <swiper :options="swiperOption">
        <swiper-slide v-for="i in cardCount" :key="i">
          <q-card>
            <q-card-media>
              <img src="./../assets/18012228_p.gif">
              <!-- <img src="./../assets/18009908_p.gif"> -->
            </q-card-media>
            <q-card-title>
              아기 돼지 삼형제
               <span slot="subtitle">2010.08.04 ~ 2019.10.02</span>
            </q-card-title>
          </q-card>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  </div>
</template>

<script>
export default {
  name: "ContentSwiper",
  props: ['cardCount'],
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
      }
    };
  }
};
</script>

<style>
.swiper-container-title{
  margin: 0 10px;
  font-size: 15px;
  font-weight: 600;
}
.q-card-container{
  padding: 0px;
}
.q-card-title{
  font-size: 13px;
}
.q-card-subtitle, .q-card-title-extra{
  font-size: 12px;
}
</style>
