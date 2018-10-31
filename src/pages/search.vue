<template>
  <q-page padding class="search-page">
    <div>
      <q-card v-for="(item, index) in events" :key="index" class="event-card">
        <q-card-media :height="150">
          <img src="./../assets/20181016000116704.gif">
        </q-card-media>
        <q-card-title>
           {{item.name}}
        </q-card-title>
        <q-card-main>
          <p>{{item.location}}</p>
          <p class="text-faded">{{item.startDate}} ~ {{item.endDate}}</p>
        </q-card-main>
        <q-card-separator />
        <q-card-actions>
          {{item.price}}
        </q-card-actions>
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
