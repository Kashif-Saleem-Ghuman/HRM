<template>
  <div>
    <div class="table">
      <div class="thead row">
        <div class="cell">ACTIVITY</div>
        <div class="cell">START</div>
        <div class="cell">END</div>
        <div class="cell">TOTAL HRS</div>
      </div>
      <time-entry-row
        v-for="entry in listToday"
        :key="entry.id"
        :entry="entry"
        class="row"
        @edit-entry="editSpecificEntry"
        :date="date"
      ></time-entry-row>
      <time-entry-row
        :entry="newEntry"
        class="row"
        @new-entry="makeNewTimeEntry"
        :date="date"
      ></time-entry-row>
    </div>
  </div>
</template>

<script>
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
      newEntry: {
        activity: { label: '', value: '' },
        start: null,
        end: null,
      },
      ACTIVITY_DICTIONARY,
    }
  },
  methods: {
    async makeNewTimeEntry(newEntry) {
      this.$emit('new-entry', newEntry);
    },
    editSpecificEntry(entry) {
      this.$emit('edit-entry', entry)
    }
  },
};
</script>

<style lang="scss">
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
