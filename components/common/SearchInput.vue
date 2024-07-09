<template>
  <div class="d-flex align-center mr-05">
    <span class="mr-05">{{  label  }}</span>
    <bib-input
      v-model="searchString"
      :size="size"
      type="text"
      @input="onSearchChange"
      :variant="isLightThemeCheck ? 'light' : 'dark'"
    ></bib-input>
  </div>
</template>

<script>
import { debounce } from "lodash";
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Search:"
    },
    size: {
      type: String,
      default: 'sm'
    },
    debounceMs: {
      type: Number,
      default: () => 300,
    },
    onChangeFn: {
      type: Function,
      default: () => {},
    },
  },

  data() {
    return {
      searchString: null,
      debouncedSearch: null,
    };
  },

  methods: {
    onSearchChange(event) {
      if (this.debouncedSearch) this.debouncedSearch(event);
    },
  },

  mounted() {
    this.debouncedSearch = debounce((event) => {
      if (this.onChangeFn) this.onChangeFn(event);
    }, this.debounceMs);
  },
};
</script>

<style>
</style>