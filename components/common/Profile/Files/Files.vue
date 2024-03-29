<template>
      <bib-file :property="files" :key="files._id" icon="heart-like" class="file__preview"></bib-file>
</template>

<script>
export default {
  name: "Files",
  props: {
    files: {
      type: Array,
    },
  },
  data() {
    return {
      isFileFavorite: false,
    };
  },
  methods:{
    openFile($file){
      this.$nuxt.$emit('open-file', $file)

    }
  }
};
</script>
<style lang="scss">
.file__preview {
  width: 260px;
}
.flex_grid {
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
