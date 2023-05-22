<template>
    <div  :class="[
      variant ? 'circle-main' + variant : '',
    ]"
    class="mr-05"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
    >
      <vue-circle
        :progress="progressCount"
        :size="50"
        :reverse="false"
        :fill="fill"
        :empty-fill="emptyfill"
        :animation-start-value="0.0"
        :start-angle="30"
        :thickness="5"
        :show-percent="false"
      >
      <p>8</p>
      </vue-circle>
    </div>
  </template>
  
  <script>
  import VueCircle from "vue2-circle-progress/src/index.vue";
  export default {
    components: {
      VueCircle,
    },
    props : {
      fill: {
          type: Number,
      },
      progressCount: {
          type: Number,
      },
      emptyfill: {
          type: String,
      },
      variant: {
        type: String,
      }
  },
    data() {
      return {
        //   fill : { gradient: ["red", "green", "blue"] },
        
      };
    },
    methods: {
      progress(event, progress, stepValue) {
        console.log(stepValue);
      },
      progress_end(event) {
        console.log("Circle progress end");
      },
    },
  };
  </script>
  <style lang="scss">
  .circle-percent-text-body {
    top: 0px;
  }
  .circle-main{
      border-radius: 50%;
      height: 50px;
      width: 50px;
      &__bg-green{
          background-color: #D5E8D4;
          border-radius: 50%;
      height: 50px;
      width: 50px;
          p{
          color:#2BA026
      }
      }
      
      
  }
  </style>