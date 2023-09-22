<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">{{ item.numLabel }}</div>
          <span>{{ item.numberData }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>
  <script>
export default {
  props: {
    title: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    item: {
      type: Object,
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

<style lang="scss" scoped>
.info-card-leave-wrapper {
  padding: 24px;
  font-size: 14px;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #f2f2f5;
  overflow-wrap: break-word;
  label {
    font-size: 1rem;
    font-weight: 600;
    color: #1d1d20;
  }
  .info-card-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .subheading {
      font-weight: 500;
      color: #b1b1b4;
      margin-bottom: -10px;
      font-size: 14px;
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
    padding-top: 8px;
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
        font-size: 14px;
      }
      span {
        font-weight: 600;
        font-size: 14px;
      }
    }
  }
}
</style>
  