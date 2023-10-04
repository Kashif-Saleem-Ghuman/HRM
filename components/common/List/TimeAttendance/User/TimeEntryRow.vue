<template>
  <div>
    <div v-if="newData.id" class="cell activity">{{ newData.activity.label }}</div>
    <div v-else class="cell activity">
      <bib-button
        dropdown=""
        :label="newData.activity.label || 'Select Activity Type'"
        v-model="newData.activity.label"
      >
        <template v-slot:menu>
          <ul>
            <li @click="newDataTypeReset">
              <span class="activity">{{ 'Select an activity type' }}</span>
            </li>
            <li
              v-for="activityType in activityTypes"
              :key="activityType.value"
              @click="newDataTypeSelected(activityType)"
            >
              <span class="activity">{{ activityType.label }}</span>
            </li>
          </ul>
        </template>
      </bib-button>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.start"
        name="name"
        @change="newDataMutated"
        v-model="newData.start"
        @blur="timeInputBlur"
      ></bib-input>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.end"
        name="name"
        @change="newDataMutated"
        v-model="newData.end"
        @blur="timeInputBlur"
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
      <bib-icon
        icon="trash-solid"
        :scale="1"
      ></bib-icon>
    </div>
  </div>
</template>
<script>
import {
  makeTimeEntry,
  editTimeEntry,
  deleteTimeEntry
} from '../../../../../utils/functions/functions_lib_api';
import {
  parseInputTimeIntoArray,
  numberToClockDigits,
  hoursAndMinutesToJSDate,
} from '../../../../../utils/functions/dates';

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
      newData: { ...this.entry },
      mutated: false,
      activityTypes: [
        { label: 'CLOCK-IN -> CLOCK-OUT', value: 'in' },
        { label: 'BREAK', value: 'break' },
      ],
    };
  },
  methods: {
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    newDataMutated() {
      this.mutated = true;
    },
    calculateDates() {
      return {
        startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.start),
          this.date,
        ).toISOString(),
        endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.end),
          this.date,
        ).toISOString(),
        date: new Date(this.date).toISOString(),
      };
    },
    async editThisEntry() {
      if (this.totalTimeInMinutes < 0) {
        return alert('end date should be greater than start date');
      }
      if (!this.timeEntryReady) return;
      const {
        startDate,
        endDate,
        date,
      } = this.calculateDates()
      const editedEntry = await this.editTimeEntry({
        date,
        start: startDate,
        end: endDate,
        id: this.entry.id,
        activity: this.newData.activity.value,
      });
      if (editedEntry) {
        this.$emit('edit-entry', editedEntry);
      }
    },
    async makeNewTimeEntry() {
      if (this.totalTimeInMinutes < 0) {
        return alert('end date should be greater than start date');
      }
      if (!this.timeEntryReady) return;
      const {
        startDate,
        endDate,
        date,
      } = this.calculateDates()
      const newEntry = await this.makeTimeEntry(
        this.newData.activity.value,
        date,
        startDate,
        endDate,
      );
      if (newEntry) {
        this.$emit('new-entry', newEntry);
        this.clearData()
      }
    },
    async deleteEntry() {
      const response = await this.deleteTimeEntry(this.newData.id);
      if (response) {
        this.$emit('delete-entry', this.newData.id);
      }
    },
    newDataTypeSelected(activity) {
      this.newData.activity = activity;
      if (this.timeEntryReady) {
        this.makeNewTimeEntry();
      }
    },
    newDataTypeReset() {
      this.newData.activity.label = '';
      this.newData.activity.value = '';
    },
    buttonClicked() {
      if (this.newData.id) return this.editThisEntry()
      return this.makeNewTimeEntry()
    },
    timeInputBlur() {
      if (this.newData.id) {
        this.editThisEntry();
      } else {
        this.makeNewTimeEntry();
      }
    },
    clearData() {
      this.newData = {
        activity: { label: '', value: '' },
        start: null,
        end: null,
      };
    },
  },
  computed: {
    timeEntryIsValid() {
      return this.newData.start && this.newData.end;
    },
    totalTimeInMinutes() {
      let endHours, endMinutes, startHours, startMinutes;
      try {
        [endHours, endMinutes] = this.parseInputTimeIntoArray(this.newData.end);
        [startHours, startMinutes] = this.parseInputTimeIntoArray(this.newData.start);
      } catch(error) {
        return error.message;
      }
      return ((endHours - startHours) * 60) + (endMinutes - startMinutes);
    },
    entryTotal() {
      if (this.newData.total && !this.mutated) return this.newData.total;
      if (!this.timeEntryIsValid) return '--:--'
      if (this.totalTimeInMinutes <= 0) return 'Invalid Input';
      const totalHours = Math.floor(this.totalTimeInMinutes / 60);
      const totalMinutes = this.totalTimeInMinutes - totalHours * 60;
      return `${this.numberToClockDigits(totalHours)}:${this.numberToClockDigits(totalMinutes)}`;
    },
    timeEntryReady() {
      return this.timeEntryIsValid
        && this.totalTimeInMinutes > 0
        && this.newData.activity.value
        && this.mutated;
    }
  }
}
</script>