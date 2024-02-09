<template>
  <div
    :class="[variant ? 'circle-main' + variant : '']"
    class="mr-05"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  >
    <vue-circle
      :progress="progressCount"
      :size="60"
      :reverse="false"
      :fill="fill"
      :empty-fill="emptyfill"
      :animation-start-value="0.0"
      :start-angle="30"
      :thickness="5"
      :show-percent="false"
    >
     <div style="font-size: 12px;">
      <div style="color: rgb(139, 137, 137); font-size:9px" v-if="progressTitle">{{ progressTitle }}</div>
      <div style="font-weight: 600">
         {{ progressPercentage }}
      </div>
     </div>
    </vue-circle>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress/src/index.vue";
export default {
  components: {
    VueCircle,
  },
  props: {
    fill: {
      type: Object,
    },
    progressCount: {
      type: [Number, String],
    },
    progressPercentage: {
      type: [String, Number],
    },
    progressTitle: {
      type: String,
    },
    emptyfill: {
      type: String,
    },
    variant: {
      type: String,
    },
  },
  data() {
    return {
      // fill : { gradient: ["red", "green", "blue"] },
    };
  },
};
</script>
<style lang="scss">
.circle-percent-text-body {
  top: 0px;
}
.circle-main {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  &__bg-green {
    background-color: #d5e8d4;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    p {
      color: #2ba026;
    }
  }
}
</style>
