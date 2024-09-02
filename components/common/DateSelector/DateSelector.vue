<template>
  <div class="date-selector">
    <span>View:</span>
    <YearButton :isDisabled="isYearDisabled" :value.sync="year" />
    <MonthButton
      :isDisabled="isMonthDisabled"
      :disabled.sync="isMonthDisabled"
      :value.sync="month"
      :year="year"
    />
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {
  data() {
    return {
      isYearDisabled: false,
      isMonthDisabled: false,
      isWeekDisabled: false,
      isDayDisabled: false,
      year: null,
      month: null,
    };
  },
  computed: {
    dates() {
      if (!this.year) return { from: null, to: null };

      if (this.isMonthDisabled) {
        return this.generateYearDates();
      }
      return this.generateMonthDates();
    },
  },
  methods: {
    generateYearDates() {
      return {
        from: DateTime.utc(parseInt(this.year, 10)).startOf("year").toISO(),
        to: DateTime.utc(parseInt(this.year, 10)).endOf("year").toISO(),
      };
    },
    generateMonthDates() {
      return {
        from: DateTime.utc(parseInt(this.year, 10), Number(this.month))
          .startOf("month")
          .toISO(),
        to: DateTime.utc(parseInt(this.year, 10), Number(this.month)).endOf("month").toISO(),
      };
    },
  },
  watch: {
    dates(val) {
      this.$emit("update:dates", val);
    },
  },
};
</script>

<style>
.date-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
