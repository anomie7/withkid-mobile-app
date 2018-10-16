<template>
  <q-page padding class="search-page">
    <div>
      <q-card v-for="(item, index) in items" :key="index" class="event-card">
        <q-card-media :height="150">
          <img src="./../assets/20181016000116704.gif">
        </q-card-media>
        <q-card-title>
           시간을 파는 상점
        </q-card-title>
        <q-card-main>
          <p>파랑 씨어터</p>
          <p class="text-faded">2017.10.01 ~ 2018.11.25</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          가격 30,000원
        </q-card-actions>
      </q-card>

      <div slot="message" :size="40">...</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageSearch",
  props: ["items"],
  data() {
    return {};
  },
  methods: {}
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
.q-card-media > img{
  height: 20rem;
}
</style>
