<template>
  <div class="week-date-picker">
    <div class="pickers">
      <div class="picker">
        <label for="start-date">From</label>
        <input
          type="date"
          id="from-date"
          v-model="from"
          @change="onDateChange"
        />
      </div>
      <div class="picker">
        <label for="end-date">To</label>
        <input type="date" id="to-date" v-model="to" disabled="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import {
  getWeekStartEndDates,
  isDateOnSunday,
} from "../../../utils/functions/dates";

export default {
  data() {
    return {
      from: "",
      to: "",
      previousFrom: "",
      previousTo: "",
    };
  },

  methods: {
    onDateChange() {
      console.log("cjange?");
      if (!isDateOnSunday(this.from)) {
        alert("Please select a date where the week starts on a Sunday.");
        this.setToPreviousDates();
      }

      const { to } = getWeekStartEndDates(this.from);
      this.to = DateTime.fromISO(to).toFormat("yyyy-MM-dd");

      this.previousFrom = this.from;
      this.previousTo = this.to;
      this.$emit("update:dates", { from: this.from, to: this.to });
    },
    setCurrentWeek() {
      const now = DateTime.now().toISO();
      const { from, to } = getWeekStartEndDates(now);
      this.from = DateTime.fromISO(from).toFormat("yyyy-MM-dd");
      this.to = DateTime.fromISO(to).toFormat("yyyy-MM-dd");
      this.previousFrom = this.from;
      this.previousTo = this.to;
      this.$emit("update:dates", { from: this.from, to: this.to });
    },
    setToPreviousDates() {
      this.from = this.previousFrom;
      this.to = this.previousTo;
    },
  },

  created() {
    this.setCurrentWeek();
  },
};
</script>

<style lang="scss" scoped>
.pickers {
  display: flex;
  gap: 1vw;
  .picker {
    display: flex;
    flex-direction: column;

    label {
      color: #b1b1b4;
    }
  }
}
</style>
