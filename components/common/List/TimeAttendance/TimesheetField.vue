<template>
  <div v-click-outside="handleClickOutside">
    <bib-time-picker-wrapper
      v-if="edit"
      v-model="time"
      @input="handleTimeInput"
      ref="timePicker"
    ></bib-time-picker-wrapper>
    <chips
      v-else
      @click.native="handleFieldClick"
      :title="value"
      class="w-100 m-0 align-center text-center justify-center"
      :className="[
        timeEntry
          ? 'chip-wrapper__bgsucess text-bold'
          : 'chip-wrapper__bggray disabled',
      ]"
    ></chips>
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
  hoursAndMinutesToJSDate,
} from "@/utils/functions/dates";
import { validateEntry } from "@/utils/timesheets/validators";
import { ACTIVITY_TYPE, FILL_WEEKLY_ENTRY_EVENT } from "@/utils/constant/Constant";
import { getTimeFromDate } from "@/utils/functions/dates";
import { getDateFromTime } from "@/utils/functions/time";
import { DateTime } from "luxon";
export default {
  props: {
    timeEntry: {
      type: Object,
    },
    value: {
      type: String,
    },
    date: {
      type: Date | String,
    },
    activity: {
      type: String,
    },
    data: {
      type: Object,
    },
  },
  data() {
    return {
      edit: false,
      time: null,
    };
  },
  methods: {
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    isActivityIn() {
      return this.activity === ACTIVITY_TYPE.IN;
    },
    isActivityOut() {
      return this.activity === ACTIVITY_TYPE.OUT;
    },
    handleFieldClick() {
      this.time = this.value ?? "00:00";
      this.edit = true;
    },
    handleClickOutside() {
      this.edit = false;
    },
    handleTimeInput(time) {
      console.log('time===', time, this.timeEntry);
      if (this.timeEntry) {
        this.editThisTimeEntry();
      }else {
        this.makeNewTimeEntry();
      }
    },
    
    async makeNewTimeEntry() {
        const { startDate, endDate, date } = this.calculateDates();
        
        try {
        const newEntry = await this.makeTimeEntry(
          ACTIVITY_TYPE.IN,
          date,
          startDate,
          endDate
        );

        console.log('newEntry===', newEntry);
        if (newEntry) {
          this.openPopupNotification({
            text: "Time entry added successfully",
            variant: "primary",
          });
        }
        await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      } catch (error) {
        console.log('error', error);
      }
    },
    async editThisTimeEntry() {

      const { startDate, endDate, date } = this.calculateDates();

      try {
        const editedEntry = await this.editTimeEntry({
          date,
          start: startDate,
          end: endDate,
          id: this.timeEntry.id,
          activity: ACTIVITY_TYPE.IN,
        });

        if (editedEntry) {
          this.openPopupNotification({
            text: "Time entry updated successfully",
            variant: "primary",
          });
          this.$emit("edit-entry", editedEntry);
        }
        await this.$nuxt.$emit(FILL_WEEKLY_ENTRY_EVENT);
      } catch (error) {
        console.log('error', error)
      }
    },

    calculateDates() {
      return {
        date: DateTime.fromJSDate(new Date(this.date)).toFormat("yyyy-MM-dd"),
        ...(this.isActivityIn() && {
            startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.time),
          this.date
        ).toISOString()}),

        ...(this.isActivityOut() && {
            endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.time),
          this.date
        ).toISOString()}),
      };
    },

    validateTimeEntryIn() {
      if (!this.isActivityIn() && !this.isActivityOut()) {
        throw new Error("This validation require activity to be in or out");
      }
      const { timeEntryBreak, timeEntryIn } = this.data;
      const { date, time } = this;
      const start = this.isActivityIn()
        ? this.time
        : getTimeFromDate(timeEntryIn.start);
      const end = this.isActivityIn()
        ? getTimeFromDate(timeEntryIn.end)
        : this.time;
      console.log({ time, date });
      const { valid, errors } = validateEntry({
        start,
        end,
        date,
        timeEntryIn: this.generateUpdatedTimeEntryIn(),
        timeEntryBreak,
      });
      if (valid) {
        //todo dispatch action, send api request to edit time entry
      }
    },
    generateUpdatedTimeEntryIn() {
      const { time, date } = this;
      const { timeEntryIn } = this.data;
      return {
        ...timeEntryIn,
        ...(this.isActivityIn() && {
          start: DateTime.fromJSDate(getDateFromTime({ time, date })).toISO(),
        }),
        ...(this.isActivityOut() && {
          end: DateTime.fromJSDate(getDateFromTime({ time, date })).toISO(),
        }),
      };
    },
  },
};
</script>
<style>
</style>