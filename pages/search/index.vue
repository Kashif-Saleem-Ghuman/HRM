<template>
  <div class="">
      <section-header-left
        :title="`Search results for: ${search}`"
      ></section-header-left>
    <div>
      <search-content></search-content>
      <no-record v-if="!searchResults.length"></no-record>
    </div>
  </div>
</template>

<script>
import SearchContent from "../../components/search/SearchContent.vue";
export default {
  components: { SearchContent },

  computed: {
    search() {
      return this.$store.state.app.search;
    },
    searchResults() {
      return this.$store.state.app.searchResults || [];
    },
  },
};
</script>

<style>
</style>