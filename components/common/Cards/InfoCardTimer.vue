<template>
  <div class="d-flex" :class="themeClassWrapper">
    <div :class="['info-card-timer w-100', cardBorderClass]">
      <div>
        <label :class="colorVariant">{{ getWelcomeMessage() }}</label>
      </div>
      <div class="info-card-items">
        <div>
          <div class="subheading">{{ currentDate }}</div>
          <div class="timer-value">{{ stopWatchTime }}</div>
        </div>
      </div>
      <div
        v-if="!active"
        class="d-flex justify-center"
        @click="handleWrapperClick"
      >
        <bib-button
          label="Clock In"
          variant="success"
          class="button-wrapper-align w-100"
          @click="handleClockInOutClick()"
          :disabled="isTimerLoading"
        ></bib-button>
      </div>

      <div v-else class="d-flex justify-center gap-1">
        <div
          class="w-100 btn-warning-override"
          v-if="active && !isConfirmationOpen"
        >
          <bib-button
            :label="buttonLable"
            :icon="icon"
            :variant="buttonVariant"
            @click="handleBreakInOutClick()"
            class="button-wrapper-align w-100"
            :disabled="isTimerLoading"
          ></bib-button>
        </div>
        <div v-if="active && isConfirmationOpen" class="w-100">
          <div
            class="w-100 p-05 text-center shape-rounded"
            style="background-color:#ffecec"
          >
            <span class="text-danger" :style="{ fontWeight: 'bold' }"
              >End your day?
              <span class="cursor-pointer" @click="handleClockInOutClick()"
                >Yes</span
              >
              /
              <span class="cursor-pointer" @click="handleConfirmationButton()"
                >No</span
              >
            </span>
          </div>
        </div>
        <div class="w-100" v-if="!active">
          <bib-button
            label="Absent"
            variant="danger--outline"
            class="button-wrapper-align w-100"
            @click="handleClockInOutClick()"
          ></bib-button>
        </div>
        <div
          class="w-100"
          v-if="active && !isConfirmationOpen"
          @click="handleClockOutWrapperClick"
        >
          <bib-button
            label="Clock out"
            :variant="isLightThemeCheck ? 'light' : 'secondary'"
            class="button-wrapper-align w-100"
            @click="handleConfirmationButton()"
            :disabled="isTimerLoading || isBreakActive"
          ></bib-button>
        </div>
      </div>
      <div class="activity-wrapper">
        <div class="activity-item gap-1">
          <div :class="['activity-items', inActivityClass]">
            <label>In</label>
            <span>{{ activityDetails.in }}</span>
          </div>
          <div class="activity-items">
            <label>Out</label>
            <span>{{ activityDetails.out }}</span>
          </div>
        </div>
        <div class="activity-item gap-1">
          <div :class="['activity-items', breakActivityClass]">
            <label>Break</label>
            <span>{{ activityDetails.breaks }}</span>
          </div>
          <div class="activity-items">
            <label>Overtime</label>
            <span>{{ activityDetails.overtime }}</span>
          </div>
        </div>
        <div class="activity-item gap-1">
          <div class="activity-items">
            <label>Total work hours</label>
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
import { getBreakTimerDuration } from "@/utils/functions/timer";
import {
  FILL_DAILY_ENTRY_EVENT,
  WELCOME_MESSAGE,
} from "@/utils/constant/Constant";
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
    todayDate: {
      type: String | DateTime | Date,
      default: null,
    },
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      localData: [],
      activityReport: {},
      loading: false,
      stopClick: false,
      currentDate: DateTime.now().toFormat("MMMM dd, yyyy"),
      timerRefresh: 0,
      activityData: null,
      debounced: false,
      clockoutDebounced: false,
      dateNow: DateTime.now().startOf("day"),
      isConfirmationOpen: false,
    };
  },

  async mounted() {
    this.registerRootListeners();

    if (!this.$store.state.token.isUser) {
      await this.$store.dispatch(
        "timeattendance/setEmployeeDailyTimeEntryToday",
        {
          employeeId: this.employeeId,
          date: new Date().toISOString(),
        }
      );
    }
    document.addEventListener("visibilitychange", this.handleVisibilityChange);

    this.loading = false;
  },

  beforeDestroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    this.unregisterRootListeners();
  },
  methods: {
    close() {
      this.clockModal = false;
    },
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    makeTimeEntry,
    editTimeEntry,
    handleWrapperClick() {
      if (this.disabled) {
        this.debouncedNotification();
      }
    },
    getWelcomeMessage() {
      const now = DateTime.local();
      const hour = now.hour;
      let partOfDay = "";

      if (!this.active) {
        switch (true) {
          case hour >= 5 && hour < 12:
            partOfDay = WELCOME_MESSAGE.MORNING;
            break;
          case hour >= 12 && hour < 17:
            partOfDay = WELCOME_MESSAGE.AFTERNOON;
            break;
          case hour >= 17 && hour < 21:
            partOfDay = WELCOME_MESSAGE.EVENING;
            break;
          default:
            partOfDay = WELCOME_MESSAGE.NIGHT;
        }
      } else {
        if (this.active && !this.isBreakActive && !this.isConfirmationOpen) return "Clocked-In";
        if (this.active && this.isBreakActive && !this.isConfirmationOpen) return "On Break";
        if (this.active && !this.isBreakActive && this.isConfirmationOpen) return "Clocking Out";
      }

      const clockMessage = this.disabled
        ? ""
        : !this.active
        ? " Please Clock-In"
        : " Please Clock-Out";
      return partOfDay + clockMessage;
    },

    handleClockOutWrapperClick() {
      if (this.isBreakActive) {
        this.clockOutDebouncedNotification();
      }
    },
    debouncedNotification() {
      if (!this.debounced) {
        this.$openPopupNotification({
          text: "Please delete the time entry to clock-in again for the day.",
          variant: "danger",
        });
        this.debounced = true;
        setTimeout(() => {
          this.debounced = false;
        }, 3000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      }
    },

    clockOutDebouncedNotification() {
      if (!this.clockoutDebounced && !this.debounced) {
        this.$openPopupNotification({
          text: "Please back to work to clock out",
          variant: "danger",
        });
        this.clockoutDebounced = true;
        setTimeout(() => {
          this.clockoutDebounced = false;
        }, 3000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      }
    },
    calculateDates() {
      const now = DateTime.now();
      const currentDate = now.toISODate();
      const currentTime = now.toISO();
      return {
        date: currentDate,
        ...(!this.isBreakActive && {
          startDate: currentTime,
        }),
        ...(this.isBreakActive && {
          endDate: currentTime,
        }),
        ...(this.isBreakActive && {
          id: this.$store.state.timeattendance.breakTimer.id,
        }),
      };
    },
    async makeBreakEntry() {
      const { id, startDate, endDate, date } = this.calculateDates();
      const activityType = "break";
      const source = "timer";

      this.loading = true;
      try {
        const makeTimeEntry = !this.isBreakActive
          ? await this.makeTimeEntry(
              activityType,
              date,
              startDate,
              endDate,
              source
            )
          : await this.editTimeEntry({
              id,
              date,
              start: startDate,
              end: endDate,
              activity: activityType,
              source,
            });

        if (makeTimeEntry) {
          this.$openPopupNotification({
            text: "Time entry updated successfully",
            variant: "primary",
          });
        }
        await this.$store.dispatch("timeattendance/setDailyTimeEntries");
        await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
        await this.startTimerInterval();
      } catch (error) {
        // this.$openPopupNotification({
        //   text: error.response.data.message,
        //   variant: 'danger',
        // })
      } finally {
        this.loading = false;
      }
    },

    async handleClockInOutClick() {
      if (this.active) {
        this.stopClick = true;
        await this.stopTimer();
        this.$nuxt.$emit("timer-stop");
      } else {
        await this.handleStartTimer();
      }

      this.isConfirmationOpen = false;
    },

    async handleBreakInOutClick() {
      try {
        if (!this.active) return false;
        this.makeBreakEntry();
      } catch (error) {
        this.$openPopupNotification({
          text: error.response.data.message,
          variant: "danger",
        });
      }
    },

    handleConfirmationButton() {
      this.isConfirmationOpen = !this.isConfirmationOpen;
    },
    handleVisibilityChange() {
      if (document.hidden) {
        this.clearChronometerInterval();
      } else {
        this.startTimerInterval(true);
      }
    },

    registerUpdateTimerListener() {
      this.$root.$on("update-timer", () => {
        this.timerRefresh += 1;
        if (this.$store.state.token.isUser) {
          this.$store.dispatch("timeattendance/setDailyTimeEntries");
        } else {
          this.$store.dispatch(
            "timeattendance/setEmployeeDailyTimeEntryToday",
            {
              employeeId: this.employeeId,
              date: new Date().toISOString(),
            }
          );
        }
      });
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
    isTimerLoading() {
      return this.loading || this.disabled;
    },

    stopWatchTime() {
      return formatTime(this.chronometer);
    },
    activityDetails() {
      return calculateActivityDetails(
        this.getTimerData.start,
        this.getDailyTimeEntries
      );
    },
    buttonVariant() {
      if (this.disabled) return this.isLightThemeCheck ? "light" : "dark-sub3";
      if (this.$store.state.token.isUser) {
        if (this?.active && !this.isBreakActive) return "warning";
        if (this?.active && this.isBreakActive) return "success";
        if (!this?.active) return "primary-24";
      }
    },
    buttonLable() {
      if (this.$store.state.token.isUser) {
        if (this.active && !this.isBreakActive) return "Take a break";
        if (this.active && this.isBreakActive) return "Back to work";
      } else if (this.$store.state.token.isAdmin) {
        if (this?.active) return "Online";
        else return "Offline";
      }
    },
    colorVariant() {
      if (this.active && !this.isBreakActive && !this.isConfirmationOpen) return "text-success";
        if (this.active && this.isBreakActive && !this.isConfirmationOpen) return "text-orange";
        if (this.active && !this.isBreakActive && this.isConfirmationOpen) return "text-danger";
    },
    isSelectedTodayDate() {
      if (!this?.todayDate) return;
      const todayDate = DateTime.fromFormat(
        this.todayDate,
        "dd-MMM-yyyy"
      ).startOf("day");
      return this.dateNow.equals(todayDate);
    },
    cardBorderClass() {
      if (this.active && this.isConfirmationOpen) {
        return "info-card-timer__border_danger";
      }
      if (this.active && !this.isBreakActive) {
        return "info-card-timer__border_success";
      }
      if (this.active && this.isBreakActive) {
        return "info-card-timer__border_warning";
      }
      return "info-card-timer__border_light";
    },
    inActivityClass() {
      if (this.active && !this.isBreakActive && !this.isConfirmationOpen)
        return "activity-items__border_success text-success";
        if (this.active && !this.isBreakActive && !this.isConfirmationOpen)
        return "activity-items__border_warning text-success";
        if (this.active && !this.isBreakActive && this.isConfirmationOpen)
        return "activity-items";
      if (!this.isLightThemeCheck)
        return "activity-items__border_light text-light";
      return "activity-items__border_light text-dark";
    },
    breakActivityClass() {
      if (this.active && this.isBreakActive)
        return "activity-items__border_warning text--orange";
      if (!this.isLightThemeCheck)
        return "activity-items__border_light text-light";
      return "activity-items__border_light text-dark";
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
$color-orange: #ffab00;
.info-card-timer {
  padding: 24px;
  font-size: 14px;
  background: $white;
  border-radius: 24px;
  // border: 1px solid $secondary-sub3;
  overflow-wrap: break-word;
  &__border_light {
    border: 1px solid $light;
  }
  &__border_success {
    border: 1px solid $success;
  }
  &__border_warning {
    border: 1px solid $color-orange;
  }
  &__border_danger {
    border: 1px solid $danger;
  }
  label {
    font-size: 1rem !important;
    font-weight: 600;
    // color: $dark;
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
      .text--orange {
        label {
          color: $color-orange !important;
        }
      }
      .activity-items {
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom: 1px solid $light;
        height: 35px;
        align-items: center;
        &__border_light {
          label {
            color: $dark;
          }
          border-bottom: 1px solid $light;
        }
        &__border_success {
          label {
            color: $success;
          }
          border-bottom: 1px solid $success !important;
        }
        &__border_warning {
          label {
            color: $warning;
          }
          border-bottom: 1px solid $color-orange !important;
        }
        label {
          // color: var(--bib-text-secondary);
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
.text--orange {
  color: $color-orange !important;
}
.btn-warning-override {
  .button--warning {
    background: $color-orange !important;
  }
  .button--warning:hover {
    background-color: $warning !important;
  }
}
// .btn-break:hover{
//   background-color: $warning !important;
// }
</style>
