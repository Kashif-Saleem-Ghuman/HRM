<template>
  <div>
    <div v-if="newData.id" class="cell activity">{{ newData.activityTitle }}</div>
    <bib-button
      v-else
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
            @click="newDataTypeSelected(activityType.value)"
          >
            <span class="activity">{{ activityType.label }}</span>
          </li>
        </ul>
      </template>
    </bib-button>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.start"
        name="name"
        @change="newDataMutated"
        v-model="newData.start"
      ></bib-input>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.end"
        name="name"
        @change="newDataMutated"
        v-model="newData.end"
      ></bib-input>
    </div>
    <div class="cell">
      <div class="uneditable-cell">{{ entryTotal }}</div>
      <bib-button
        @click="buttonClicked"
        v-if="showEnterButton"
        :label="entry.id ? 'Edit' : 'Create'"
        variant="secondary"
      ></bib-button>
    </div>
  </div>
</template>
<script>
import { makeTimeEntry, editTimeEntry } from '../../../../../utils/functions/functions_lib_api';
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
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    newDataMutated() {
      this.mutated = true;
    },
    hoursAndMinutesToJSDate(hours, minutes) {
      return new Date(
        new Date(
          new Date(this.date).setHours(hours)
        ).setMinutes(minutes)
      );
    },
    calculateDates() {
      return {
        startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.start),
        ).toISOString(),
        endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.end),
        ).toISOString(),
        date: new Date(this.date).toISOString(),
      };
    },
    async editThisEntry() {
      if (!this.showEnterButton) {
        return alert('invalid activity');
      }
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
        activity: this.newData.activity,
      });
      if (editedEntry) {
        this.$emit('edit-entry', editedEntry);
      }
    },
    async makeNewTimeEntry() {
      if (!this.showEnterButton) {
        return alert('invalid activity');
      }
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
    newDataTypeSelected(typeLabel) {
      this.newData.activity = { ...this.activityTypes.find(({value}) => value === typeLabel) };
    },
    newDataTypeReset() {
      this.newData.activity.label = '';
      this.newData.activity.value = '';
    },
    buttonClicked() {
      if (this.newData.id) return this.editThisEntry()
      return this.makeNewTimeEntry()
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
    showEnterButton() {
      return this.timeEntryIsValid
        && this.totalTimeInMinutes > 0
        && this.mutated;
    }
  }
}
</script>