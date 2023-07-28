<template>
  <div class="customLoader" id="customLoader" v-show="showloader">
    <div class="inner" id="customLoaderInner">
      <div class="spinner" id="spinner"></div>
      <span> {{ text }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Loader",

  data() {
    return {};
  },
  props: {
    showloader: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: "",
    },
  },
};
</script>
<style lang="css">
.customLoader {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1011;
  top: 0;
  bottom: 0;
}

.customLoader .inner {
  padding: 0.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  font-size: 0.9rem;
  color: #999;
  text-align: center;
}
.customLoader .inner span {
  margin-left: -20px;
}

.customLoader .spinner {
  width: 4rem;
  height: 4rem;
  position: relative;
}

.customLoader .spinner::before {
  position: absolute;
  top: 50%;
  left: 50%;
  content: "";
  border: 6px solid #ddd;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border-left-color: #0841a3;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  -webkit-animation-name: rotate;
  animation-name: rotate;
}
@keyframes rotate {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0);
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    -webkit-transform: translate(-50%, -50%) rotate(1turn);
    transform: translate(-50%, -50%) rotate(1turn);
  }
}
</style>
