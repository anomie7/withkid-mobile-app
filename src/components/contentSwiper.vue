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
    <q-modal v-model="opened">
      <div class="content-view">
        <div class="top">
          <!-- 이미지, 이미지 위에 뱃지 형태로 카테고리,이름, 시작 날짜, 끝 날짜, 장소(링크로 네이버 주소 검색창 띄워줌) -->
          <img :src="imgPath" alt class="image">
          <div style="padding: 1rem;">
            <div class="category">{{category}}</div>
          </div>
          <div class="description">
            <div>{{selectedItem.name}}</div>
            <div>{{selectedItem.startDate}} ~ {{selectedItem.endDate}}</div>
            <div>
              <a
                target="_blank"
                style="text-decoration: none"
              >{{selectedItem.location}}</a>
            </div>
          </div>
        </div>
        <!-- 여기는 대표하는 price를 보여주고, 나머지는 접히는 박스 형태로 보여줄 것 -->
        <!-- 원래 출처로 보내주는 버튼 -->
        <q-btn color="primary" @click="goToOriginSite" label="예매처로 이동" style="width:95%; margin: 0.5rem;" ></q-btn>
        <!-- 네이버 검색 버튼 -->
        <div class="close-btn" @click="opened = false" >X</div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import { IMAGE_BASE_URL } from "./../js/global-var";

export default {
  name: "ContentSwiper",
  props: ["eventLog"],
  methods: {
      this.opened = true;
    },
    goToOriginSite(){
      window.open('http://ticket.interpark.com//Ticket/Goods/GoodsInfo.asp?GroupCode=' + this.selectedItem.interparkCode, '_blank'); 
    }
  },
  computed: {
    imgPath() {
      return this.BASE_URL + this.selectedItem.imageFilePath;
    },
      return "https://www.google.com/maps?q=" + this.selectedItem.location;
    },
    category(){
      switch (this.selectedItem.kindOf) {
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

/* content-view start */
.content-view .top {
  display: flex;
  flex-direction: column;
}

.content-view div.close-btn {
  cursor: pointer;
  text-align: center;
  position: absolute !important;
  width: 2rem;
  height: 2rem;
  font-size: 2rem;
  top: 0;
  right: 0;
  margin: 0.5rem
}

.content-view div.category {
  position: absolute !important;
  text-align: center;
  background-color: blanchedalmond;
  border-radius: 1rem;
}

.content-view .top .description {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
}
.content-view .top .description div {
  margin-top: 0.8rem;
}
.content-view .top .image {
  height: 20rem;
  /* margin: 1rem; */
}

/* content-view end */
</style>
