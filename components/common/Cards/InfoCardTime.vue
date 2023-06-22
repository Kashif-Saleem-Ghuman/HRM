<template>
    <div class="d-flex">
        <div
          class="info-card-leave-wrapper"
          style="width: 100%"
        >
          <div>
            <label>{{ item.title }}</label>
          </div>
          <div class="info-card-items mt-05">
            <div>
              <div class="subheading">{{ item.numLabel }}</div>
              <span>{{ item.numberData }}</span>
  
              <div class="subheading_footer">{{ item.daysDesc }}</div>
            </div>
            <div>
              <progress-circle
                :progressCount="item?.progress"
                :progressTitle="item?.progreesTitle"
                :progressPercentage="item?.progress + '%'"
                :fill="fill"
                v-show="item.progress == null ? '' : item.progress + '%'"
                emptyfill="#f1f1f1"
              ></progress-circle>
            </div>
            <div v-show="item.photo == null ? '' : item.photo">
              <bib-avatar src="https://placekitten.com/300/300"></bib-avatar>
            </div>
          </div>
          <div class="footer-item d-flex">
            <div class="items">
              <label>{{ item.figureLabel }}</label>
              <span>{{ item.figureLabelData }}</span>
            </div>
            <div class="items">
              <label>{{ item.figureLabelTwo }}</label>
              <span>{{ item.figureLabelTwoData }}</span>
            </div>
          </div>
            <div style="width: 100%">
        <bib-button
          :label="buttonLable"
          size="lg"
          :variant="buttonVariant"
          pill
          class="w-100 mb-1"
        ></bib-button>
      </div>
          </div>
        </div>
      <!-- <div style="width:33%" class="pr-1">
        <info-card-help custumBg="help-wrapper__bg-black"></info-card-help>
      </div> -->
  </template>
  <script>
  export default {
    name: "Chips",
    props: {
      label: {
        type: String,
      },
      hashItem: {
        type: String,
      },
      item: {
        type: Array,
      },
      buttonLable: {
      type: String,
    },
    icon: {
      type: String,
    },
    buttonVariant: {
      type: String,
    },
    },
    data() {
      return {
        fill: { gradient: ["#ffb700", "#47b801"] },
      };
    },
    methods: {
      buttonAction(item) {
        alert("Called", item);
      },
    },
  };
  </script>
  <style lang="scss">
  .info-card-leave-wrapper {
    padding: 12px 12px 0px 12px;
    font-size: 14px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e2e2e3;
    overflow-wrap: break-word;
    label {
      font-size: 1rem;
      font-weight: 600;
    }
    .info-card-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .subheading {
        font-weight: 500;
        color: #b1b1b4;
        margin-bottom: -10px;
      }
      span {
        font-size: 56px;
        font-weight: 500;
        margin-left: -4px;
      }
      .subheading_footer {
        font-weight: 500;
        color: #b1b1b4;
        margin-top: -10px;
      }
      &_desc {
        font-size: 10px;
      }
    }
    .footer-item {
      padding-top: 16px;
      padding-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      .items {
        display: flex;
        justify-content: space-between;
        width: 50%;
        padding-right: 10px;
        align-items: center;
        label {
          color: #b1b1b4;
          font-weight: normal;
        }
        span {
          font-weight: 600;
        }
      }
    }
  }
  </style>
  