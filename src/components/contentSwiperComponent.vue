<template>
  <div>
  <div class="swiper-container-title">최근 조회한 이벤트</div>
  <swiper :options="swiperOption">
        <swiper-slide v-for="(item, i) in eventLog" :key="i">
          <q-card>
            <q-card-media>
              <img :src="'http://localhost:8081' + item.imageFilePath" @click="opened = true">
            </q-card-media>
            <q-card-title>
              {{item.name}}
               <span slot="subtitle">{{item.startDate}} ~ {{item.endDate}}</span>
            </q-card-title>
          </q-card>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
  <q-modal v-model="opened">
    <h4>Basic Modal</h4>
    <q-btn
      color="primary"
      @click="opened = false"
      label="Close"
    />
  </q-modal>
  </div>
</template>

<script>
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
      opened: false
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
.q-card-media  img{
  cursor: pointer;
}
</style>
