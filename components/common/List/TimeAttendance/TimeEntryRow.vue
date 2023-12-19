<template>
  <div>
    <div class="cell activity">{{ label }}</div>
    <div class="cell">
      <bib-input
        type="time"
        name="name"
        v-model="startTime"
        @blur="timeInputBlur"
        :step="60"
      ></bib-input>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        name="name"
        v-model="endTime"
        @blur="timeInputBlur"
        :step="60"
      ></bib-input>
    </div>
    <div class="cell">
      <div class="uneditable-cell">{{ entryTotal }}</div>
    </div>
    <div
      class="cell cursor-pointer trash"
      v-if="newData.id"
      @click="deleteEntry"
    >
      <bib-icon icon="trash-solid" :scale="1"></bib-icon>
    </div>
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
  hoursAndMinutesToJSDate,
} from "@/utils/functions/dates";
import { DateTime } from "luxon";
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
import { getTimeFromDate } from "../../../../utils/functions/dates";
import {
  calculateTimeDifferenceInHHMM,
  calculateTimeDifferenceInMinutes,
  isEndTimeOnSameDay,
} from "../../../../utils/functions/time";
export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      newData: { ...this.entry, startTime: null, endTime: null },
    };
  },

  computed: {
    startTime: {
      get() {
        if (this.newData?.startTime) return this.newData?.startTime;
        if (this.newData.start) return getTimeFromDate(this.newData.start);
      },
      set(time) {
        this.newData.startTime = time;
      },
    },
    endTime: {
      get() {
        if (this.newData?.endTime) return this.newData?.endTime;
        if (this.newData.end) return getTimeFromDate(this.newData.end);
      },
      set(time) {
        this.newData.endTime = time;
      },
    },
    label() {
      return ACTIVITY_DICTIONARY[this.newData.activity];
    },

    totalTimeInMinutes() {
      if (!this.startTime || !this.endTime) return "";
      return calculateTimeDifferenceInMinutes(this.startTime, this.endTime);
    },
    entryTotal() {
      if (!this.startTime || !this.endTime) return "";
      return calculateTimeDifferenceInHHMM(this.startTime, this.endTime);
    },
  },

  methods: {
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    getTimeFromDate,

    getEndDate(startTime, endTime) {
      if(!isEndTimeOnSameDay(startTime, endTime)) {
        return DateTime.fromJSDate(this.date).plus({ day: 1 }).toJSDate()
      }
      return this.date
    },
    calculateDates() {
      return {
        startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.startTime),
          this.date
        ).toISOString(),
        endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.endTime),
          this.getEndDate(this.startTime, this.endTime),
        ).toISOString(),
        date: new Date(this.date).toISOString(),
      };
    },
    async editThisEntry() {
      if (!this.isEntryValid()) return;

      const { startDate, endDate, date } = this.calculateDates();

      try {
        const editedEntry = await this.editTimeEntry({
          date,
          start: startDate,
          end: endDate,
          id: this.entry.id,
          activity: this.newData.activity,
        });

        if (editedEntry) {
          this.$emit("edit-entry", editedEntry);
        }
      } catch (error) {
        this.clearStartTime();
        this.clearEndTime();
      }
    },
    isEndDateGreatherThanNow() {
      const [hours, minutes, seconds] = this.endTime
        .split(":")
        .map(Number);

      let date = DateTime.fromJSDate(this.date)
        .set({ hours, minutes, seconds })
    
      if (!isEndTimeOnSameDay(this.startTime, this.endTime)) {
        date = date.plus({ day: 1 })
      }
      
      date = date.toJSDate()

      const now = new Date();
      return date > now;
    },

    isEntryValid() {
      const startAndTimeValid = this.startAndEndTimeValid();
      if (!startAndTimeValid) return false;

      const isTotalTimeNegative = this.totalTimeInMinutes < 0;
      if (isTotalTimeNegative) return false;

      if (this.isEndDateGreatherThanNow()) {
        alert("end time cannot be greater than current time");
        this.endTime = undefined;
        return false;
      }

      return true;
    },
    async makeNewTimeEntry() {
      if (!this.isEntryValid()) return;

      const { startDate, endDate, date } = this.calculateDates();
      try {
        const newEntry = await this.makeTimeEntry(
        this.newData.activity,
        date,
        startDate,
        endDate
      );

      if (newEntry) {
        this.$emit("new-entry", newEntry);
      }

      } catch (error) {
        this.clearStartTime();
        this.clearEndTime();
      }
    },

    clearStartTime() {
      this.newData.startTime = null;
    },
    clearEndTime() {
      this.newData.endTime = null;
    },
    async deleteEntry() {
      const response = await this.deleteTimeEntry(this.newData.id);
      if (response) {
        this.$emit("delete-entry", this.newData.id);
      }
    },

    timeInputBlur() {
      if (this.newData.id) {
        this.editThisEntry();
      } else {
        this.makeNewTimeEntry();
      }
    },

    startAndEndTimeValid() {
      return this.startTime && this.endTime;
    },
  },

  watch: {
    entry: {
      handler(newEntry) {
        if (newEntry) {
          this.newData = { ...newEntry, startTime: null, endTime: null };
        }
      },
      immediate: true,
    },
  },
};
</script>
<style lang="scss">
.activity-wrapper {
  .icon {
    margin-right: -10px !important;
  }
}
</style>