<template>
  <div class="date-selector">
    <span>View:</span>
    <YearButton :disable="isYearDisabled" :value.sync="year" />
    <MonthButton
      :disable="isMonthDisabled"
      :disabled.sync="isMonthDisabled"
      :value.sync="month"
      :year="year"
    />
  </div>
</template>

<script>
import { DateTime } from "luxon";
export default {

  props: {
    isYearDisabled: {
      type: Boolean,
      default: false,
    },
    isMonthDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
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
