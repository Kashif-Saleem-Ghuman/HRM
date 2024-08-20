<template>
  <div class="date-selector">
    <CustomYearButton :isDisabled="isYearDisabled" :value.sync="year" />
    <CustomMonthButton
      :isDisabled="isMonthDisabled"
      :disabled.sync="isMonthDisabled"
      :value.sync="month"
      :year="year"
      :showFullYearList="showFullYearList"
      :monthPickerDisabled="monthPickerDisabled"
    />
  </div>
</template>

<script>
import { DateTime } from "luxon";
import {MONTH_SELECTOR_DEFAULT} from "@/utils/constant/Constant";
export default {
  props: {
    monthPickerDisabled: {
      type: Boolean,
      default: false,
    },
    showFullYearList: {
      type: Boolean,
      default: false,
    },
  },
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
      if (this.isMonthDisabled || this.month === MONTH_SELECTOR_DEFAULT.value) {
        return this.generateYearDates();
      }
      return this.generateMonthDates();
    },
  },
  methods: {
    generateYearDates() {
      return {
        from: DateTime.utc(this.year).startOf("year").minus({days: 1}).toISO(),
        to: DateTime.utc(this.year).endOf("year").startOf('week').minus({days: 2}).toISO(),
      };
    },
    generateMonthDates() {
      return {
        from: DateTime.utc(this.year, Number(this.month))
          .startOf("month").startOf('week').minus({days: 1})
          .toISO(),
        to: DateTime.utc(this.year, Number(this.month)).endOf("month").endOf('week').minus({days: 2}).toISO(),
      };
    },
  },
  watch: {
    dates(val) {
      this.$emit("update:year", this.year);
      this.$emit("update:month", this.month);
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
