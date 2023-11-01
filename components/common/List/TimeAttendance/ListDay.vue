<template>
  <div>
    <div class="table" :class="{'disabled-table': disabled}">
      <div class="thead">
        <div class="cell">ACTIVITY</div>
        <div class="cell">START</div>
        <div class="cell">END</div>
        <div class="cell">TOTAL HRS</div>
        <div class="cell trash" v-if="!disabled"></div>
      </div>
      <time-entry-row
        v-for="entry in listToday"
        :key="entry.id"
        :entry="entry"
        class="row"
        @edit-entry="editSpecificEntry"
        @delete-entry="deleteSpecificEntry"
        :date="date"
        :listToday="listToday"
      ></time-entry-row>
      <time-entry-row
        v-if="showNewEntryRow && !disabled"
        :entry="newEntry"
        class="row"
        @new-entry="makeNewTimeEntry"
        :date="date"
        :listToday="listToday"
      ></time-entry-row>
      <div class="row total">
        <div class="cell no-border"></div>
        <div class="cell no-border"></div>
        <div class="cell label">Day Total Hours</div>
        <div class="cell">{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
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
    total: {
      type: String,
      default: "--:--"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newEntry: {
        activity: { label: "", value: "" },
        start: null,
        end: null,
      },
      ACTIVITY_DICTIONARY,
    }
  },
  
  computed: {
    showNewEntryRow() {
      if (this.listToday?.length) {
        const activities = this.listToday.map( item => item.activity?.value)
        if (activities.includes("in") && activities.includes("break")) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    async makeNewTimeEntry(newEntry) {
      this.$emit("new-entry", newEntry);
    },
    editSpecificEntry(entry) {
      this.$emit("edit-entry", entry)
    },
    deleteSpecificEntry(id) {
      if(confirm("Are you sure you want to delete this time entry?")) {
        this.$emit('delete-entry', id)
      }
    },
  },
};
</script>

<style lang="scss">
.disabled-table * {
  pointer-events: none;
}
.table {
  display: table;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  .row {
    display: table-row;
  }
  .total {
    .cell {
      padding: 10px;
    }
    .label {
      text-align: right;
    }
  }
  .cell {
    display: table-cell;
    border-bottom: 1px solid $gray3;
    border-right: 1px solid $gray3;
    text-align: center;
    padding: 0px 0px;
    margin: 0 10px;
    vertical-align: middle;
    font-weight: 600;
    font-size: 12px;
    input{
      border: 0px !important;
    }
  }
  .no-border {
    border-right: 0px;
    border-left: 0px;
  }
  .trash {
    width: 0.5em;
  }
  .activity {
    font-size: 12px;
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
    background-color: #fff !important;
    .cell {
      padding: 10px;
    }
  }
}
</style>
