<template>
  <div class="week-date-picker">
    <div class="pickers">
      <div class="picker mr-05">
        <label for="start-date">From</label>
        <bib-datetime-picker
          v-model="from"
          placeholder="Choose Start Of Week Date"
          :maxDate="maxDate"
          @input="onDateChange"
          size="sm"
          icon=""
          :variant="this.isLightThemeCheck ? 'light' : 'dark'"
          hide-quick-select
          v-bind="{ ...getDatetimeCommonProps() }"
        ></bib-datetime-picker>
      </div>
      <div class="picker" id="to-date">
        <label for="end-date">To</label>
        <bib-datetime-picker
          v-model="to"
          :disabled="true"
          size="sm"
          hide-quick-select
          v-bind="{ ...getDatetimeCommonProps() }"
          :variant="this.isLightThemeCheck ? 'light' : 'dark'"
        ></bib-datetime-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import {getWeekEnd, getWeekStart, getWeekStartEndDates} from "../../../utils/functions/dates";
import { getDatetimeCommonProps, DATETIME_FORMAT } from "../../../utils/functions/datetime-input";
import {USER_WEEK_VIEW_PATH} from "@/utils/constant/routes";

export default {
  data() {
    return {
      from: "",
      to: "",
      maxDate: DateTime.now().toISO()
    };
  },
  props: {
    dates: {
      type: Object,
    }
  },
  methods: {
    getDatetimeCommonProps,
    onDateChange(value) {
      //When user clicks X button
      this.$emit('onChange');
      if (!this.from) {
       return  this.setCurrentWeek()
      }

      const { from, to } = getWeekStartEndDates(
        DateTime.fromFormat(value, DATETIME_FORMAT).toUTC().toISO()
      );
      this.from = DateTime.fromISO(from).toFormat(DATETIME_FORMAT)
      this.to = DateTime.fromISO(to).toFormat(DATETIME_FORMAT)
      this.$emit("update:dates", {
        from, to
      });
      this.$emit("close")
    },

    setCurrentWeek(date = null) {
      const now = date ? DateTime.fromFormat(date, 'yyyy-MM-dd').toUTC().toISO() : DateTime.now().toISO();
      const { from, to } = getWeekStartEndDates(now);
      this.from = DateTime.fromISO(from).toFormat(DATETIME_FORMAT)
      this.to = DateTime.fromISO(to).toFormat(DATETIME_FORMAT);

      this.$emit("update:dates", {
        from, to
      });
      
      this.$emit("close")
    },

    setWeekFromDates(dates) {
      const { from, to } = getWeekStartEndDates(dates.from);

      this.from = DateTime.fromISO(from).toFormat(DATETIME_FORMAT)
      this.to = DateTime.fromISO(to).toFormat(DATETIME_FORMAT);

      this.$emit("update:dates", {
        from, to
      });
    },

    setToPreviousDates() {
      this.from = this.previousFrom;
      this.to = this.previousTo;
    },
    formatDatesToStartEndDayUTC(from, to) {
      return  {
        from: DateTime.fromISO(from).startOf("day").toUTC().toISO(),
        to: DateTime.fromISO(to).endOf("day").toUTC().toISO(),
      };
    },
    isPropsDatesSet(dates) {
      return dates.from && dates.to;
    },
  },

  created() {
    const path = this.$router.history.current.fullPath;
    if(path.startsWith(USER_WEEK_VIEW_PATH)){
      const date = path.split("=")[2]
      this.setCurrentWeek(date);
    }else {
      this.isPropsDatesSet(this.dates) ? this.setWeekFromDates(this.dates) : this.setCurrentWeek();
    }

  },
};
</script>

<style lang="scss" scoped>

#to-date * {
  //because :disabled props doesn't work on bib-datetime-picker
  pointer-events: none;
}

.pickers {
  display: flex;
  justify-content: center;
  .vdpComponent__input{
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
