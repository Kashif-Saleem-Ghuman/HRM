<template>
  <div>
    <div class="table">
      <div class="thead row">
        <div class="cell">New Activity</div>
        <div class="cell">Start</div>
        <div class="cell">End</div>
        <div class="cell">Total</div>
      </div>
      <div v-for="activity in listToday" :key="activity.id" class="row">
        <div class="cell activity">{{ activity.activityTitle }}</div>
        <div class="cell">
          <bib-input
            type="time"
            :value="activity.start"
            name="name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="time"
            :value="activity.end"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell"><div class="uneditable-cell">{{ activity.total }}</div></div>
      </div>
      <div class="row" @keyup.enter="makeNewTimeEntry">
        <div class="cell activity">
          <bib-button
            dropdown=""
            :label="newActivity.activity.label || 'Select Activity Type'"
            v-model="newActivity.activity.label"
          >
            <template v-slot:menu>
              <ul>
                <li @click="newActivityTypeReset">
                  <span class="activity">{{ 'Select an activity type' }}</span>
                </li>
                <li
                  v-for="activityType in activityTypes"
                  :key="activityType.value"
                  @click="newActivityTypeSelected(activityType.value)"
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
            :value="newActivity.start || 'start'"
            name="start"
            v-model="newActivity.start"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="time"
            :value="newActivity.end || 'end'"
            name="end"
            v-model="newActivity.end"
          ></bib-input>
        </div>
        <div class="cell">
          <div class="uneditable-cell">{{ newActivityTotal }}</div>
          <bib-button @click="makeNewTimeEntry" v-if="timeEntryIsValid" label="Enter" variant="secondary"></bib-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { makeTimeEntry } from '../../../../../utils/functions/functions_lib_api';
import { getTimeFromDate, getDateDiffInHHMM } from '../../../../../utils/functions/dates';
import { ACTIVITY_DICTIONARY } from '../../../../../utils/constant/TimesheetData';

export default {
  props: {
    listToday: {
      type: Array,
      default: [],
    },
    date: {
      type: Date,
      required: true,
    },
  },
  data() {
    return {
      activityTypes: [
        { label: 'CLOCK-IN -> CLOCK-OUT', value: 'in' },
        { label: 'BREAK', value: 'break' },
      ],
      newActivity: {
        activity: { label: '', value: '' },
        start: null,
        end: null,
      },
      ACTIVITY_DICTIONARY,
    }
  },
  methods: {
    makeTimeEntry,
    getTimeFromDate,
    getDateDiffInHHMM,
    newActivityTypeSelected(typeLabel) {
      this.newActivity.activity = {...this.activityTypes.find(({value}) => value === typeLabel)};
    },
    newActivityTypeReset() {
      this.newActivity.activity.label = '';
      this.newActivity.activity.value = '';
    },
    parseInputTimeIntoArray(timeInput) {
      const [hours, minutes] = timeInput.trim().split(/\s*:\s*/).map(Number);
      if (
        (hours || hours === 0)
        && (minutes || minutes === 0)
        && hours < 24
        && hours >= 0
        && minutes < 60
        && minutes >=0
        && hours === Math.floor(hours)
        && minutes === Math.floor(minutes)
      ) {
        return [hours, minutes];
      }
      throw new Error('Invalid Input');
    },
    numberToClockDigits(number) {
      return `${number < 10 ? '0' : ''}${number}`
    },
    hoursAndMinutesToJSDate(hours, minutes) {
      return new Date(
        new Date(
          new Date(this.date).setHours(hours)
        ).setMinutes(minutes)
      );
    },
    newActivityReset() {
      this.newActivity = {
        activity: { label: '', value: '' },
        start: null,
        end: null,
      };
    },
    async makeNewTimeEntry() {
      if (['Invalid Input', '--:--'].includes(this.newActivityTotal)
        || !this.newActivity.activity.label
      ) {
        return alert('invalid activity');
      }
      const startDate = this.hoursAndMinutesToJSDate(
        ...this.parseInputTimeIntoArray(this.newActivity.start),
      );
      const endDate = this.hoursAndMinutesToJSDate(
        ...this.parseInputTimeIntoArray(this.newActivity.end),
      );
      const newEntry = await this.makeTimeEntry(
        this.newActivity.activity.value,
        new Date(this.date).toISOString(),
        startDate.toISOString(),
        endDate.toISOString(),
      );
      if (newEntry) {
        this.$emit('new-entry', newEntry);
        this.newActivityReset()
      }
    }
  },
  computed: {
    newActivityTotal() {
      if (!this.timeEntryIsValid) return '--:--'
      let endHours, endMinutes, startHours, startMinutes;
      try {
        [endHours, endMinutes] = this.parseInputTimeIntoArray(this.newActivity.end);
        [startHours, startMinutes] = this.parseInputTimeIntoArray(this.newActivity.start);
      } catch(error) {
        return error.message;
      }
      const totalTimeInMinutes = ((endHours - startHours) * 60) + (endMinutes - startMinutes);
      if (totalTimeInMinutes < 0) return 'Invalid Input';
      const totalHours = Math.floor(totalTimeInMinutes / 60);
      const totalMinutes = totalTimeInMinutes - totalHours * 60;
      return `${this.numberToClockDigits(totalHours)}:${this.numberToClockDigits(totalMinutes)}`;
    },
    timeEntryIsValid() {
      return this.newActivity.start && this.newActivity.end;
    }
  }
};
</script>

<style lang="scss" scoped>
.table {
  display: table;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  .row {
    display: table-row;
  }
  .cell {
    display: table-cell;
    border-bottom: 1px solid $gray3;
    border-right: 1px solid $gray3;
    text-align: center;
    padding: 0px 10px;
  }
  .activity {
    font-size: 14px;
    font-weight: 600;
  }
  .thead {
    display: table-row;
    color: $gray5;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border-top: 1px solid $gray3;
    border-collapse: collapse;
    .cell {
      padding: 10px;
    }
  }
}
</style>
