<template>
    <q-toolbar-title>
          <q-select v-model="searchParam.kindOf" stack-label="카테고리" radio :options="kindOfOptions" />
          <q-select v-model="searchParam.region" stack-label="지역" radio :options="regionOptions" />
          <q-datetime clearable v-model="searchParam.startDate" type="date" />
          <q-datetime clearable v-model="searchParam.endDate" type="date" />
          <q-btn icon="search" align="right" @click="searchItem"></q-btn>
      </q-toolbar-title>
</template>

<script>
import axios from "axios";
import searchVue from '../pages/search.vue';
export default {
  // name: 'ComponentName',
  data () {
    return {
      searchParam: {
          region: null,
          kindOf: null,
          startDate: null,
          endDate: null,
          page: 0,
          size: 10
      },
      kindOfOptions: [{
            label: '전체',
            value: null
          },
          {
            label: '뮤지컬',
            value: 'Mu'
          },
          {
            label: '연극',
            value: 'Pl'
          },
          {
            label: '클래식/무용',
            value: 'Cl'
          },
          {
            label: '전시/행사',
            value: 'Ex'
          }
        ],
        regionOptions: [{
            label: '전체',
            value: null
          },
          {
            label: '서울',
            value: '서울'
          },
          {
            label: '부산',
            value: '부산'
          },
          {
            label: '대구',
            value: '대구'
          },
          {
            label: '인천',
            value: '인천'
          },
          {
            label: '대전',
            value: '대전'
          },
          {
            label: '광주',
            value: '광주'
          },
          {
            label: '울산',
            value: '울산'
          },
          {
            label: '세종',
            value: '세종'
          }
        ]
    }
  },
  methods: {
     searchItem() {
        console.log("send request to server");
        let $this = this;
        let $searchParam =  Object.assign({}, this.searchParam);
        axios
          .get("/event", {
            params: $searchParam
          })
          .then(function(res) {
            console.log('receive 500 code')
            let returnVal = {
              events: res.data.events,
              searchParam: $searchParam,
              hasNextPage: res.data.hasNextPage
            }
            $this.$emit('searchBarClick', returnVal);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
  }
}
</script>

<style>
</style>
