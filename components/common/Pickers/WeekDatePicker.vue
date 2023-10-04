<template>
  <div class="week-date-picker">
    <div class="pickers">
      <div class="picker">
        <label for="start-date">From</label>
        <bib-datetime-picker
          v-model="from"
          placeholder="Choose Start Of Week Date"
          :maxDate="maxDate"
          @input="onDateChange"
          size="sm"
          icon=""
          style="width: 100%;"
        ></bib-datetime-picker>
      </div>
      <div class="picker" id="to-date">
        <label for="end-date">To</label>
        <bib-datetime-picker v-model="to" :disabled="true" size="sm"  style="width: 100%;"></bib-datetime-picker>
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
      maxDate: DateTime.now().toISO()
    };
  },

  methods: {
    onDateChange(value) {
      //When user clicks X button
      if (!this.from) {
       return  this.setCurrentWeek()
      }

      const { from, to } = getWeekStartEndDates(
        DateTime.fromISO(value).toUTC().toISO()
      );
      this.from = DateTime.fromISO(from).toFormat("yyyy-MM-dd")
      this.to = DateTime.fromISO(to).toFormat("yyyy-MM-dd")
      this.$emit("update:dates", {
        ...this.formatDatesToStartEndDayUTC(this.from, this.to),
      });
      this.$emit("close")
    },

    setCurrentWeek() {
      const now = DateTime.now().toISO();
      const { from, to } = getWeekStartEndDates(now);
      this.from = DateTime.fromISO(from).toFormat("yyyy-MM-dd")
      this.to = DateTime.fromISO(to).toFormat("yyyy-MM-dd");

      this.$emit("update:dates", {
        ...this.formatDatesToStartEndDayUTC(this.from, this.to),
      });
      this.$emit("close")
    },
    setToPreviousDates() {
      this.from = this.previousFrom;
      this.to = this.previousTo;
    },
    formatDatesToStartEndDayUTC(from, to) {
      return  {
        from: DateTime.fromISO(from).toUTC().startOf("day").toISO(),
        to: DateTime.fromISO(to).toUTC().endOf("day").toISO(),
      };
    },
  },

  created() {
    this.setCurrentWeek();
  },
};
</script>

<style lang="scss">

#to-date * {
  //because :disabled props doesn't work on bib-datetime-picker
  pointer-events: none;
}

.pickers {
  display: flex;
  .picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 0.5rem;
    width: 250px;
    label {
      color: #b1b1b4;
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
