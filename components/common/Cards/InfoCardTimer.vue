
<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper w-100">
      <div>
        <label>My Status</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">In {{ activityDetails.in }}</div>
          <span>{{ stopWatchTime }}</span>

          <div class="subheading_footer">Out {{ activityDetails.out }}</div>
        </div>
      </div>
      <div class="footer-item d-flex">
        <div class="items">
          <label>Break</label>
          <span>{{ activityDetails.breaks }}</span>
        </div>
        <div class="items">
          <label>Total work</label>
          <span>{{ activityDetails.total }}</span>
        </div>
      </div>
      <!-- <div
        class="button-wrapper button-wrapper__bgprimary cursor-pointer"
        :class="{
          'button-custom--disabled': buttonDisabled,
          'bg-secondary-sub3': buttonDisabled,
          'bg-danger-sub1': active,
        }"
        @click="handleClockInOutClick"
      >
        <span>{{ buttonLable }}</span>
      </div> -->
      <div class="d-flex justify-center" @click="handleWrapperClick">
        <bib-button
          :label="buttonLable"
          :variant="buttonVariant"
          :icon="icon"
          :disabled="buttonDisabled ? true : false"
          @click="handleClockInOutClick"
          class="button-wrapper-align w-100"
        ></bib-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  calculateActivityDetails,
  formatTime,
} from "../../../utils/functions/clock_functions";
import { mapGetters } from "vuex";
import timerMixin from "../../../mixins/timer-mixin";

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
    };
  },
  async mounted() {
    this.startTimerInterval();
    this.registerDefaultValueChronometer();
    await this.$store.dispatch("timeattendance/setTimerData", this.employeeId);

    if (this.$store.state.token.isUser) {
      await this.$store.dispatch("timeattendance/setDailyTimeEntriesToday");
    } else {
      await this.$store.dispatch("timeattendance/setEmployeeDailyTimeEntryToday", {
        employeeId: this.employeeId,
        date: new Date().toISOString(),
      });
    }

    document.addEventListener("visibilitychange",  () => {
      if (document.hidden) {
        this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
          status: false,
        });
        this.clearChronometerInterval();
      } else {
        this.startTimerInterval();
      }
    });
  },
  methods: {
    close() {
      this.clockModal = false;
    },
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
      this.$store.dispatch("app/addNotification", { notification })
    },
    async handleClockInOutClick() {
      if (this.active) {
        this.stopClick = true;
        await this.stopTimer();
        this.$emit("timer-stop");
      } else {
        await this.startTimer();
      }
    },


  },
  computed: {
    isTimesheetLocked() {
      const timesheet = this.$store.state.timeattendance.timesheetToday
      if (timesheet) return timesheet.isLocked()
    },
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getdailyTimeEntriesToday",
    }),
    buttonDisabled() {
      return this.stopClick || this.disabled || this.isTimesheetLocked
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
    buttonVariant(){
      if(this.disabled) return "light"
      if (this.$store.state.token.isUser) {
        if (this?.active) return "danger";
        if(!this?.active) return "primary-24"
      }
    },
    buttonLable() {
      if (this.$store.state.token.isUser) {
        if (this?.active) return "Clock Out";
        else return "Clock In";
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

