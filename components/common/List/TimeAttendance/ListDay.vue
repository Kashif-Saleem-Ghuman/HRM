<template>
  <div>
    <div class="table" :class="{ 'disabled-table': disabled }">
      <div class="thead">
        <div class="cell">ACTIVITY</div>
        <div class="cell">START</div>
        <div class="cell">END</div>
        <div class="cell">TOTAL HRS</div>
        <div class="cell trash" v-if="!disabled"></div>
      </div>
      <time-entry-row
        v-for="entry in entries"
        :key="entry.id ?? entry.activity"
        :entry="entry"
        class="row"
        @edit-entry="editSpecificEntry"
        @delete-entry="deleteSpecificEntry"
        :date="date"
        :listToday="listToday"
        @new-entry="makeNewTimeEntry"
      ></time-entry-row>
      <div class="row total">
        <div class="cell no-border"></div>
        <div class="cell no-border"></div>
        <div class="cell label">Day Total Hours</div>
        <div class="cell total-hours">{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ACTIVITY_DICTIONARY } from "@/utils/constant/TimesheetData";
import { ACTIVITY_TYPE } from "../../../../utils/constant/Constant";
import { orderBy } from "lodash";
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
      default: "--:--",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newEntry: {
        activity: "",
        start: null,
        end: null,
      },
      clockInEntry: {
        activity: ACTIVITY_TYPE.IN,
        start: null,
        end: null,
      },
      breakEntry: {
        activity: ACTIVITY_TYPE.BREAK,
        start: null,
        end: null,
      },
      ACTIVITY_DICTIONARY,
    };
  },

  computed: {
    entries() {
      return orderBy(
        [...this.defaultEntries, ...this.listToday],
        (entry) => entry.activity,
        "desc"
      );
    },
    defaultEntries() {
      const entries = [this.clockInEntry, this.breakEntry];
      const existingEntries = this.listToday.map((item) => item.activity);
      return entries.filter(
        (entry) => !existingEntries.includes(entry.activity)
      );
    },
  },
  methods: {
    async makeNewTimeEntry(newEntry) {
      this.$emit("new-entry", newEntry);
    },
    editSpecificEntry(entry) {
      this.$emit("edit-entry", entry);
    },
    deleteSpecificEntry(id) {
      if (confirm("Are you sure you want to delete this time entry?")) {
        this.$emit("delete-entry", id);
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
      font-size: 14px;
      text-align: right;
    }
    .total-hours {
      font-size: 14px;
    }
  }
  .cell {
    display: table-cell;
    border-bottom: 1px solid $gray3;
    border-right: 1px solid $gray3;
    text-align: left;
    padding: 0px;
    vertical-align: middle;
    text-align: left;
    font-weight: 600;
    input {
      border: 0px !important;
      text-align: left !important;
      border-radius: 0px !important;
    }
    label {
      padding: 0 0.5rem;
      font-size: 14px;
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
