<template >
  <div v-if="loading" id="loading-comp" class="position-absolute d-flex align-center justify-center comp-loading ">
      <bib-spinner variant="primary-24" :scale="8"></bib-spinner> {{text}}
  </div>
</template>
<script>
export default {

  name: 'Loading',

  data() {
      return {
          

      }
  },
  props: {
    loading: { type: Boolean, default: true },
      text: String,
  }
}
</script>
<style lang="scss" scoped>
.comp-loading {
top: 0;
right: 0;
bottom: 0;
left: 0;
// background-color: rgba(250,250,250, 1);
// opacity: 0.5;
z-index: 999999;
}

</style>
