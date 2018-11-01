<template>
  <q-page padding class="search-page">
    <div>
      <q-card v-for="(item, index) in events" :key="index" class="event-card">
        <q-card-media :height="150">
          <img :src="hostDomain + item.imageFilePath">
        </q-card-media>
        <q-card-title>
           {{item.name}}
        </q-card-title>
        <q-card-main>
          <div class="category-badge">
            <p>{{item.kindOf}}</p>
          </div>
          <p>{{item.location}}</p>
          <p class="text-faded">{{item.startDate}} ~ {{item.endDate}}</p>
        </q-card-main>
        <q-card-separator />
        <q-list>
          <q-collapsible icon="payment" label="Price">
            <div v-for="(p, i) of item.price" :key="i" class="price">
              {{p.price}}원
            </div>
          </q-collapsible>
        </q-list>
      </q-card>

      <div slot="message" :size="40">...</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageSearch",
  props: ["events"],
  data() {
    return {
      hostDomain: "http://www.localhost:8081"
    };
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
  margin: 5px;
  position:absolute;
  right: 10px;
  background-color: ghostwhite;
  text-align: center;
  border-radius: 10px;
}
</style>
