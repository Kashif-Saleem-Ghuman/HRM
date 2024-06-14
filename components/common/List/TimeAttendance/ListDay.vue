<template>
  <div>
    <div class="custom-table" :class="{ 'disabled-table': disabled }">
      <div class="thead">
        <div class="cell" v-for="item in ACTIVITY_HEADER_DATA">{{ item }}</div>
        <div class="cell trash" v-if="!disabled"></div>
      </div>
      <time-entry-row
        v-for="(entry, index) in entries"
        :key="entry.id ?? entry.activity + date"
        :entry="entry"
        class="row"
        @edit-entry="editSpecificEntry"
        @delete-entry="deleteConfirmation"
        :date="date"
        :number="' #'+index"
        :listToday="listToday"
        @new-entry="makeNewTimeEntry"
      ></time-entry-row>
      <div class="row total">
        <div class="cell no-border"></div>
        <div class="cell no-border"></div>
        <div class="cell label">{{hoursText}}</div>
        <div class="cell total-hours">{{ total }}</div>
      </div>
    </div>  
    <div class="px-1 py-1">
      <employee-summary
        :date="getSelectedDate()"
        :summary="summary"
        :editable="!disabled"
        :disabled="disabled"
        @update="getSummary"
      ></employee-summary>
    </div>
    <div>
      <confirmation-modal
        :title="deleteModalContent.title"
        :confirmationMessage="deleteModalContent.message"
        :confirmastionMessageModal="confirmastionMessageModal"
        @close="closeconfirmastionMessageModal"
        @on-click="deleteSpecificEntry"
      ></confirmation-modal>
    </div>
  </div>
</template>

<script>
import {
  ACTIVITY_DICTIONARY,
  ACTIVITY_HEADER_DATA,
} from "../../../../utils/constant/TimesheetData";
import {ACTIVITY_TYPE, FILL_DAILY_ENTRY_EVENT, TIMESHEET_STATUSES} from "../../../../utils/constant/Constant";
import { orderBy } from "lodash";
import { deleteTimeEntry } from "@/utils/functions/functions_lib_api";
import { DateTime } from "luxon";
import { getSummaryByDate } from "../../../../utils/functions/api_call/summaries"
const DELETE_MESSAGE = {
  confirmatinData: {
    title: "Delete Time Entry",
    message: "Are you sure you want to delete Time entry?",
  },
  notification: {
    text: "The time entry has been deleted successfully...",
    variant: "primary-24",
  },
};
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
      ACTIVITY_HEADER_DATA,
      deleteModalContent: DELETE_MESSAGE.confirmatinData,
      confirmastionMessageModal: false,
      idToDelete: null,
      hoursText:'Day Total Hours',
      summary: null,
    };
  },
  created(){
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
      const entries = [this.clockInEntry, ...[this.breakEntry]];
      const existingEntries = this.listToday.map((item) => item.activity);
      return entries.filter(
        (entry) => !existingEntries.includes(entry.activity)
      );
    },
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification })
    },
    deleteTimeEntry,

    getSelectedDate() {
      return DateTime.fromJSDate(this.date).toFormat("yyyy-MM-dd")
    },
    async makeNewTimeEntry(newEntry) {
      if (newEntry.activity === ACTIVITY_TYPE.BREAK && this.canAddBreakEntry()) {
         return this.$emit("new-entry", newEntry);
      } else {
        this.$emit("new-entry", newEntry);
      }
    },
    editSpecificEntry(entry) {
      this.$emit("edit-entry", entry);
    },
    async deleteSpecificEntry() {
      const id = this.idToDelete;
      await this.deleteTimeEntry(id);
      this.confirmastionMessageModal = false;
      this.openPopupNotification(DELETE_MESSAGE.notification);
      this.idToDelete = null;
      this.$emit("delete-entry", id);
      this.$nuxt.$emit("chronometer");
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
      this.idToDelete = null;
    },
    deleteConfirmation(id) {
      this.idToDelete = id;
      this.confirmastionMessageModal = true;
    },
    canAddBreakEntry() {
      const breakEntriesCount = this.entries.filter(entry => entry.activity === ACTIVITY_TYPE.BREAK).length;
      return breakEntriesCount < 3;
    },
    async getSummary() {
      const { date } = this
      const employeeId = this.$route.params.id
      const summary = await getSummaryByDate({ date: DateTime.fromJSDate(date).toFormat("yyyy-MM-dd"), employeeId });
      this.summary = summary
    }
  },

  mounted() {
    this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
    this.getSummary()
    const breaks = this.entries.filter(item=> item.activity === ACTIVITY_TYPE.BREAK);
    const lastBreak = breaks[breaks.length-1];
    if (lastBreak.start && lastBreak.end && this.entries.filter(item=> item.activity === ACTIVITY_TYPE.BREAK).length < 3) 
    {
      const newBreakEntry = {
        activity: ACTIVITY_TYPE.BREAK,
        start: null,
        end: null
      };
      this.entries.push(newBreakEntry);
    }
  },

  watch: {
    date(value, old) {
      if (value != old && value !=null) {
        this.getSummary()
      }
      else if (value==null)  {
        this.summary=null
      }
    },
    'entries': {
      handler(breaks) {
        const lastBreak = breaks[breaks.length - 1];
        if (lastBreak.start && lastBreak.end && this.entries.filter(item=> item.activity === ACTIVITY_TYPE.BREAK).length < 3) 
        {
          const newBreakEntry = {
            activity: ACTIVITY_TYPE.BREAK,
            start: null,
            end: null
          };
          this.entries.push(newBreakEntry);
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="scss">
.disabled-table * {
  pointer-events: none;
}
.custom-table {
  display: table;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  border-collapse: collapse;
  width: 100%;
  transition: background-color 0.9s linear, outline-color 0.3s linear;

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
      background-color: transparent !important;
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
    height: 2.5rem;
    background-color: $light;
    color: $gray5;
    font-size: 13px;
    font-weight: bold;
    border-collapse: collapse;
    .cell {
      padding: 10px;
      border: $gray4 1px solid;
      border-top: none !important;
    }
    :first-child {
      padding-left: 1rem;
      border-left: none !important;
    }
    :last-child {
      border-right: none !important;
    }
  }
}
</style>
