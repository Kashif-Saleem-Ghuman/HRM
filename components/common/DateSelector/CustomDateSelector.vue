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
        from: DateTime.utc(parseInt(this.year, 10)).startOf("year").minus({days: 1}).toISO(),
        to: DateTime.utc(parseInt(this.year, 10)).endOf("year").startOf('week').minus({days: 2}).toISO(),
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
      this.$emit("update:year", this.year);
      this.$emit("update:month", this.month);
      this.$emit("update:dates", val);
    },
  },
};
</script>

<style lang="scss">
.date-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  .button--dark:active,
      .button--dark:focus,
      .button--dark:focus-within {
        box-shadow: 0 var(--bib-secondary-sub2) !important;
      }
}
</style>
