<!-- TODO Need to find a way to extends CustomTable template -->
<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{ table__headless: headless, resizableTable: resizableColumns }"
    cellspacing="0"
  >
  <template>
      <tr class="table__hrow" :class="fixHeader ? 'table__hrow-fixed' : ''">
        <th v-if="!hideNoColumn" class="table__hrow__no">
          {{ fields[0].label }}
        </th>
        <th
          v-for="(field, key) in fields.slice(1)"
          @click="clickColumnHeader($event, key)"
          :key="key"
          :style="`width: ${field.width};`"
          :class="{
            table__hrow__active:
              field.header_icon && field.header_icon.isActive,
          }"
        >
          <div
            class="align-center"
            :class="{ 'cursor-pointer': $listeners['column-header-clicked'] }"
          >
            <span> {{ field.label }} </span>
            <template v-if="field.header_icon">
              <div
                v-if="field.header_icon.icon"
                class="ml-05 shape-rounded bg-hover-black width-105 height-105 d-flex justify-center align-center cursor-pointer"
                :class="{ 'bg-black': field.header_icon.isActive }"
                @click="
                  field.header_icon.event && $emit(field.header_icon.event)
                "
              >
                <bib-icon
                  :icon="field.header_icon.icon"
                  :scale="1.1"
                  variant="gray5"
                  hoverVariant="white"
                ></bib-icon>
              </div>
            </template>
          </div>
        </th>
        <th v-if="$scopedSlots.cell_action" class="cell_action_header">
          <div class="d-flex justify-center align-center">
            <bib-icon icon="horizontal-dots"></bib-icon>
          </div>
        </th>
      </tr>
    </template>
    <tr
      v-for="(item, keyI) in sections"
      :key="'item-' + keyI"
      :style="{ visibility: isCollapsed ? 'collapse' : '' }"
      class="table__irow"
      @contextmenu.stop="rightClickItem($event, keyI)"
      @click="$emit('item-clicked', $event, keyI, item)"
      @dblclick="clickItem(keyI)"
      :id="keyI"
    >
      <td v-if="!hideNoColumn" class="table__irow-count">{{ keyI + 1 }}</td>
      <td v-if="$scopedSlots.cell_action" style="width: 50px">
        <slot
          name="cell_action"
          v-bind:keyI="keyI"
          v-bind:value="sections[keyI]"
        ></slot>
      </td>
      <td v-for="(col, key) in cols" :key="key">
        <div
          v-if="$scopedSlots['cell(' + col + ')']"
          :class="{ 'h-100 align-center': centerCellY }"
        >
          <slot
            :name="'cell(' + col + ')'"
            v-bind:keyI="keyI"
            v-bind:value="sections[keyI]"
          >
          </slot>
        </div>
      </td>
      <td v-if="$scopedSlots.cell_action_right" style="width: 50px">
        <slot
          name="cell_action_right"
          v-bind:keyI="keyI"
          v-bind:value="sections[keyI]"
        ></slot>
      </td>
    </tr>
    <tr v-show="showTotal" style="padding: 16px !important; font-size: 14px">
      <td
        :colspan="colspan"
        class="pl-1"
        style="text-align: right; padding: 16px !important"
      >
        Work Total
      </td>
      <td class="" style="text-align: center; font-weight: bold">
        {{ totalValue }}
      </td>
    </tr>
    <tr v-if="showStatus" style="padding: 16px !important; font-size: 14px">
      <td
        :colspan="colspan"
        class="pl-1"
        style="text-align: right; padding: 16px !important"
      >
        Status
      </td>
      <td class="" style="text-align: center; font-weight: bold">
        <bib-button
          :icon="getStatusIcon()"
          :variant="getStatusVariant()"
          :scale="$button.pending.scale"
          :label="getStatusLabel()"
          class="mr-05"
          @click="buttonClicked"
          :disabled="buttonDisabled"
        ></bib-button>
      </td>
    </tr>
    <tr v-else style="padding: 16px !important; font-size: 14px">
      <td
        colspan="4"
        class="pl-1"
        style="text-align: right; padding: 16px !important"
      >
        {{ getSubmitText() }}
      </td>
      <td class="" style="text-align: center; font-weight: bold">
        <bib-button
          :icon="getSubmitIcon()"
          :variant="getSubmitVariant()"
          :scale="$button.pending.scale"
          :label="getSubmitLabel()"
          class="mr-05"
          @click="buttonClicked"
          :disabled="buttonDisabled"
        ></bib-button>
      </td>
    </tr>
  </table>
