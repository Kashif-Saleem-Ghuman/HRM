<template>
  <div class="d-flex">
    <div class="info-card-timer w-100" :key="timerRefresh">
      <div>
        <label>Good Morning! Please Clock-In</label>
      </div>
      <div class="info-card-items">
        <div>
          <div class="subheading">{{ currentDate }}</div>
          <div class="timer-value">{{ stopWatchTime }}</div>
        </div>
      </div>
      <div v-if="!active" class="d-flex justify-center">
        <bib-button
          label="Clock In"
          variant="primary-24"
          class="button-wrapper-align w-100"
          @click="handleClockInOutClick()"
        ></bib-button>
      </div>
      <div v-else class="d-flex justify-center gap-1" @click="handleWrapperClick">
        <bib-button
          :label="buttonLable"
          :variant="buttonVariant"
          :icon="icon"
          @click="handleBreakInOutClick()"
          class="button-wrapper-align w-100"
        ></bib-button>

        <bib-button
          label="Absent"
          variant="danger--outline"
          class="button-wrapper-align w-100"
          @click="handleClockInOutClick()"
          v-if="!active"
        ></bib-button>
        <bib-button
          label="Clock out"
          variant="light"
          class="button-wrapper-align w-100"
          @click="handleClockInOutClick()"
          v-if="active"
        ></bib-button>
      </div>
      <div class="activity-wrapper">
        <div class="activity-item gap-1">
          <div class="activity-items">
            <label>In</label>
            <span>{{ activityDetails.in }}</span>
          </div>
          <div class="activity-items">
            <label>Out</label>
            <span>{{ activityDetails.out }}</span>
          </div>
        </div>
        <div class="activity-item gap-1">
          <div class="activity-items">
            <label>Break</label>
            <span>{{ activityDetails.breaks }}</span>
          </div>
          <div class="activity-items">
            <label>Overtime</label>
            <span>{{ activityDetails.total }}</span>
          </div>
        </div>
        <div class="activity-item gap-1">
          <div class="activity-items">
            <label>Total</label>
            <span>{{ activityDetails.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  calculateActivityDetails,
  formatTime,
} from "../../../utils/functions/clock_functions";
import { DateTime } from "luxon";
import { mapGetters, mapState } from "vuex";
import timerMixin from "../../../mixins/timer-mixin";
import {
  parseInputTimeIntoArray,
  numberToClockDigits,
  hoursAndMinutesToJSDate,
} from "@/utils/functions/dates";
import {
  makeTimeEntry,
  editTimeEntry,
  deleteTimeEntry,
} from "@/utils/functions/functions_lib_api";
export default {
  mixins: [timerMixin],

  props: {
    clockModal: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    employeeId: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      localData: [],
      activityReport: {},
      loading: true,
      timerLoading: false,
      stopClick: false,
      currentDate: DateTime.now().toFormat("MMMM dd, yyyy"),
      timerRefresh: 0,
      activityData:null,
    };
  },
  created() {
    this.$root.$on("update-timer", () => {
      this.timerRefresh += 1;
      if (this.$store.state.token.isUser) {
        this.$store.dispatch("timeattendance/setDailyTimeEntries");
      } else {
        this.$store.dispatch("timeattendance/setEmployeeDailyTimeEntryToday", {
          employeeId: this.employeeId,
          date: new Date().toISOString(),
        });
      }
    });
  },
  async mounted() {
    this.startTimerInterval();
    this.registerDefaultValueChronometer();
    await this.$store.dispatch("timeattendance/setTimerData", this.employeeId);

    if (!this.$store.state.token.isUser) {
      await this.$store.dispatch("timeattendance/setEmployeeDailyTimeEntryToday", {
        employeeId: this.employeeId,
        date: new Date().toISOString(),
      });
    }
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },
  beforeDestroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
  },
  methods: {
    close() {
      this.clockModal = false;
    },
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    editTimeEntry,
    makeTimeEntry,
    handleWrapperClick() {
      if (this.disabled) {
        this.debouncedNotification();
      }
    },
    debouncedNotification() {
      if (!this.debounced) {
        this.openPopupNotification({
          text: "Please delete the time entry to clock-in again for the day.",
          variant: "danger",
        });
        this.debounced = true;
        setTimeout(() => {
          this.debounced = false;
        }, 3000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      }
    },
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    calculateDates() {
      const now = DateTime.now();
      const currentDate = now.toISODate();
      const currentTime = now.toISOTime();
      return {
        date: DateTime.fromJSDate(new Date(currentDate)).toFormat("yyyy-MM-dd"),

        ...(!this.isBreakActive) && {
          startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(currentTime),
          currentDate
        ).toISOString()},

        ...(this.isBreakActive && {
          endDate: this.hoursAndMinutesToJSDate(
            ...this.parseInputTimeIntoArray(currentTime),
            currentDate
          ).toISOString(),
        }),
      };
    },
    async makeBreakEntry() {
      const { startDate, endDate, date } = this.calculateDates();
      const activityType = 'break';
      const source = 'timer';
      try {
        const editedEntry = await this.makeTimeEntry(
          activityType,
          date,
          startDate,
          endDate,
          source,
        );

        await this.$store.dispatch("timeattendance/setDailyTimeEntries");

        if (editedEntry) {
          this.openPopupNotification({
            text: "Time entry updated successfully",
            variant: "primary",
          });
          // this.$emit("edit-entry", editedEntry);
        }
      } catch (error) {
        console.log(error)
        // this.clearStartTime();
        // this.clearEndTime();
      }
    },

    async handleClockInOutClick() {
      if (this.active && !this.isBreakActive) {
        this.stopClick = true;
        await this.stopTimer();
        this.$emit("timer-stop");
      } else {
        await this.startTimer();
      }
    },
    async handleBreakInOutClick() {
      this.makeBreakEntry();
    },

    handleVisibilityChange() {
      if (document.hidden) {
        this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
          status: false,
        });
        this.clearChronometerInterval();
      } else {
        this.startTimerInterval(true);
      }
    },
  },
  computed: {
    isTimesheetLocked() {
      const timesheet = this.$store.state.timeattendance.timesheetToday;
      if (timesheet) return timesheet.isLocked();
    },
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getdailyTimeEntriesToday",
    }),
    buttonDisabled() {
      return this.stopClick || this.disabled || this.isTimesheetLocked;
    },

    stopWatchTime() {
      if (this.timerLoading) return "00:00:00";
      return formatTime(this.chronometer);
    },
    activityDetails() {
      return calculateActivityDetails(
        this.getTimerData.start,
        this.getDailyTimeEntries
      );
    },
    buttonVariant() {
      if (this.disabled) return "light";
      if (this.$store.state.token.isUser) {
        if (this?.active) return "warning";
        if (!this?.active) return "primary-24";
      }
    },
    buttonLable() {
      if (this.$store.state.token.isUser) {
        console.log('isBreakActive', this.isBreakActive, this?.getDailyTimeEntries.start);
        if (this.active && !this.isBreakActive) return "Take a break";
        if (this.active && this.isBreakActive) return "Back to work";
      } else if (this.$store.state.token.isAdmin) {
        if (this?.active) return "Online";
        else return "Offline";
      }
    },
  },

  watch: {
    disabled() {
      this.stopClick = false;
    },
  },
};
</script>
<style lang="scss">
.info-card-timer {
  padding: 24px;
  font-size: 14px;
  background: $white;
  border-radius: 24px;
  border: 1px solid $secondary-sub3;
  overflow-wrap: break-word;

  label {
    font-size: 1rem !important;
    font-weight: 600;
    color: $dark;
  }

  .info-card-items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;

    .subheading {
      font-weight: 500;
      color: $secondary-sub1;
      font-size: 14px;
    }

    .timer-value {
      font-size: 56px;
      font-weight: 600;
      margin-bottom: -8px;
      margin-left: -4px;
      color: $dark;
    }
  }
  .activity-wrapper {
    padding-top: 0.5rem;
    .activity-item {
      padding-top: 8px;
      padding-bottom: 8px;
      display: flex;
      justify-content: space-between;

      .activity-items {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid $light;
        height: 35px;
        align-items: center;

        label {
          color: var(--bib-text-secondary);
          font-size: 12px !important;
          padding-right: 10px;
          font-weight: 500;
        }

        span {
          font-weight: 500;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
