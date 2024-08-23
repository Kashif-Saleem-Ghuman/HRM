<template>
  <div>
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
          <label class="font-w-600 font-md">{{ sectionTitle }}</label>
        </div>
        <div class="right-section d-flex gap-05" v-show="settingButtons">
          <div
            @click="showAdjustment"
            :class="showMedicalAdjustment ? 'font-w-600' : 'nav'"
          >
            Adjustment
          </div>
          <div
            @click="showSettings"
            :class="showMedicalSettings ? 'font-w-600' : 'nav'"
          >
            Settings
          </div>
        </div>
      </div>

      <div class="d-flex mt-05 justify-between leave-stats" :key="reloadData">
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
            :key="progressKey"
          ></progress-circle>
        </div>
      </div>

      <div class="setting-item-wrapper">
        <!-- Medical Adjustment Section -->
        <transition @enter="enter" @leave="leave">
          <adjustment-sub
            v-if="showMedicalAdjustment"
            :isLightThemeCheck="isLightThemeCheck"
            :themeInputVariant="themeInputVariant"
            @cancelAdjustment="handleCancelAdjustment"
            :actionOptions="actionOptions"
            :leaveType="leaveType"
            :filteredLeaveData="filteredLeaveData"
          />
        </transition>

        <!-- Medical Settings Section -->
        <transition @enter="enter" @leave="leave">
          <settings-sub
            v-if="showMedicalSettings"
            :isLightThemeCheck="isLightThemeCheck"
            :themeInputVariant="themeInputVariant"
            @cancelSettings="handleCancelSettings"
            :rolloverOptions="rolloverOptions"
            :leaveType="leaveType"
            :filteredLeaveData="filteredLeaveData"
            @updateAdjustment="updateLeaveSettings"
            :leaveTypeField="leaveTypeField"
          />
        </transition>
      </div>
    </div>
    <div v-show="showMedicalSettings ? false : leaveButton">
      <bib-button
      label="Add leave type"
      :variant="isLightThemeCheck ? 'gray' : 'light'"
      class="button-wrapper-align w-100 font-sm mt-1"
      @click="showSettings"
    ></bib-button>
    </div>
  </div>
</template>

<script>
import {
  LEAVE_STATS,
  ROLLOVER_OPTIONS,
  ACTION_OPTIONS,
} from "../../../../../utils/constant/leaveStatsConstants";
import {
  getEmployeeLeaveSettings,
  updateEmployeeLeaveSettings,
} from "../../../../../utils/functions/api_call/leavesettings/leavesettings"; // Adjust the path as needed

export default {
  name: "MedicalSection",
  props: {
    totalAllowance: {
      type: Number,
      default: 0,
    },
    dayUsed: {
      type: Number,
      default: 0,
    },
    accrued: {
      type: Number,
      default: 0,
    },
    scheduledDays: {
      type: Number,
      default: 0,
    },
    daysUsedCarryOver: {
      type: Number,
      default: 0,
    },
    sectionTitle: {
      type: String,
    },
    leaveButton:{
      type:Boolean,
      default:false,
    },
    settingButtons:{
      type:Boolean,
      default:true,
    },
    leaveTypeField:{
      type:Boolean,
      default:false,
    },
    leaveType: String,
  },
  data() {
    return {
      showMedicalAdjustment: false,
      showMedicalSettings: false,
      leaveStats: LEAVE_STATS,
      rolloverOptions: ROLLOVER_OPTIONS,
      actionOptions: ACTION_OPTIONS,
      progressKey: 0,
      leavesDetailedData: [],
      id: null,
      reloadData: 0,
      fill: { gradient: ["#ffb700", "#47b801"] },
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.fetchLeaveSettings();
  },
  computed: {
    filteredLeaveData() {
      return (
        this.leavesDetailedData.find(
          (leave) => leave.leaveType.name === this.leaveType
        ) || {}
      );
    },
    leaveStatsWithAllowance() {
      return this.leaveStats.map((item) => {
        switch (item.label) {
          case "Allowance":
            return { ...item, value: this.totalAllowance || 0 };
          case "Used":
            return { ...item, value: this.dayUsed || 0 };
          case "Reserved":
            return { ...item, value: this.scheduledDays || 0 };
          case "Accrued":
            return { ...item, value: this.accrued || 0 };
          case "Available":
            return { ...item, value: this.getBalanceLeaveValue() || 0 };
          default:
            return item;
        }
      }).filter((item) => {
        if (item.label === "Accrued" && this.leaveType !== "vacation") {
          return false;
        }
        return true;
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
  },
  methods: {
    enter(el) {
      el.style.height = "0";
      el.style.overflow = "hidden";
      const height = el.scrollHeight + "px";
      el.offsetHeight;
      el.style.transition = "height 0.2s ease";
      el.style.height = height;
    },
    leave(el) {
      el.style.height = el.scrollHeight + "px";
      el.offsetHeight;
      el.style.transition = "height 0.2s ease";
      el.style.height = "0";
    },
    getBalanceLeaveValue() {
      if (
        !Number.isNaN(this.totalAllowance) &&
        !Number.isNaN(this.dayUsed) &&
        this.daysUsedCarryOver !== undefined
      ) {
        const balance =
          this.totalAllowance - this.dayUsed - (this.daysUsedCarryOver || 0);
        return balance % 1 === 0 ? balance : balance.toFixed(2);
      }
      return 0;
    },
    showSettings() {
      this.showMedicalSettings = true;
      this.showMedicalAdjustment = false;
    },
    showAdjustment() {
      this.showMedicalSettings = false;
      this.showMedicalAdjustment = true;
    },
    handleCancelAdjustment() {
      this.showMedicalAdjustment = false;
    },
    handleCancelSettings() {
      this.showMedicalSettings = false;
    },
    async fetchLeaveSettings() {
      try {
        const result = await getEmployeeLeaveSettings(this.id);
        this.leavesDetailedData = result;
        this.reloadData += 1;
      } catch (error) {
        console.error("Error fetching leave settings:", error);
      }
    },

    async updateLeaveSettings(payload) {
      if (!payload || Object.keys(payload).length === 0) {
        this.$openPopupNotification({
          text: "No changes detected to update",
          variant: "danger",
        });
        return;
      }

      try {
        await updateEmployeeLeaveSettings(this.filteredLeaveData.id, payload);
        await this.fetchLeaveSettings();
        this.$nuxt.$emit("render-leave-actual-data");
        this.$openPopupNotification({
          text: "Leave settings updated successfully",
          variant: "primary",
        });
        this.$nuxt.$emit("close-sidebar-settings");
      } catch (error) {
        this.$openPopupNotification({
          text: "Error updating leave settings",
          variant: "danger",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box_wrapper {
  background-color: #f9f9f9;
}
.setting-item-wrapper {
  border: 1px solid $light;
  border-radius: 10px;
  padding: 0px 8px 8px 8px;
  margin: 10px 0;
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
