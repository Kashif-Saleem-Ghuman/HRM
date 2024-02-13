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
  // align-items: center;
  // justify-content: center;
  // border-top-left-radius: 8px;
  // border-top-right-radius: 8px;
  // border: solid 1px #f2f2f5;
  // transition: border 0.3s linear;
  // position: relative;
  // background: #fbfbfc;
}
.flex_grid {
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}
</style>
