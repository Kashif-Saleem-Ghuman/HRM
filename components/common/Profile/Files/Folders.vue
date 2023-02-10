<template>
  <div
    :class="selected ? 'bg-primary text-white' : 'bg-light'"
    class="d-flex align-center p-1 mr-2 folder shape-rounded mb-2 cursor-pointer"
    style="width: 258px" :key="folder.id"
  >
    <bib-icon icon="folder" :scale="1.25"></bib-icon>
    <span
      class="pl-1 text-bold align-center text-of-elipsis folder__name of-hidden text-wrap"
      >{{folder.name}}</span
    >
    <!-- <bib-icon icon="user" :scale="1.25" class="ml-05"></bib-icon> -->
  </div>
</template>

<script>
export default {
  name: "Folders",
  props:{
    folder: {
      type: Array,
    },
  },
  data() {
    return {
      
    };
  },
  mounted() {
    console.log(this.folder, "josafhlasjfdlkasnflkjaslkdjl");
  },
};
</script>
<style lang="scss" scoped>
.folder{
    border: solid 1px #f2f2f5;
    &:hover {
    border: solid 1px #b1b1b4;
}
}
</style>
