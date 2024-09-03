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
          <leave-status :leaveStatusData="status" :defaultPointer="true"></leave-status>
          <!-- <chips
            :title="getStatusLabel()"
            iconShow="iconShow"
            :icon="getChipStatusIcon(status)"
            :variant="getChipStatusVariant(status)"
            :defaultPointer="true"
            class=""
          ></chips> -->
        </div>
        <leave-status v-else :leaveStatusData="status"   @click="buttonClicked"></leave-status>

        <!-- <bib-button
          :icon="getStatusIcon()"
          :variant="getStatusVariant()"
          :scale="$button.pending.scale"
          :label="getStatusLabel()"
          class="mr-05"
          @click="buttonClicked"
          v-else
        ></bib-button> -->
      </div>
    </div>
    <div class="footer-items bottom-border-remove" v-else>
      <div class="footer-item-left" v-if="status == 'rejected'">
        <div
          class="refusal-wrapper info-card-success-wrapper margin-minus px-05"
          v-if="refusalReasonData?.refusalReason != null"
        >
          <div class="d-flex align-center info-card-inner-wrapper" style="border: none !important;">
            <div>
            <div class="shape-circle bg-danger width-2 height-2 d-flex justify-center align-center">
              <bib-icon icon="tick" variant="white" :scale="1"></bib-icon></div>
            </div>
            <div class="content">
              <label> Rejected</label>
              <div>
                {{
                  `Request Rejected on ${onLoad(
                    refusalReasonData.statusChangeDate
                  )} by  ${$getEmployeeFullName(refusalReasonData.manager)}`
                }}
              </div>
              <div>Reason: {{ refusalReasonData.refusalReason }}</div>
            </div>
          </div>
        </div>
        <div
          :class="refusalReasonData?.refusalReason != null ? 'text-danger' : ''"
          v-else
        >
          {{ getSubmitText() }}
        </div>
      </div>
      <div class="footer-item-left" v-else v-html="getSubmitText()"></div>
      <div class="footer-item-right d-flex align-center">
        <div v-if="status === 'approved' || status === 'pending'">
          <leave-status :leaveStatusData="status" :defaultPointer="true"></leave-status>

          <!-- <chips
            :title="getStatusLabel()"
            iconShow="iconShow"
            :icon="getChipStatusIcon(status)"
            :variant="getChipStatusVariant(status)"
            :defaultPointer="true"
            class=""
          ></chips> -->
        </div>
        <leave-status v-else :leaveStatusData="status" :timesheet="true"  @click="buttonClicked"></leave-status>

        <!-- <bib-button
          :icon="getSubmitIcon()"
          :variant="getSubmitVariant()"
          :scale="$button.pending.scale"
          :label="getSubmitLabel()"
          @click="buttonClicked"
          v-else
        ></bib-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { TIMESHEET_STATUSES } from "../../../../utils/constant/Constant";
import fecha, { format } from "fecha";
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
    refusalReasonData: {
      type: [Array, Object],
    },
  },
  data() {
    return {};
  },
  methods: {
    getChipStatusIcon,
    getChipStatusVariant,
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
    },
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
      // if (this.status == TIMESHEET_STATUSES.REJECTED) {
      //   return this.refusalReason === null
      //     ? "Resubmit you timesheet"
      //     : this.refusalReason;
      // }
      if (
        this.status == TIMESHEET_STATUSES.NOT_SUBMITTED ||
        this.status == TIMESHEET_STATUSES.PAST_DUE
      )
        return `${
          this.status === "past_due"
            ? 'Submit your <div class="text-bold text-primary-24" style="padding:0 5px">Past Due</div> timesheet'
            : "Submit your weekly timesheet"
        }`;
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
      width: 87.05%;
      border-right: 1px solid $light;
      border-bottom: 1px solid $light;
      padding: 1rem 0.5rem;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: end;
    }
    .footer-item-right {
      width: 12.95%;
      border-bottom: 1px solid $light;
      padding: 1rem 0 1rem 0.5rem;
      font-weight: 600;
      .chip-wrapper{
        width: auto !important;
      }
    }
  }
  .status-text {
    padding: 0.5rem;
  }
}
.refusal-wrapper {
  // padding: 1rem;
  .content {
    color: #d9000d;
    padding-left: 10px;
    .icon{
      width:100px;
    }
    // text-align: right;
    label {
      font-weight: bold;
      line-height: 22px;
    }
  }
}
.bottom-border-remove {
  border-bottom: 0px !important;
}
.margin-minus {
  margin-top: -16px;
}
</style>