</template>

<script>
import { TIMESHEET_STATUSES } from "../../utils/constant/Constant";

const TIMESHEET_STATUS_TO_SUBMIT = [
  TIMESHEET_STATUSES.NOT_SUBMITTED,
  TIMESHEET_STATUSES.PAST_DUE,
  TIMESHEET_STATUSES.REJECTED,
];

export default {
  props: {
    resizableColumns: {
      type: Boolean,
      default() {
        return false;
      },
    },
    colspan: {
      type: Number,
    },
    checkBox: {
      type: String,
    },
    className: {
      type: Array,
      default() {
        return null;
      },
    },
    headless: {
      type: Boolean,
      default() {
        return null;
      },
    },
    fields: {
      type: Array,
      default() {
        return [];
      },
    },
    sections: {
      type: Array,
      default() {
        return [];
      },
    },
    collapseObj: {
      type: Object,
      default() {
        return null;
      },
    },
    hideNoColumn: {
      type: Boolean,
      default() {
        return false;
      },
    },
    fixHeader: {
      type: Boolean,
      default() {
        return false;
      },
    },
    centerCellY: {
      type: Boolean,
      default: false,
    },
    allChecked: {
      type: Boolean,
      default: false,
    },
    showTotal: {
      type: Boolean,
    },
    totalValue: {
      type: String,
    },
    status: {
      type: String,
    },
    buttonLable: {
      type: String,
    },
    buttonDisabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      cols: [],
      item: {},
      isCollapsed: this.collapseObj ? this.collapseObj.collapsed : false,
    };
  },
  created() {
    this.cols = this.fields.map((field) => field.key);
    this.cols.shift();
  },
  methods: {
    getSubmitVariant() {
      console.log(this.status, "this.statusthis.statusthis.status");
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
.week-wrapper-main{
.table {
  width: 100%;
  height: max-content;
  margin: 0;
  outline: 0 !important;
  border: none !important;

  // tr {
  //   height: 2.5rem;
  // }

  th,
  td {
    padding-left: 8px;
    padding-right: 6px;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &__hrow {
    height: 2.5rem;
    background-color: $light;
    color: $gray5;
    font-size: 13px;
    font-weight: bold;
    th {
      border: $gray4 1px solid;
      border-top: none;
      text-align: left;
      
      &:not(:last-child) {
        border-right: none;
      }

      &.cell_action_header {
        width: 0rem;
      }
    }

    &__no {
      text-align: center !important;
    }

    &__active {
      border-bottom-color: $dark-sub1 !important;
      span {
        color: $dark-sub1 !important;
      }
    }

    &.collapsed {
      visibility: collapse;
    }
  }

  &__srow {
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  &__irow {
    color: $gray6;
    font-weight: 400;
    line-height: 2.5rem;
    font-size: $base-size;
    outline: 1px solid transparent;
    transition: background-color 0.3s linear, outline-color 0.3s linear;
    td {
      border: 1px solid $light;

      &:not(:last-child) {
        border-right: none;
      }
      color: $gray5;
      &:first-child {
        text-align: center;
      }
    }
    &:nth-child(2) td {
      border-top: none;
    }
    &:not(:last-child) td {
      border-bottom: none;
    }
    &:hover {
      cursor: default;
      background-color: $light;
      border-color: $gray4;
      td {
        border-left: $gray4 1px solid;
      }
    }
    &:active {
      cursor: default;
      background-color: $light;
      outline: 1px solid $gray4;
    }
    &.active {
      background-color: $light;
      outline: 1px solid $gray4;
    }
  }

  &__headless {
    border-top: 0;
    .table__hrow {
      visibility: collapse;
    }
  }
}
.resizableTable {
  th,
  td {
    min-width: 100px;
    width: auto;
    max-width: 300px;
    resize: horizontal;
    overflow: auto;
    span {
      word-break: break-word;
    }
    &::-webkit-resizer {
      // background-color: transparent;
      height: 100%;
    }
  }
}

}
</style>