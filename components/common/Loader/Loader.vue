<template >
  <div class="spinner_drive peak w-100 h-100" v-if="loading">
      <div class="d-flex h-100 justify-center align-center">
        <bib-spinner variant="primary-24" :scale="10"></bib-spinner>{{text}}
      </div>
    </div>
</template>
<script>
export default {

  name: 'Loader',

  data() {
      return {
          

      }
  },
  props: {
    loading: { type: Boolean, default: false },
      text: String,
  }
}
</script>
<style lang="scss" scoped>
.spinner_drive {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  z-index: 9999 !important;
  left: 0;
  -webkit-animation: fadein .5s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein .5s; /* Firefox < 16 */
   -ms-animation: fadein .5s; /* Internet Explorer */
    -o-animation: fadein .5s; /* Opera < 12.1 */
       animation: fadein .5s;
       animation-delay: .8s;
  background: rgba(0, 0, 0, 0.25);
  bottom: 0;
  width: 100vw;
  height: 100vh;
}
@keyframes fadein {
  from { visibility: hidden; opacity: 0; }
  to   { visibility:visible; opacity: 1; }
}
 
/* Firefox < 16 */
@-moz-keyframes fadein {
  from { visibility: hidden; opacity: 0; }
  to   { visibility:visible; opacity: 1; }
}
 
/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from { visibility: hidden; opacity: 0; }
  to   { visibility:visible; opacity: 1; }
}
 
/* Internet Explorer */
@-ms-keyframes fadein {
  from { visibility: hidden; opacity: 0; }
  to   { visibility:visible; opacity: 1; }
}
</style>
