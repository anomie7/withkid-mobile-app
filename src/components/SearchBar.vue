<template>
  <q-toolbar-title>
    <q-select v-model="searchParam.kindOf" stack-label="카테고리" radio :options="kindOfOptions"/>
    <q-select v-model="searchParam.region" stack-label="지역" radio :options="regionOptions"/>
    <q-datetime clearable v-model="searchParam.startDate" type="date"/>
    <q-datetime clearable v-model="searchParam.endDate" type="date"/>
    <swiper class="date-chip-container">
      <swiper-slide>
        <q-btn rounded push text-color="primary" color="white" @click="getThisWeek" label="이번주"></q-btn>
        <q-btn rounded push color="red" label="이번 주말" @click="getThisWeekEnd"></q-btn>
        <q-btn rounded push color="amber" label="다음주" @click="getNextWeek"></q-btn>
        <q-btn rounded push color="teal" label="다음 주말" @click="getNextWeekEnd"></q-btn>
        <q-btn rounded push text-color color="light" label="이번달" @click="getThisMonth"></q-btn>
        <q-btn rounded push text-color="primary" color="lime" label="다음달" @click="getNextMonth"></q-btn>
      </swiper-slide>
      <swiper-slide></swiper-slide>
    </swiper>
    <q-btn icon="search" align="right" @click="searchItem"></q-btn>
  </q-toolbar-title>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { SessionStorage } from "quasar";
import { RESOURCE_BASE_URL, USERLOG_BASE_URL } from "./../js/global-var";

export default {
  // name: 'ComponentName',
  data() {
    return {
      searchParam: {
        region: null,
        kindOf: null,
        startDate: null,
        endDate: null,
        page: 0,
        size: 10
      },
      kindOfOptions: [
        {
          label: "전체",
          value: null
        },
        {
          label: "뮤지컬",
          value: "Mu"
        },
        {
          label: "연극",
          value: "Pl"
        },
        {
          label: "클래식/무용",
          value: "Cl"
        },
        {
          label: "전시/행사",
          value: "Ex"
        }
      ],
      regionOptions: [
        {
          label: "전체",
          value: null
        },
        {
          label: "서울",
          value: "서울"
        },
        {
          label: "부산",
          value: "부산"
        },
        {
          label: "대구",
          value: "대구"
        },
        {
          label: "인천",
          value: "인천"
        },
        {
          label: "대전",
          value: "대전"
        },
        {
          label: "광주",
          value: "광주"
        },
        {
          label: "울산",
          value: "울산"
        },
        {
          label: "세종",
          value: "세종"
        }
      ]
    };
  },
  methods: {
    async searchItem() {
      // console.log("send request to server");
      let $searchParam = Object.assign({}, this.searchParam);
      try {
        let res = await axios.get("/event", {
          params: $searchParam,
          baseURL: RESOURCE_BASE_URL
        });
        let accessToken = SessionStorage.get.item("accessToken");
        this.saveSearchLog(accessToken, $searchParam);
        let returnVal = {
          events: res.data.events,
          searchParam: $searchParam,
          hasNextPage: res.data.hasNextPage
        };
        this.$emit("searchBarClick", returnVal);
      } catch (error) {
        let res = error.response;
        if (res.status == 404) {
          console.error(res.data.msg);
          this.$emit("eventNotFound", res.data);
          return;
        }
        console.error(error);
      }
    },
    async saveSearchLog(accessToken, searchParam) {
      try {
        await axios({
          method: "post",
          url: "/searchLog",
          headers: {
            Authorization: accessToken
          },
          data: {
            ...searchParam
          },
          baseURL: USERLOG_BASE_URL
        });
      } catch (error) {
        console.error(error.response.data.msg);
      }
    },
    containerPull(event) {
      console.log(event);
    },
    getThisWeek() {
      let param = this.searchParam;
      param.startDate = moment().format();
      param.endDate = moment()
        .endOf("isoWeek")
        .format();
      console.log(`${param.startDate} ~ ${param.endDate}`);
    },
    getThisWeekEnd() {
      let param = this.searchParam;
      let endOf = moment().endOf("isoWeek");
      param.startDate = endOf
        .clone()
        .subtract(1, "days")
        .format();
      param.endDate = endOf.format();
      console.log(`${param.startDate} ~ ${param.endDate}`);
    },
    getNextWeek() {
      let param = this.searchParam;
      let startOfNext = moment()
        .startOf("isoWeek")
        .add(7, "days");
      let endOfNext = startOfNext.clone().endOf("isoWeek");
      console.log(`${startOfNext} ~ ${endOfNext}`);
      param.startDate = startOfNext.format();
      param.endDate = endOfNext.format();
    },
    getNextWeekEnd() {
      let param = this.searchParam;
      let endOfNext = moment()
        .endOf("isoWeek")
        .add(7, "days");
      let startOfNext = endOfNext.clone().subtract(1, "days");
      console.log(`${startOfNext} ~ ${endOfNext}`);
      param.startDate = startOfNext.format();
      param.endDate = endOfNext.format();
    },
    getThisMonth() {
      let param = this.searchParam;
      param.startDate = moment().format();
      param.endDate = moment()
        .endOf("month")
        .format();
      console.log(`${param.startDate} ~ ${param.endDate}`);
    },
    getNextMonth() {
      let param = this.searchParam;
      let startOfNext = moment()
        .startOf("month")
        .add(1, "M");
      let endOfNext = startOfNext.clone().endOf("month");
      console.log(`${startOfNext} ~ ${endOfNext}`);
      param.startDate = startOfNext.format();
      param.endDate = endOfNext.format();
    }
  },
  created() {
    this.getThisMonth();
    this.searchItem();
  }
};
</script>

<style>
.date-chip-container {
  margin: 0.5em auto;
}
.touch-to-left {
  transform: translateX(-167px);
}
.swiper-slide {
  background-color: initial !important;
}
</style>
