<template>
  <div v-click-outside="handleClickOutside">
    <bib-time-picker-wrapper
      v-if="edit"
      v-model="time"
      name="time"
      placeholder="--"
      class="timepicker_input"
      @input="handleTimeInput"
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
import { ACTIVITY_TYPE, FILL_WEEKLY_ENTRY_EVENT } from "@/utils/constant/Constant";
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
      if(!this.checkIsFutureDate()){
        this.edit = true;
      }
    },
    handleClickOutside() {
      this.edit = false;
    },
    handleTimeInput() {
      if (this.timeEntry) {
        this.editThisTimeEntry();
      }else {
        this.makeNewTimeEntry();
      }
    },
    checkIsFutureDate() {
      const now = DateTime.local().startOf('day');
      const dateRow = DateTime.fromFormat(this.date, 'yyyy-MM-dd').startOf('day');

      return !(now >= dateRow);
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
  },
};
</script>
<style lang="scss">
.timepicker_input{
  input{
    margin-bottom: 12px !important;
    margin-top: 12px !important;
  }
}
</style>