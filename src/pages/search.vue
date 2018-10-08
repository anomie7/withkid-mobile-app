<template>
  <q-page padding class="search-page">
    <div style="width: 500px; max-width: 90vw;">
      <p v-for="(item, index) in items" :key="index" class="caption">
        {{index + 1}} Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
         nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehend
         erit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <div slot="message" :size="40">...</div>

    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageSearch",
  props: ['items'],
  data() {
    return {}
  },
  methods: {}
};
</script>

<style>
</style>
