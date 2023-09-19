<template>
  <div class="widget d-flex">
    <div class="widget-container">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="widget-info mt-05">
        <div>
          <div class="widget-info__subheading">{{ subheading }}</div>
          <span>{{ value }}</span>
        </div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      data: {},
    };
  },

  computed: {
    title() {
      return this.data?.title;
    },
    subheading() {
      return this.data?.subheading;
    },
    value() {
      return this.data?.value;
    },
  },
  
  methods: {
    async fetchData() {
      throw new Error(`Widget fetchaData function needs to be implemented!`);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
.widget-container {
  width: 100%;
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
  .widget-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__subheading {
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
  