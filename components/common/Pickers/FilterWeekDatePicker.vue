<template>
  <div class="week-date-picker">
    <div class="pickers">
      <div class="picker mr-05">
        <label for="start-date">From</label>
        <bib-datetime-picker
          v-model="from"
          placeholder="Choose Start Of Week Date"
          @input="onFromDateChange"
          :maxDate="maxDate"
          size="sm"
          icon=""
          hide-quick-select
          v-bind="{ ...getDatetimeCommonProps() }"
        ></bib-datetime-picker>
      </div>
      <div class="picker" id="to-date">
        <label for="end-date">To</label>
        <bib-datetime-picker
          v-model="to"
          placeholder="Choose End Of Week Date"
          @input="onToDateChange"
          :maxDate="maxDate"
          size="sm"
          icon=""
          v-bind="{ ...getDatetimeCommonProps() }"
          hide-quick-select
        ></bib-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import {
  getWeekEnd,
  getWeekStart,
  getWeekStartEndDates,
} from "../../../utils/functions/dates";
import {
  getDatetimeCommonProps,
  DATETIME_FORMAT,
} from "../../../utils/functions/datetime-input";
import { USER_WEEK_VIEW_PATH } from "@/utils/constant/routes";

const FILTER_WEEK_DATE_OVERLAP_MESSAGE = {
  text: "The Start date cannot be greater than end date",
  variant: "danger",
};
export default {
  props: {
    filterDate: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      from: "",
      to: "",
      maxDate: DateTime.now().toISO(),
      minDate: DateTime.now().toISO(),
    };
  },

  methods: {
    getDatetimeCommonProps,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    parseDate(dateStr) {
      let date = DateTime.fromISO(dateStr);
      if (!date.isValid) {
        date = DateTime.fromFormat(dateStr, "dd-MMM-yyyy");
      }
      return date;
    },
    isWeekDatesOverlap(from, to) {
      return this.parseDate(from) > this.parseDate(to);
    },
    onFromDateChange(value) {
      //When user clicks X button
      if (!this.from) {
        this.$emit("onClose");
        return this.setDefaultWeek(this.filterDate);
      }
      if (this.isWeekDatesOverlap(value, this.to)) {
        return this.$openPopupNotification(FILTER_WEEK_DATE_OVERLAP_MESSAGE);
      }
      const from = getWeekStart(
        DateTime.fromFormat(value, DATETIME_FORMAT).toUTC().toISO()
      );
      this.from = DateTime.fromISO(from).toFormat(DATETIME_FORMAT);

      this.$emit("update:dates", {
        from,
        to: this.to,
      });
      this.$emit("close");
    },
    onToDateChange(value) {
      //When user clicks X button
      if (!this.to) {
        this.$emit("onClose");
        return this.setDefaultWeek(this.filterDate);
      }
      if (this.isWeekDatesOverlap(this.from, value)) {
        return this.$openPopupNotification(FILTER_WEEK_DATE_OVERLAP_MESSAGE);
      }
      const to = getWeekEnd(
        DateTime.fromFormat(value, DATETIME_FORMAT).toUTC().toISO()
      );
      this.to = DateTime.fromISO(to).toFormat(DATETIME_FORMAT);

      this.$emit("update:dates", {
        from: this.from,
        to,
      });
      this.$emit("close");
    },

    setDefaultWeek(dates) {
      this.from = DateTime.fromISO(dates.from).toFormat(DATETIME_FORMAT);
      this.minDate = DateTime.fromISO(dates.from).toISO();

      const now = DateTime.now();
      const toDate = DateTime.fromISO(dates.to);
      if (toDate <= now) {
        this.maxDate = getWeekEnd(DateTime.fromISO(now).toUTC().toISO());
        this.to = DateTime.fromISO(dates.to).toFormat(DATETIME_FORMAT);
      } else {
        this.maxDate = getWeekEnd(DateTime.fromISO(now).toUTC().toISO());
        let to = getWeekEnd(DateTime.fromISO(now).toUTC().toISO());
        this.to = DateTime.fromISO(to).toFormat(DATETIME_FORMAT);
      }
    },

    setToPreviousDates() {
      this.from = this.previousFrom;
      this.to = this.previousTo;
    },
    formatDatesToStartEndDayUTC(from, to) {
      return {
        from: DateTime.fromISO(from).startOf("day").toUTC().toISO(),
        to: DateTime.fromISO(to).endOf("day").toUTC().toISO(),
      };
    },
  },

  created() {
    this.setDefaultWeek(this.filterDate);
  },
  watch: {
    filterDate(newVal) {
      this.setDefaultWeek(newVal);
    },
  },
};
</script>

<style lang="scss" scoped>
.pickers {
  display: flex;
  justify-content: center;
  .vdpComponent__input {
    border: 1px solid $gray4 !important;
    min-width: 180px !important;
  }
  .vdpComponent__input:hover {
    border-color: var(--bib-gray6) !important;
  }
  .picker {
    padding-right: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    label {
      color: $secondary-sub1;
      padding-right: 0.5rem;
    }
  }
}

.week-date-picker {
  .bib-datepicker .bib-datepicker__close-icon {
    display: none;
  }
}
</style>
