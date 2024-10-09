<template>
  <div>
    <div class="cell activity">
      <label>
        {{ isBreak ? label + this.number : label }}
      </label>
    </div>
    <div class="cell" @click="handleWrapperClick">
        <bib-time-picker-wrapper
          v-model="startTime"
          name="startTime"
          placeholder="--"
          @input="timeInputBlur"
          :disabled="disabled || this.isTimerActive || this.isTimesheetLocked"
          class="timepicker_input"
        ></bib-time-picker-wrapper>
    </div>
    <div class="cell" @click="handleWrapperClick">
      <bib-time-picker-wrapper
        v-model="endTime"
        name="endTime"
        placeholder="--"
        @input="timeInputBlur"
        :disabled="disabled || this.isTimerActive || this.isTimesheetLocked"
        class="timepicker_input"
      ></bib-time-picker-wrapper>
      <!-- <bib-input
        type="time"
        name="name"
        v-model="endTime"
        @blur="timeInputBlur"
        :step="60"
        :disabled="disabled"
      ></bib-input> -->
    </div>
    <div class="cell">
      <div class="uneditable-cell">
        <label>
          {{ entryTotal }}
        </label>
      </div>
    </div>
    <div
      v-if="showDeleteIcon"
      class="cell cursor-pointer trash"
      @click="deleteEntry"
    >
      <bib-icon icon="trash-solid" class="mx-05" :scale="1"></bib-icon>
    </div>
    <loader :loading="loading"></loader>
  </div>
