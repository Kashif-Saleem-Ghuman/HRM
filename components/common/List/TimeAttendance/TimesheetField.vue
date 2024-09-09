<template>
  <div @click="handleWrapperClick">
    <bib-time-picker-wrapper
      v-model="time"
      name="time"
      placeholder="--"
      class="text-dark font-w-600"
      :disabled="disabled"
      @input="handleTimeInput"
    ></bib-time-picker-wrapper>
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
  hoursAndMinutesToJSDate, isSameDate, getTimeFromDate,
} from "@/utils/functions/dates";
import {ACTIVITY_TYPE, EDIT_TIME_ENTRY_WARNING_MESSAGE, FILL_WEEKLY_ENTRY_EVENT} from "@/utils/constant/Constant";
import { DateTime } from "luxon";
import {mapGetters} from "vuex";
import {isEndTimeOnSameDay} from "@/utils/functions/time";
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
    status: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      time: '00:00',
    };
  },
  computed: {
    ...mapGetters({
      getTimerData: "timeattendance/getTimerData",
    }),
    isTimerActive() {
      return this.getTimerData?.active || false;
    },
    disabled() {
      const now = DateTime.local().startOf('day');
      const dateRow = DateTime.fromFormat(this.date, 'yyyy-MM-dd').startOf('day');

      return !(now >= dateRow) || this.status === 'approved' || this.$store.state.token.isAdmin || this.disabledRow;
    },

    disabledRow() {
      return this.isTimerActive && isSameDate(new Date(), new Date(this.date));
    },
    startTime() {
      if(this.timeEntry) {
        return getTimeFromDate(this.timeEntry.start);
      }
    },
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
    handleTimeInput() {
      if(this.isActivityOut() && !this.startTime){
        return;
      }
      if (this.timeEntry) {
        this.editThisTimeEntry();
      }else {
        this.makeNewTimeEntry();
      }
    },


    handleWrapperClick() {
      if (this.disabledRow){
        this.debouncedNotification();
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

    getEndDate(startTime, endTime) {
      if (!isEndTimeOnSameDay(startTime, endTime)) {
        return DateTime.fromJSDate(new Date(this.date)).plus({ day: 1 }).toJSDate();
      }
      return this.date;
    },

    calculateDates() {
      return {
        date: this.date,
        ...(this.isActivityIn() && {
            startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.time),
          this.date
        ).toISOString()}),

        ...(this.isActivityOut() && {
            endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.time),
          this.getEndDate(this.startTime, this.time),
        ).toISOString()}),
      };
    },
  },
  mounted() {
    this.time = this.value ?? "00:00";
  },

  watch: {
    value (val) {
      this.time = val ?? "00:00";
    }
  },

};
</script>