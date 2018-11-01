<template>
  <q-page padding class="search-page">
    <div>
      <q-card v-for="(item, index) in events" :key="index" class="event-card">
        <search-item :item="item" :key="index"></search-item>
      </q-card>
      <div slot="message" :size="40">...</div>
    </div>
  </q-page>
</template>

<script>
import SearchItem from "./../components/SearchItem";

export default {
  name: "PageSearch",
  props: ["events"],
  data() {
    return {
    };
  },
  methods: {},
  components: {SearchItem}
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
.q-card-media > img {
  height: 20rem;
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
