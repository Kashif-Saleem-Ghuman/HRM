<template>
    <div class="d-flex gap-1">
      <div
      :class="[
        className
      ]"
      
        class="cursor-pointer chip_text_wrapper"
        @click="$emit('on-click')"
      >
        <span>{{ title }}</span>
      </div>
    </div>
  </template>
  <!-- :class="[
          variant ? 'chip-wrapper' + variant : '',
          shapeCircle ? 'chip-wrapper' + shapeCircle : ''
          ]" -->
  <script>
  export default {
    name: "Chips",
    props: {
      title: {
        type: String,
      },
      scale: {
        type: Number,
      },
      className: {
        type: Array,
         default:[],
      },
    },
    data() {
      return {};
    },
  };
  </script>
  <style lang="scss">
  .chip_text_wrapper{
    padding: 4px 8px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    height: 65px !important;
    width: 100%;
    margin: -3px -5px 0 0px;

    &__textsucess {
      background-color: #d5e8d4;
      span {
        color: #2ba026;
        font-weight: 500;
        font-size: 14px;
      }
    }
    
    &__textabsent {
      background-color: rgba(255, 171, 0, 0.16);
      span {
        color: #FFAB00;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__textvacation {
      background-color: rgba(31, 66, 162, 0.16);
      span {
        color: #1F42A2;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__textabsentpink {
      background-color: rgba(230, 0, 14, 0.16);
      span {
        color: #E6000E;
        font-weight: 500;
        font-size: 14px;
      }
    }
    &__textdefault {
    background-color: #ffffff;
    span {
      color: #000;
      font-weight: 500;
      font-size: 14px;
    }
  }
  }
  </style>
  