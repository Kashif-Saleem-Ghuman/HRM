<template>
  <div
    class="rounded-border shape-rounded p-1 mt-05"
    :class="
      showMedicalAdjustment || showMedicalSettings
        ? ''
        : isLightThemeCheck
        ? 'box_wrapper'
        : 'bg-dark'
    "
  >
    <div class="d-flex justify-between align-items">
      <div class="left-section">
        <label class="font-w-600 font-md">Medical Leave</label>
      </div>
      <div class="right-section d-flex gap-05">
        <div
          @click="showSettings"
          :class="showMedicalSettings ? 'font-w-600' : 'nav'"
        >
          Settings
        </div>
        <div
          @click="showAdjustment"
          :class="showMedicalAdjustment ? 'font-w-600' : 'nav'"
        >
          Adjustment
        </div>
      </div>
    </div>

    <div class="d-flex mt-05 justify-between leave-stats">
      <div v-for="(item, index) in leaveStatsWithAllowance" :key="index">
        <div class="item-lable">{{ item.label }}</div>
        <div class="sub_value">
          {{ item.value }}
        </div>
        <div class="sub_unit">
          {{ item.unit }}
        </div>
      </div>
      <div class="d-flex flex-d-column">
        <progress-circle
          :progressCount="
            getpercentageValue == 'Infinity' ? '0' : getpercentageValue
          "
          :progressPercentage="
            getpercentageValue == 'Infinity' ? '0' : getpercentageValue + '%'
          "
          :fill="fill"
          emptyfill="#f1f1f1"
          key="60"
        ></progress-circle>
      </div>
    </div>
  </div>
</template>

<script>
import {
  LEAVE_STATS,
  ROLLOVER_OPTIONS,
  ACTION_OPTIONS,
  ALLOWANCE_OPTIONS,
} from "../../../../../utils/constant/leaveStatsConstants";

export default {
  name: "MedicalSection",
  props: {
    totalAllowance: {
      type: Number,
      required: true,
    },
    dayUsed: {
      type: Number,
      required: true,
    },
    scheduledDays: {
      type: Number,
      required: true,
    },
    daysUsedCarryOver: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      showMedicalAdjustment: false,
      showMedicalSettings: false,
      leaveStats: LEAVE_STATS,
      rolloverOptions: ROLLOVER_OPTIONS,
      actionOptions: ACTION_OPTIONS,
      allowanceOptions: ALLOWANCE_OPTIONS,
    };
  },
  computed: {
    leaveStatsWithAllowance() {
      return this.leaveStats.map((item) => {
        switch (item.label) {
          case "Allowance":
            return { ...item, value: this.totalAllowance };
          case "Used":
            return { ...item, value: this.dayUsed };
          case "Reserved":
            return { ...item, value: this.scheduledDays };
            case "Available":
          return { ...item, value: this.balanceLeaveValue };
          default:
            return item;
        }
      });
    },
    getpercentageValue() {
      const totalLeave = this.dayUsed + this.scheduledDays;
      this.progressKey += 1;
      if (this.totalAllowance !== 0) {
        return Math.round((totalLeave / this.totalAllowance) * 100);
      } else {
        return "0";
      }
    },
    balanceLeaveValue() {
      if (!Number.isNaN(this.totalAllowance) && !Number.isNaN(this.daysUsed)) {
        const balance =
          this.totalAllowance - this.dayUsed - this.daysUsedCarryOver;
        return balance % 1 === 0 ? balance : balance.toFixed(2);
      }
      return 0;
    },
  },
  methods: {
    showSettings() {
      this.showMedicalSettings = true;
      this.showMedicalAdjustment = false;
    },
    showAdjustment() {
      this.showMedicalSettings = false;
      this.showMedicalAdjustment = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.box_wrapper {
  background-color: #f9f9f9;
}
.leave-stats {
  .item-lable {
    font-size: 14px;
  }
  .sub_value {
    font-weight: 600;
    font-size: 2rem;
  }
  .sub_unit {
    font-size: 14px;
  }
}
.nav {
  color: $primary-24;
  text-decoration: underline;
  cursor: pointer;
}
</style>
