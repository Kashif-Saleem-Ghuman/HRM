<template>
      <div class="help-wrapper" :class="custumBg">
        <label>Help?</label>
        <ul>
          <li>How to request a vacation?</li>
          <li>How to request a leave of absence?</li>
          <li>How to send a notification of absence?</li>
        </ul>
      </div>
  </template>
  <script>
  export default {
    name: "Help",
    props:{
      custumBg:{
        type:String
      }
    },
    data() {
      return {
        // fill: { gradient: ["#ffb700", "#47b801"] },
      };
    },
  };
  </script>
  <style lang="scss">
  .help-wrapper {
    padding: 24px;
    border-radius: 24px;
    width: 100%;
    height: 100%;
    color: #fff;
    & label{
      font-size: 14px !important;
      color: #fff;
    }
    &__bg-green{
      background-color: #6bbf68;
    }
    &__bg-black{
      background-color: #000;
    }
    ul {
      padding: 24px 0 0 0;
      margin: 0;
      li {
        list-style: none;
        text-decoration: underline;
        font-size: 14px;
        padding: 0 0 1rem 0;
      }
    }
  }
  </style>
  