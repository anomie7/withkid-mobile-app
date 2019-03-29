<template>
  <q-page class="scroll">
    <q-carousel class="text-white" style="height:150px;margin-bottom:10px">
      <q-carousel-slide class="bg-primary">광고 기획전</q-carousel-slide>
      <q-carousel-slide class="bg-secondary">기획전 2</q-carousel-slide>
      <q-carousel-slide class="bg-tertiary">몰라 3</q-carousel-slide>
    </q-carousel>
    <content-swiper
      v-for="k in [1]"
      :event-log="latestClickLogs.events"
      :title="latestClickLogs.title"
      :key="k"
    ></content-swiper>
    <content-swiper v-for="k in [2]" :event-log="searchQuration" title="선호하는 조건의 이벤트" :key="k"></content-swiper>
    <div style="padding: 10px;">
      <div class="main-footer">
        <ul style="padding: 0 10px;margin: 0;">
          footer
          <li>대표: test</li>
          <li>정보책임자: test</li>
          <li>본 서비스는 정보 제공을 목적으로 하며 각 컨텐츠에 대한 책임은 주최사와 판매업체에 있음을 고시함</li>
        </ul>
      </div>
    </div>
  </q-page>
</template>

<style>
.swiper-slide {
  background-color: white;
}

.swiper-container {
  margin-bottom: 5px;
  padding: 5px 0;
}

.main-footer {
  font-size: 0.5em;
  width: 100%;
  padding: 5px;
  border: 1px solid black;
}
</style>

<script>
import contentSwiper from "./../components/ContentSwiper";
import { RESOURCE_BASE_URL, USERLOG_BASE_URL } from "./../js/global-var";
import { SessionStorage } from "quasar";
import SearchLog from "./../domain/SearchLog.js";
import moment from "moment";
import axios from "axios";
export default {
  name: "PageIndex",
  data() {
    return {
      latestClickLogs: {
        title: null,
        events: null
      },
      searchQuration: {}
    };
  },
  async created() {
    let accessTkn = SessionStorage.get.item("accessToken");
    this.latestClickLogs = await this.getLatestEvents(accessTkn);
    this.searchQuration = await this.getSearchQuration(accessTkn);
  },
  methods: {
    async getLatestEvents(accessTkn) {
      try {
        let result = await axios.get("/eventLog", {
          headers: {
            Authorization: accessTkn
          },
          baseURL: USERLOG_BASE_URL
        });
        return result.data;
      } catch (error) {
        console.error(error);
      }
    },
    async getRecentMaxSearchLog(accessTkn) {
      let result = await axios.get("/maxSearchLogKey", {
        headers: {
          Authorization: accessTkn
        },
        baseURL: USERLOG_BASE_URL
      });
      return result.data;
    },
    async getSearchQuration(accessTkn) {
      let searchParam = new SearchLog(
        null,
        null,
        moment().format(),
        moment()
          .endOf("month")
          .format(),
        15
      );

      try {
        let maxSearchKeys = await this.getRecentMaxSearchLog(accessTkn);

        if (maxSearchKeys.region == "전체") {
          maxSearchKeys.region = null;
        }

        if (maxSearchKeys.kindOf == "전체") {
          maxSearchKeys.kindOf = null;
        }

        searchParam.addCondition(maxSearchKeys.region, maxSearchKeys.kindOf);
      } catch (error) {
        console.error(error);
      }
      let res = await axios.get("/event", {
        params: searchParam,
        baseURL: RESOURCE_BASE_URL
      });
      return res.data.events;
    }
  },
  components: {
    contentSwiper
  }
};
</script>
