<template>
  <div>
    <div class="swiper-container-title">최근 조회한 이벤트</div>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, i) in eventLog" :key="i">
        <q-card>
          <q-card-media>
            <img
              :src="BASE_URL + item.imageFilePath"
              @click="cardClick(item)"
              :style="mediaImgHeight"
            >
          </q-card-media>
          <q-card-title class="main-q-card-title">
            {{item.name}}
            <span slot="subtitle">{{item.startDate}} ~ {{item.endDate}}</span>
          </q-card-title>
        </q-card>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <content-modal :selectedItem="selectedItem" :opened="opened" :minPrice="minPrice" :groupByPrices="groupByPrices" @closeModal="closeModal"></content-modal>
  </div>
</template>

<script>
import { IMAGE_BASE_URL } from "./../js/global-var";
import ContentModal from './ContentModal';
export default {
  name: "ContentSwiper",
  props: ["eventLog"],
   data() {
    return {
      selectedItem: {
        eventId: null,
        imageFilePath: "",
        kindOf: "",
        location: "",
        name: "",
        startDate: null,
        endDate: null
      },
      minPrice: 0,
      groupByPrices: null,
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
      BASE_URL: IMAGE_BASE_URL,
      mediaImgHeight: {
        height: "10rem"
      }
    };
  },
  methods: {
    cardClick(selectedItem) {
      this.opened = true;
      this.selectedItem = selectedItem;
      this.minPrice = this.getMinPrice();
      this.groupByPrices = Array.from(this.getGroupByPrice());
    },
    closeModal(param){
      this.opened = param;
    },
    getMinPrice(){
      let prices = this.selectedItem.price.map(p => p.price);
      return Math.min.apply(null, prices);
    },
    getGroupByPrice(){
      let ticketInfo = new Set();
      this.selectedItem.price.forEach(p => {
        ticketInfo.add(p.ticketInfo)
      });
      let result = new Map();
      for(let info of ticketInfo.values()){
        let tmp = new Array();
        this.selectedItem.price.forEach(item => {
          if(info == item.ticketInfo){
            tmp.push(item);
          }
        })
        result.set(info, tmp);
      }
      return result;
    }
  },
  components: {ContentModal}
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