</template>
<script>
import {
  makeTimeEntry,
  editTimeEntry,
  deleteTimeEntry,
} from "@/utils/functions/functions_lib_api";
import {
  parseInputTimeIntoArray,
  numberToClockDigits,
  hoursAndMinutesToJSDate, getDateDiffInSeconds,
} from "@/utils/functions/dates";
import { DateTime } from "luxon";
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
import { getTimeFromDate, isToday } from "../../../../utils/functions/dates";
import {
  calculateTimeDifferenceInHHMM,
  calculateTimeDifferenceInMinutes,
  isEndTimeOnSameDay,
} from "../../../../utils/functions/time";
import {
  ACTIVITY_TYPE, EDIT_TIME_ENTRY_WARNING_MESSAGE, TIME_ENTRY_LOCKED_MESSAGE, TIMESHEET_LOCKED_MESSAGE,
  TIMESHEET_STATUSES, TOTAL_PER_DAY_WORKING_HOURS,
} from "../../../../utils/constant/Constant";
import {mapGetters} from "vuex";
import {DATETIME_FORMAT} from "@/utils/functions/datetime-input";
import {formatTime} from "@/utils/functions/clock_functions";
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    number: {
      type: String,
      default: "",
    },
    todayDate: {
      type: String | DateTime | Date,
      default: null
    },
    isTimesheetLocked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newData: { ...this.entry, startTime: null, endTime: null },
      dateNow: DateTime.now().startOf('day'),
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      getTimerData: "timeattendance/getTimerData",
    }),
    isBreak() {
      return this.entry.activity === ACTIVITY_TYPE.BREAK;
    },
    showDeleteIcon() {
      if (!this.newData.id) return false;
      if (this.newData.status === TIMESHEET_STATUSES.APPROVED) return false;
      return true;
    },
    hasInEntry() {
      const entries = this.$store.state.timeattendance.dailyTimeEntries;
      if (!entries) return false;
      return entries.some((entry) => {
        return entry.activity === ACTIVITY_TYPE.IN && entry.end;
      });
    },
    hasBreakEntry() {
      const entries = this.$store.state.timeattendance.dailyTimeEntries;
      if (!entries) return false;
      return entries.some((entry) => {
        return entry.activity === ACTIVITY_TYPE.BREAK && entry.end;
      });
    },
    timer() {
      if (this.$route.params.id)
        return this.$store.state.employee.selectedEmployee?.timer;

      return this.$store.state.timeattendance.timer?.active
        ? this.$store.state.timeattendance.timer
        : null;
    },
    isSelectedTodayDate () {
      const todayDate = DateTime.fromFormat(this.todayDate, DATETIME_FORMAT).startOf('day');
      return this.dateNow.equals(todayDate);
    },
    disabled() {
      return (
        this.newData.activity === ACTIVITY_TYPE.IN &&
        !this.hasInEntry &&
        this.timer &&
        isToday(this.date)
      );
    },
    isTimerActive() {
      return this.getTimerData?.active && this.isSelectedTodayDate || false;
    },
    isActivityIN() {
      return this.newData.activity === ACTIVITY_TYPE.IN;
    },
    startTime: {
      get() {
        if (this.newData?.startTime) return this.newData?.startTime;
        if (this.newData.start) return getTimeFromDate(this.newData.start);
        if (this.disabled && this.timer)
          return getTimeFromDate(this.timer.start);
      },
      set(time) {
        this.newData.startTime = time;
      },
    },
    endTime: {
      get() {
        if (this.newData?.endTime) return this.newData?.endTime;
        if (this.newData.end) return getTimeFromDate(this.newData.end);
      },
      set(time) {
        this.newData.endTime = time;
      },
    },
    label() {
      return ACTIVITY_DICTIONARY[this.newData.activity];
    },

    totalTimeInMinutes() {
      if (!this.startTime || !this.endTime) return "";
      return calculateTimeDifferenceInMinutes(this.startTime, this.endTime);
    },
    entryTotal() {
      if (!this.startTime || !this.endTime) return "";
      let netTotalWorkInMS = getDateDiffInSeconds(
        this.newData.start,
        this.newData.end
      )
      if(netTotalWorkInMS >= TOTAL_PER_DAY_WORKING_HOURS)
        netTotalWorkInMS = 0;


      return formatTime(netTotalWorkInMS, false);
    },
  },
  methods: {
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    handleWrapperClick() {
      if(this.isTimesheetLocked) {
        this.debounceTimesheetLockNotification();
      }
      else if ((this.disabled && this.timer) || this.isTimerActive){
        this.debouncedNotification();
      }
    },
    debounceTimesheetLockNotification() {
      if (!this.lockDebounce) {
        this.$openPopupNotification({
          text: TIME_ENTRY_LOCKED_MESSAGE,
          variant: "danger",
        });
        this.lockDebounce = true;
        setTimeout(() => {
          this.lockDebounce = false;
        }, 3000);
      }
    },
    debouncedNotification() {
      if (!this.debounced) {
        this.$openPopupNotification({
          text: EDIT_TIME_ENTRY_WARNING_MESSAGE,
          variant: "danger",
        });
        this.debounced = true;
        setTimeout(() => {
          this.debounced = false;
        }, 3000);
      }
    },
    getTimeFromDate,

    getEndDate(startTime, endTime) {
      if (!isEndTimeOnSameDay(startTime, endTime)) {
        return DateTime.fromFormat(this.todayDate, DATETIME_FORMAT).plus({ day: 1 }).toFormat(DATETIME_FORMAT);
      }
      return this.todayDate;
    },
    calculateDates() {
      const date = DateTime.fromJSDate(new Date(this.todayDate)).toFormat("yyyy-MM-dd");

      const startDate = DateTime.fromFormat(`${date} ${this.startTime}`, "yyyy-MM-dd HH:mm").toUTC().toISO();

      if (!this.endTime) {
        return {
          date,
          startDate,
          endDate: null,
        };
      }

      let endDate = DateTime.fromFormat(`${date} ${this.endTime}`, "yyyy-MM-dd HH:mm").toUTC().toISO();

      if (!isEndTimeOnSameDay(this.startTime, this.endTime)) {
        endDate = DateTime.fromISO(endDate).plus({ day: 1 }).toISO();
      }

      return {
        date,
        startDate,
        endDate
      };
    },
    async editThisEntry() {
      if (!this.isEntryValid()) return;

      const { startDate, endDate, date } = this.calculateDates();

      try {
        const editedEntry = await this.editTimeEntry({
          date,
          start: startDate,
          end: endDate,
          id: this.entry.id,
          activity: this.newData.activity,
        });

        if (editedEntry) {
          this.$openPopupNotification({
            text: "Time entry updated successfully",
            variant: "primary",
          });
          this.$emit("edit-entry", editedEntry);
        }
      } catch (error) {
        this.clearStartTime();
        this.clearEndTime();
      }
    },
    isEndDateGreatherThanNow() {
      const [hours, minutes, seconds] = this.endTime.split(":").map(Number);

      let date = DateTime.fromJSDate(this.date).set({
        hours,
        minutes,
        seconds,
      });

      if (!isEndTimeOnSameDay(this.startTime, this.endTime)) {
        if (
          DateTime.fromFormat(this.endTime, "HH:mm") >
          DateTime.fromFormat(this.startTime, "HH:mm")
        ) {
          date = date.plus({ day: 1 });
        }
      }

      date = date.toJSDate();

      const now = new Date();
      return date > now;
    },

    isStartDateGreatherThanNow() {
      const [hours, minutes, seconds] = this.startTime.split(":").map(Number);

      let date = DateTime.fromJSDate(this.date).set({
        hours,
        minutes,
        seconds,
      });

      date = date.toJSDate();

      const now = new Date();
      return date > now;
    },

    getDateFromTime(time) {
      const [hours, minutes, seconds] = time.split(":").map(Number);
      return DateTime.fromJSDate(this.date)
        .set({
          hours,
          minutes,
          seconds,
        })
        .toJSDate();
    },

    addDayToDate(date) {
      if (date instanceof Date) {
        return DateTime.fromJSDate(date).plus({ day: 1 }).toJSDate();
      } else {
        return DateTime.fromISO(date).plus({ day: 1 }).toJSDate();
      }
    },

    validateInEntryWithExistingBreak() {
      if (this.isActivityIN && this.hasBreakEntry) {
        const breakEntry = this.findBreakEntry();
        const breakEntryStartTime = DateTime.fromISO(
          breakEntry.start
        ).toJSDate();
        const breakEntryEndTime = DateTime.fromISO(breakEntry.end).toJSDate();
        const inEntryStartTime = this.getDateFromTime(this.startTime);
        let inEntryEndTime = this.getDateFromTime(this.endTime);

        if (!isEndTimeOnSameDay(this.startTime, this.endTime)) {
          inEntryEndTime = this.addDayToDate(inEntryEndTime);
        }

        const isBreakAfterInEntry =
          breakEntryStartTime >= inEntryStartTime &&
          breakEntryEndTime <= inEntryEndTime;
        // if (!isBreakAfterInEntry) {
        //   this.$openPopupNotification({
        //     text: "Your existing break is not within work entry time range",
        //     variant: "danger",
        //   });
        //   this.clearStartTime();
        //   this.clearEndTime();
        //   return false;
        // }
      }
      return true;
    },

    findBreakEntry() {
      return this.$store.state.timeattendance.dailyTimeEntries.find(
        (entry) => entry.activity === ACTIVITY_TYPE.BREAK && entry.end
      );
    },

    validateStartIsBeforeBreak() {
      if (this.isActivityIN && this.hasBreakEntry) {
        const breakEntry = this.findBreakEntry();
        const breakEntryStartTime = DateTime.fromISO(
          breakEntry.start
        ).toJSDate();
        const inEntryStartTime = this.getDateFromTime(this.startTime);
        const isBreakAfterStart = breakEntryStartTime > inEntryStartTime;
        if (!isBreakAfterStart) {
          this.$openPopupNotification({
            text: "Your break cannot be before work start time",
            variant: "danger",
          });
          this.clearStartTime();
          this.clearEndTime();
          return false;
        }
      }
      return true;
    },

    validateBreakIsWithinWorkingHours() {
      if (this.newData.activity === ACTIVITY_TYPE.BREAK && this.hasInEntry) {
        const inEntry = this.$store.state.timeattendance.dailyTimeEntries.find(
          (entry) => entry.activity === ACTIVITY_TYPE.IN && entry.end
        );
        const inEntryStartTime = DateTime.fromISO(inEntry.start).toJSDate();
        const inEntryEndTime = DateTime.fromISO(inEntry.end).toJSDate();
        const breakStartTime = this.getDateFromTime(this.startTime);
        let breakEndTime = this.getDateFromTime(this.endTime);

        if (!isEndTimeOnSameDay(this.startTime, this.endTime)) {
          breakEndTime = this.addDayToDate(breakEndTime);
        }

        const isBreakWithinInEntry =
          breakStartTime > inEntryStartTime && breakEndTime < inEntryEndTime;
        if (!isBreakWithinInEntry) {
          this.$openPopupNotification({
            // text: "Break start time and end time must be within in entry start and end time",
            text: "Break must be within work entry time range",
            variant: "danger",
          });
          this.clearStartTime();
          this.clearEndTime();
          return false;
        }
      }

      if (
        this.newData.activity === ACTIVITY_TYPE.BREAK &&
        this.timer &&
        isToday(this.date)
      ) {
        const breakStartTime = DateTime.fromISO(this.startTime).toJSDate();
        const timerStartTime = DateTime.fromISO(this.timer.start).toJSDate();
        const isBreakAfterTimerStart = breakStartTime > timerStartTime;
        if (!isBreakAfterTimerStart) {
          this.$openPopupNotification({
            text: "Break start time cannot be before timer start time",
            variant: "danger",
          });
          this.clearStartTime();
          this.clearEndTime();
          return false;
        }
      }

      return true;
    },

    isStartValid() {
      if (!this.startTime) return false;
      // if (!this.validateStartIsBeforeBreak()) return false;
      return true;
    },
    isEntryValid() {
      if(!this.isSelectedTodayDate){
        const startAndTimeValid = this.startAndEndTimeValid();
        if (!startAndTimeValid) return false;
      }

      const isTotalTimeNegative = this.totalTimeInMinutes < 0;
      if (isTotalTimeNegative) return false;

      // if (this.isStartDateGreatherThanNow()) {
      //   this.startTime = undefined;
      //   return this.$openPopupNotification({
      //     text: "Start time cannot be greater than current time",
      //     variant: "danger",
      //   });
      // }

      // if (this.isEndDateGreatherThanNow()) {
      //   this.endTime = undefined;
      //   return this.$openPopupNotification({
      //     text: "End time cannot be greater than current time",
      //     variant: "danger",
      //   });
      // }

      // if (!this.validateBreakIsWithinWorkingHours()) return false;
      // if (!this.validateInEntryWithExistingBreak()) return false;

      return true;
    },
    async makeNewTimeEntry() {
      // we accept time entry with only start time when its for current day.
      if (isToday(this.date)) {
        if (!this.isStartValid()) {
          return;
        }
      } else {
        if (!this.isEntryValid()) {
          return;
        }
      }

      const { startDate, endDate, date } = this.calculateDates();
      try {
        const newEntry = await this.makeTimeEntry(
          this.newData.activity,
          date,
          startDate,
          endDate
        );

        if (newEntry) {
          this.$openPopupNotification({
            text: "Time entry added successfully",
            variant: "primary",
          });
          this.$emit("new-entry", newEntry);
        }
      } catch (error) {
        this.clearStartTime();
        this.clearEndTime();
      }
    },

    clearStartTime() {
      this.newData.startTime = null;
    },
    clearEndTime() {
      this.newData.endTime = null;
    },
    async deleteEntry() {
      this.$emit("delete-entry", this.newData.id);
    },

    async timeInputBlur() {
      this.loading = true;
      if (this.newData.id) {
        await this.editThisEntry();
      } else {
        await this.makeNewTimeEntry();
      }
      this.loading = false;
    },

    startAndEndTimeValid() {
      return this.startTime && this.endTime;
    },
  },

  watch: {
    entry: {
      handler(newEntry) {
        if (newEntry) {
          this.newData = { ...newEntry, startTime: null, endTime: null };
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
.activity {
  padding-left: 0.5rem !important;
  .icon {
    margin-right: -10px !important;
  }

}
.uneditable-cell {
  label {
    font-size: 14px !important;
    padding-left: 10px !important;
  }
}
.timepicker_input{
  input{
    margin-bottom: 12px !important;
    margin-top: 12px !important;
  }
}
</style>
