<template>
  <div>
    <div class="table">
      <div class="table__thead">
        <div class="cell checkbox">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell">New Activity</div>
        <div class="cell">Start</div>
        <div class="cell">End</div>
        <div class="cell">Total</div>
      </div>
      <div v-for="activity in listToday" :key="activity.id" class="row">
        <div class="cell checkbox">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell">{{ activity.activityTitle }}</div>
        <div class="cell">
          <bib-input
            type="text"
            :value="activity.start"
            name="name"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            :value="activity.end"
            name="name"
            placeholder="Type your name"
          ></bib-input>
        </div>
        <div class="cell"><div class="uneditable-cell">{{ activity.total }}</div></div>
      </div>
      <div class="row" @keyup.enter="makeNewTimeEntry">
        <div class="cell checkbox">
          <bib-checkbox size="md"></bib-checkbox>
        </div>
        <div class="cell">
          <bib-button
            dropdown=""
            :label="newActivity.activity.label || 'Select Activity Type'"
            tooltip-title="Dropdown"
            v-model="newActivity.activity.label"
          >
            <template v-slot:menu>
              <ul>
                <li @click="newActivityTypeReset">{{ 'Select an activity type' }}</li>
                <li
                  v-for="activityType in activityTypes"
                  :key="activityType.value"
                  @click="newActivityTypeSelected(activityType.value)"
                >{{ activityType.label }}</li>
              </ul>
            </template>
          </bib-button>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            :value="newActivity.start || 'start'"
            name="start"
            v-model="newActivity.start"
          ></bib-input>
        </div>
        <div class="cell">
          <bib-input
            type="text"
            :value="newActivity.end || 'end'"
            name="end"
            v-model="newActivity.end"
          ></bib-input>
        </div>
        <div class="cell"><div class="uneditable-cell">{{ newActivityTotal }}</div></div>
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
      if (!this.newActivity.start || !this.newActivity.end) return '--:--'
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
    }
  }
};
</script>

<style lang="scss" scoped>
.time-list {
  ul {
    margin: 0px;
    padding: 0;
  }
  .time-list-item {
    display: flex;
    color: #000;
    li {
      list-style: none;
      padding: 0 10px;
      border-right: 1px solid #eee;
      font-weight: normal;
      font-size: 11px;
      &:last-child {
        border-right: 0px;
        padding-right: 0px;
      }
      label {
        display: block;
        font-weight: normal;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
.table {
  display: table;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  &__thead {
    display: table-row;
    color: $gray5;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    border-top: 1px solid $gray3;
    border-collapse: collapse;
  }
  .checkbox {
    width: 40px;
  }
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
}
</style>
