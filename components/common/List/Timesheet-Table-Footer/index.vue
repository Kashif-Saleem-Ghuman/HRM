<!-- TODO Need to find a way to extends CustomTable template -->
<template>
  <div class="table-footer">
    <div class="footer-items">
      <div class="footer-item-left">Week Total</div>
      <div class="footer-item-right">{{ totalValue }}</div>
    </div>
    <div class="footer-items" v-if="showStatus">
      <div class="footer-item-left">Status</div>
      <div class="footer-item-right">
        <div v-if="status === 'approved' || status === 'pending'">
          <chips
            :title="getStatusLabel()"
            iconShow="iconShow"
            :icon="getChipStatusIcon(status)"
            :variant="getChipStatusVariant(status)"
            :defaultPointer="true"
            class=""
          ></chips>
        </div>
        <bib-button
          :icon="getStatusIcon()"
          :variant="getStatusVariant()"
          :scale="$button.pending.scale"
          :label="getStatusLabel()"
          class="mr-05"
          @click="buttonClicked"
          v-else
        ></bib-button>
      </div>
    </div>
    <div class="footer-items" v-else style="border-bottom: 0px !important">
      <div class="footer-item-left" v-if="status == 'rejected'">
        <div
          :class="refusalReason != null ? 'text-danger' : ''"
          style="width: 500px"
        >
          <span
            v-if="refusalReason != null"
            class="text-bold pr-05"
          >
            Rejected Reason: </span
          >{{ getSubmitText() }}
        </div>
      </div>
      <div class="footer-item-left" v-else>{{ getSubmitText() }}</div>
      <div class="footer-item-right">
        <div v-if="status === 'approved' || status === 'pending'">
          <chips
            :title="getStatusLabel()"
            iconShow="iconShow"
            :icon="getChipStatusIcon(status)"
            :variant="getChipStatusVariant(status)"
            :defaultPointer="true"
            class=""
          ></chips>
        </div>
        <bib-button
          :icon="getSubmitIcon()"
          :variant="getSubmitVariant()"
          :scale="$button.pending.scale"
          :label="getSubmitLabel()"
          @click="buttonClicked"
          v-else
        ></bib-button>
      </div>
    </div>
  </div>
</template>

<script>
import { TIMESHEET_STATUSES } from "../../../../utils/constant/Constant";
import {
  getStatusIcon as getChipStatusIcon,
  getStatusVariant as getChipStatusVariant,
} from "../../../../utils/functions/status";
const TIMESHEET_STATUS_TO_SUBMIT = [
  TIMESHEET_STATUSES.NOT_SUBMITTED,
  TIMESHEET_STATUSES.PAST_DUE,
  TIMESHEET_STATUSES.REJECTED,
];
export default {
  props: {
    showTotal: {
      type: Boolean,
    },
    totalValue: {
      type: String,
    },
    status: {
      type: String,
    },
    refusalReason: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    getChipStatusIcon,
    getChipStatusVariant,
    getSubmitVariant() {
      if (this.timesheetIsSubmitable())
        return this.$button[TIMESHEET_STATUSES.NOT_SUBMITTED]?.variant;
      return this.status === "approved"
        ? "success"
        : this.$button[this.status]?.variant;
    },
    getSubmitLabel() {
      if (this.status === TIMESHEET_STATUSES.REJECTED) return "Resubmit";
      if (this.timesheetIsSubmitable()) return "Submit";
      return this.getStatusLabel();
    },
    getSubmitText() {
      if (this.status == TIMESHEET_STATUSES.REJECTED) {
        return this.refusalReason === null
          ? "Resubmit you timesheet"
          : this.refusalReason;
      }
      if (
        this.status == TIMESHEET_STATUSES.NOT_SUBMITTED ||
        this.status == TIMESHEET_STATUSES.PAST_DUE
      )
        return "Submit your weekly timesheet";
      return `Timesheet is ${this.getStatusLabel()?.toLowerCase()}`;
    },
    getSubmitIcon() {
      if (this.timesheetIsSubmitable()) return "";
      return this.getStatusIcon();
    },
    getStatusIcon() {
      return this.$button[this.status]?.icon;
    },
    getStatusLabel() {
      return (
        this.$button[this.status]?.statusLabel ??
        this.$button[this.status]?.label
      );
    },
    getStatusVariant() {
      return this.$button[this.status]?.variant;
    },
    timesheetIsSubmitable() {
      return TIMESHEET_STATUS_TO_SUBMIT.includes(this.status);
    },
    clickItem(key) {
      this.$emit("item-dblclicked", this.sections[key]);
      this.unselectAll();
      document.getElementById(key).classList.toggle("active");
    },
    unselectAll() {
      let rows = document.getElementsByClassName("table__irow");
      for (let row of rows) {
        row.classList.remove("active");
      }
    },
    rightClickItem(event, key) {
      this.$emit("item-right-clicked", {
        event: event,
        row: this.sections[key],
      });
    },
    clickColumnHeader(event, key) {
      this.$emit("column-header-clicked", {
        event: event,
        column: this.cols[key],
      });
    },
    buttonClicked() {
      if (this.timesheetIsSubmitable()) {
        this.$emit("button-clicked");
      }
    },
  },
  computed: {
    showStatus() {
      return (
        (this.$isAccountManager() || this.$isAccountAdmin()) && !this.$isUser()
      );
    },
  },
};
</script>
<style lang="scss">
.table-footer {
  //   border: 1px solid $light;
  border-top: 0;
  border-right: 0;
  font-size: 14px;
  .footer-items {
    display: flex;
    .footer-item-left {
      width: 90.05%;
      border-right: 1px solid $light;
      border-bottom: 1px solid $light;
      padding: 1rem 0.5rem;
      text-align: right;
      display: flex;
      align-items: center;
      justify-content: end;
    }
    .footer-item-right {
      width: 9.95%;
      border-bottom: 1px solid $light;
      padding: 1rem 0 1rem 0.5rem;
      font-weight: 600;
    }
  }
  .status-text {
    padding: 0.5rem;
  }
}
</style>
