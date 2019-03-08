<template>
  <q-page padding class="search-page">
    <div>
      <q-card v-for="(item, index) in events" :key="index" class="event-card">
        <search-item :item="item" :key="index" @modalOpen="modalOpen"></search-item>
      </q-card>
      <div slot="message" :size="40" v-show="hasNextPage">loading...</div>
      <div slot="message" :size="40" v-show="!hasNextPage">검색 결과가 엄서용</div>
    </div>
    <content-modal :selectedItem="selectedItem" :opened="opened" :minPrice="minPrice" :groupByPrices="groupByPrices" @closeModal="closeModal"></content-modal>
  </q-page>
</template>

<script>
import SearchItem from "./../components/SearchItem";
import ContentModal from './../components/ContentModal';

export default {
  name: "PageSearch",
  props: ["events", "hasNextPage"],
  data() {
    return {
      opened: false,
      selectedItem: {
        eventId: null,
        imageFilePath: "",
        kindOf: "",
        location: "",
        name: "",
        startDate: null,
        endDate: null
      },
      minPrice: null,
      groupByPrices: null
    };
  },
  methods: {
    modalOpen(param, selectedItem){
      this.opened = param;
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
  components: {SearchItem, ContentModal}
};
</script>

<style>
.search-page {
  padding-top: 1rem;
}
.event-card {
  margin: 0 auto;
  margin-bottom: 0.5rem;
}
.price {
  font-size: 1.1em;
  padding-left: 1.2em;
}
.category-badge{
  width: 80px;
  height: 20px;
  position:absolute;
  right: 5%;
  background-color: ghostwhite;
  text-align: center;
  border-radius: 10px;
}
</style>
