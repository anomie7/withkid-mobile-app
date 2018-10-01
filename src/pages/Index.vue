<template>
  <q-page class="scroll" >
    <q-carousel class="text-white ">
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
    <content-swiper v-for="k in [1, 2 ] " :key="k"></content-swiper>
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
import contentSwiper from "./../components/contentSwiperComponent";

export default {
  name: "PageIndex",
   data() {
      return {

      }
    },
    components: {contentSwiper}
};
</script>
