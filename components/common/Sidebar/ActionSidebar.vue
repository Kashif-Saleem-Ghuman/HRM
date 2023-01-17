<template>
  <div id="side-panel" class="side-panel">
    <h1 class="p-2">Hello World</h1>
    <bib-icon icon="folder" :scale="1.25"></bib-icon>
    <div
      class="of-scroll-x"
      style="height: 400px; width: 100%; background-color: #eee"
    >
      <bib-file :property="property" icon="heart-like"></bib-file>
      <bib-file :property="property">
        <template slot="tags">
          <bib-button label="New" variant="primary" size="sm"></bib-button>
          <bib-button label="Free" variant="success" size="sm"></bib-button>
        </template>
      </bib-file>
      <bib-file
        :property="property"
        :favorite="isFileFavorite"
        @favorite-file="handleFileFavorite"
      >
        <template slot="tags">
          <bib-button label="New" variant="primary" size="sm"></bib-button>
          <bib-button label="Free" variant="success" size="sm"></bib-button>
        </template>
      </bib-file>
      <bib-icon
        icon="file"
        variant="warnning"
        scale="2"
        v-on:click="closeSidebar"
      ></bib-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActionSidebar",
  data() {
    return {
      property: {
        name: "File Name",
        colorLabel: "secondary-sub2",
        preview: "https://loremflickr.com/640/360",
        type: "Image",
        size: "234",
      },
      isFileFavorite: false,
    };
  },
  methods: {
    handleFileFavorite(value) {
      console.log(value);
      this.isFileFavorite = value;
    },
    closeSidebar() {
      this.$nuxt.$emit("close-sidebar");
    },
  },
};
</script>
