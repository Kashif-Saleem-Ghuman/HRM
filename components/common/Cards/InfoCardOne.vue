<template>
  <div class="d-flex position-relative" :class="themeClassWrapper">
    <div class="info-card-leave-wrapper w-100">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">Past due</div>
          <span>{{ item.pastDue }}</span>

          <div class="subheading_footer">Timesheets</div>
        </div>
        <div>
          <progress-circle
            v-if="showProgress"
            :progressCount="getpercentageValue"
            :progressPercentage="getpercentageValue + '%'"
            :fill="fill"
            emptyfill="#f1f1f1"
            :key="progressKey"
          ></progress-circle>
        </div>
      </div>
      <div class="position-relative h-70">
        <div class="position-absolute w-100" style="bottom :26px">
        <div class="footer-item d-flex">
        <div class="items">
          <label>Pending</label>
          <span>{{ item.pending }}</span>
        </div>
        <div class="items">
          <label>Refused</label>
          <span>{{ item.refused }}</span>
        </div>
      </div>
      <div
        class="d-flex justify-center"
        @click.stop="$emit('on-click')"
      >
        <bib-button
          :label="buttonLable"
          :variant="isLightThemeCheck ? 'light' : 'secondary'"
          class="button-wrapper-align w-100"
          :icon="icon"
        ></bib-button>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
    },
    hashItem: {
      type: String,
    },
    item: {
      type: [Object, Array],
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
    title: {
      type: String,
    },
    className: {
      type: String,
    },
    showProgress: {
      type: Boolean,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      progressKey: 0,
    };
  },
  methods: {},
  computed: {
    getpercentageValue() {
        let val = this.item?.pastDue ? this.item?.pastDue : '0';
        this.progressKey += 1;
        return val;
      },
  },
};
</script>
