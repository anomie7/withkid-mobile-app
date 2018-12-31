<template>
 <q-modal v-model="opened">
    <div class="content-view">
      <div class="top">
        <img :src="imgPath" alt class="image">
        <!-- 이미지, 이미지 위에 뱃지 형태로 카테고리,이름, 시작 날짜, 끝 날짜, 장소(링크로 네이버 주소 검색창 띄워줌) -->
        <div style="padding: 1rem;">
          <div class="category">{{category}}</div>
        </div>
        <div class="description">
          <div>{{selectedItem.name}}</div>
          <div>{{selectedItem.startDate}} ~ {{selectedItem.endDate}}</div>
          <div style="color: red">최저가 {{minPrice}}원</div>
          <div>
            <a
              target="_blank"
              :href="searchLocation"
              style="text-decoration: none"
            >{{selectedItem.location}}</a>
          </div>
        </div>
        <div class="price-list">
          가격
            <q-list>
              <q-collapsible separator v-for="(groupByprice, index) in groupByPrices" :key="index" icon="" :label="groupByprice[0]">
                <div v-for="(p, i) of groupByprice[1]" :key="i" class="">
                  {{p.extraInfo}} {{p.price}}원
                </div>
              </q-collapsible>
          </q-list>
        </div>
      </div>
      <!-- 원래 출처로 보내주는 버튼 -->
      <q-btn color="primary" @click="goToOriginSite" label="예매처로 이동" style="width:90%; margin: 0 1rem;" ></q-btn>
      <!-- 네이버 검색 버튼 -->
      <q-btn color="green" @click="goToNaverBlogSearchResult" label="네이버 블로그 검색" style="width:90%; margin: 1rem;" ></q-btn>
      <div class="close-btn" @click="closeModal" >X</div>
    </div>
  </q-modal>
</template>

<script>
import { IMAGE_BASE_URL } from "./../js/global-var";

export default {
  name: 'ContentModal',
  props: ["selectedItem", "opened", "minPrice", "groupByPrices"],
  data () {
    return {
      BASE_URL: IMAGE_BASE_URL,
    }
  },
  methods: {
    goToOriginSite(){
      window.open('http://ticket.interpark.com//Ticket/Goods/GoodsInfo.asp?GroupCode=' + this.selectedItem.interparkCode, '_blank'); 
    },
    goToNaverBlogSearchResult(){
      window.open('https://search.naver.com/search.naver?where=post&sm=tab_jum&query=' + this.selectedItem.name, '_blank'); 
    },
    closeModal(){
      this.$emit('closeModal', false);
    }
  },
  computed: {
    imgPath() {
      return this.BASE_URL + this.selectedItem.imageFilePath;
    },
    searchLocation() {
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
}
</script>

<style>
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
  background-color: coral;
  padding: 0.1rem;
  border-radius: 0.5rem;
}
.content-view .top .description {
  display: flex;
  flex-direction: column;
  background-color: wheat;
  margin: 1rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
}
.content-view .top .price-list{
  margin: 1rem;
  border-radius: 0.5rem;
}
.content-view .top .description div {
  margin-top: 0.8rem;
}
.content-view .top .image {
  height: 20rem;
}
/* content-view end */
</style>
