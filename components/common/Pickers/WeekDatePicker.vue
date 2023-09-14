<template>
  <div class="week-date-picker">
    <div class="pickers">
      <div class="picker">
        <label for="start-date">From</label>
        <bib-datepicker
          v-model="from"
          placeholder="Choose Start Of Week Date"
          @input="onDateChange"
        ></bib-datepicker>
      </div>
      <div class="picker">
        <label for="end-date">To</label>
        <bib-datepicker v-model="to" :disabled="true"></bib-datepicker>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { getWeekStartEndDates } from "../../../utils/functions/dates";

export default {
  data() {
    return {
      from: "",
      to: "",
    };
  },

  methods: {
    onDateChange() {
      //When user clicks X button
      if (!this.from) {
        this.setCurrentWeek()
      }

      const { from, to } = getWeekStartEndDates(
        DateTime.fromJSDate(this.from).toISO()
      );
      this.from = DateTime.fromISO(from).toJSDate();
      this.to = DateTime.fromISO(to).toJSDate();
      this.$emit("update:dates", {
        ...this.formatDatesToStartEndDayUTC(this.from, this.to),
      });
    },

    setCurrentWeek() {
      const now = DateTime.now().toISO();
      const { from, to } = getWeekStartEndDates(now);
      this.from = DateTime.fromISO(from).toJSDate();
      this.to = DateTime.fromISO(to).toJSDate();
      this.$emit("update:dates", {
        ...this.formatDatesToStartEndDayUTC(this.from, this.to),
      });
    },
    setToPreviousDates() {
      this.from = this.previousFrom;
      this.to = this.previousTo;
    },
    formatDatesToStartEndDayUTC(from, to) {
      return {
        from: DateTime.utc(this.from).startOf("day").toUTC(),
        to: DateTime.utc(this.to).endOf("day").toUTC(),
      };
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
