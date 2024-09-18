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
      this.$emit('onInput', this.calculateDates(), this.activity, this.timeEntry);
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

    calculateDates() {
      return {
        date: this.date,
        ...(this.isActivityIn() && {
          startDate: DateTime.fromFormat(`${this.date} ${this.time}`, 'yyyy-MM-dd HH:mm').toUTC().toISO()
        }),

        ...(this.isActivityOut() && {
          endDate: DateTime.fromFormat(`${this.date} ${this.time}`, 'yyyy-MM-dd HH:mm').toUTC().toISO()
        }),
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