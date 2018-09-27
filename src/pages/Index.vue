<template>
  <q-page >
    <q-carousel class="text-white">
      <q-carousel-slide class="bg-primary">
        Slide 1
      </q-carousel-slide>
      <q-carousel-slide class="bg-secondary">
        Slide 2
      </q-carousel-slide>
      <q-carousel-slide class="bg-tertiary">
        Slide 3
      </q-carousel-slide>
    </q-carousel>
    <swiper :options="swiperOption">
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <swiper-slide></swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </q-page>
</template>

<style>
.swiper-slide{
  background-color: bisque;
}
.swiper-container{
  height: 150px;
  margin-top: 10px
}
</style>

<script>
export default {
  name: "PageIndex",
   data() {
      return {
        swiperOption: {
          slidesPerView: 3,
          spaceBetween: 30,
          slidesOffsetBefore: 10, 
          slidesOffsetAfter: 10,
          height: '100px',
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        }
      }
    }
};
</script>
