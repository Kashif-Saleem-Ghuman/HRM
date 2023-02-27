<template>
  <div class="mb-2 mr-2 file__preview">
    <bib-file :property="files" :key="files._id" icon="heart-like"></bib-file>
  </div>
</template>

<script>
export default {
  name: "Files",
  props:{
    files: {
      type: Array,
    },
  },
  data() {
    return {
      isFileFavorite: false,
    };
  },
  mounted() {
    // console.log(this.folders, "josafhlasjfdlkasnflkjaslkdjl");
  },
};
</script>
<style lang="scss">
.file__preview {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    border: solid 1px #f2f2f5;
    transition: border 0.3s linear;
    position: relative;
    background: #fbfbfc;
}
.flex_grid{
    flex-direction: row;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
}
</style>
