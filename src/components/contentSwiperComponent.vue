<template>
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
</template>

<script>
export default {
  name: 'ContentSwiper',
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        slidesOffsetBefore: 10,
        slidesOffsetAfter: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      }
    };
  }
};
</script>

<style>
</style>
