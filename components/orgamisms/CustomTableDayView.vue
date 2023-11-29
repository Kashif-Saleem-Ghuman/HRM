<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{ table__headless: headless, resizableTable: resizableColumns }"
    cellspacing="0"
  >
    <!-- /*
   TABLE HEADERS
  */ -->
    <template>
      <tr :class="classTypeHead" class="table__hrow__custom">
        <th v-if="!hideNoColumn" class="table__hrow__custom__no">
          {{ fields[0].label }}
        </th>

        <th v-if="$scopedSlots.cell_action" class="cell_action_header">
          <div class="d-flex justify-center align-center">
            <bib-checkbox size="md"></bib-checkbox>
          </div>
        </th>

        <th
          v-for="(field, key) in fields.slice(1)"
          @click="clickColumnHeader($event, key)"
          :key="key"
          :style="`width: ${field.width};`"
          :class="{
            table__hrow__custom__active:
              field.header_icon && field.header_icon.isActive,
          }"
        >
          <div
            class="align-center"
            :class="{ 'cursor-pointer': $listeners['column-header-clicked'] }"
            :id="field.label + '_action'"
          >
            <span> {{ field.label }} </span>
          </div>
        </th>
        <th
          v-if="$scopedSlots.cell_action_right"
          class="cell_action_header"
          style="border-right: 0px !important"
        >
          <div class="d-flex justify-center align-center">
            <bib-icon icon="trash" :scale="0.9"></bib-icon>
          </div>
        </th>
      </tr>
    </template>

    <template v-for="(item, keyI) in sections">
      <tr class="table__irow">
        <td colspan="10">
          <div class="d-flex justify-between align-center py-025">
            <div class="" style="text-align: left">
              <div
                class="d-flex align-center text-left gap-05"
                style="position: relative"
              >
                <div style="cursor: pointer" class="pl-05">
                  <bib-avatar
                    variant="secondary-sub3"
                    :text="
                      item.firstName.slice(0, 1) + item.lastName.slice(0, 1)
                    "
                    text-variant="primary"
                    size="2.3rem"
                    v-show="item.photo === null"
                  ></bib-avatar>
                  <bib-avatar
                    class="mt-auto mb-auto"
                    shape="circle"
                    :src="item.photo"
                    v-show="item.photo != null"
                    size="2.3rem"
                  >
                  </bib-avatar>
                  <!-- <bib-avatar
                    class="mt-auto mb-auto"
                    shape="circle"
                    :src="item.photo"
                    size="3rem"
                  >
                  </bib-avatar> -->
                </div>
                <div class="info_wrapper">
                  <div class="title" style="text-transform: capitalize;">
                    {{ item.firstName }} {{ item.lastName }}
                  </div>
                  <div class="description">
                    {{ item.jobTitle }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      <!-- ROW FOR EACH EMPLOYEE TIMESHEET -->
      <tr
        v-for="(items, keyI) in sections[keyI]?.timesheets"
        :id="keyI"
        class="timesheet-table"
        :key="`${item.id}-${keyI}`"
      >
        <td v-if="!hideNoColumn" class="table__irow-count p-1">
          {{ keyI + 1 }}
        </td>
        <td v-if="$scopedSlots.cell_title" colspan="1" style="width: 50px">
          <slot
            name="cell_action"
            v-bind:keyI="keyI"
            v-bind:value="sections[keyI]"
          ></slot>
        </td>
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
              v-bind:value="items"
            >
            </slot>
          </div>
        </td>
        <td v-if="$scopedSlots.cell_action_right">
          <slot
            name="cell_action_right"
            v-bind:keyI="keyI"
            v-bind:value="sections[keyI]"
          ></slot>
        </td>
      </tr>
      <!-- <tr>
        <td colspan="6">
          <div style="border-bottom: 1px solid #eee; padding: 1rem"></div>
        </td>
      </tr> -->
    </template>
  </table>
</template>

<script>
import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
import { WEEK_DAY } from "../../utils/constant/Constant";

export default {
  props: {
    resizableColumns: {
      type: Boolean,
      default() {
        return false;
      },
    },
    checkBox: {
      type: String,
    },
    customTitle: {
      type: String,
    },
    classTypeHead: {
      type: String,
    },
    classTypeBody: {
      type: String,
    },
    // className: {
    //   type: Array,
    //   default: [],
    // },
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
    items: {
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
  },
  data() {
    return {
      // WEEK_DAY starts with sunday but need to start with monday
      weekDays: [...WEEK_DAY.slice(1), WEEK_DAY[0]].map((day) =>
        day.value.substring(0, 3)
      ),
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
    formatIsoDateToYYYYMMDD,
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
  },
  computed: {
    activeClass() {
      return (keyI) => (this.sections[keyI].active ? "active" : "");
    },
  },
};
</script>

<style lang="scss">
.time-list {
  padding-right: 1rem;
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
.colapse {
  .detail-collapse__content {
    height: unset !important;
  }
}
.timesheet-table {
  cursor: pointer;
  color: $gray6;
  font-weight: 400;
  background-color: #fff;
  outline: 1px solid transparent;
  transition: background-color 0.3s linear, outline-color 0.3s linear;
  td {
    border: 1px solid $light;
    padding: 6px;
    span {
      font-size: 14px;
      color: #1d1d20;
    }

    &:first-child {
      border-left: 0;
    }
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
    background-color: white;
    td {
      border-left: #eee 1px solid;
      &:first-child {
        border-left: 0;
      }
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
.table_day {
  width: 100%;
  height: max-content;
  margin: 0;
  border: none !important;
  color: #1d1d20;
  
  .bold-text {
    input {
      font-weight: bold;
    }
  }
  input {
    // border: none !important;
    margin: 0px !important;
    text-align: right;
    &:hover {
      background-color: $light !important;
    }
  }
  .without-border {
    border: none !important;
  }
  label {
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
  th {
    padding-left: 8px;
    padding-right: 6px;
    border: $gray3 1px solid;

  }
  td {
    padding: 0;
    padding: 0;
    border: $gray3 1px solid;

  }

  &__hrow__default {
    background-color: #F8F8F9;
    color: $gray5;
    font-size: 12px;
    font-weight: 600;

    th {
      border: $gray3 1px solid;
      border-top: none;
      border-left: none;
      text-align: left;
      height: 48px !important;
      padding: 0px !important;
      

      &.cell_action_header {
        width: 0rem;
      }
    }
    &__irow {
      color: $gray6;
      // height: 4rem !important;
      font-weight: 400;
      // line-height: 2.5rem;
      font-size: $base-size;
      outline: 1px solid transparent;
      transition: background-color 0.3s linear, outline-color 0.3s linear;

      td {
        border: 1px solid #000;
        
      }

      &:hover {
        cursor: default;
        background-color: white;
        border-color: $gray4;
        td {
          border-left: $gray4 1px solid;
          &:first-child {
            border-left: 0;
          }
        }
      }
      &:active {
        cursor: default;
        background-color: none;
        outline: 1px solid $gray4;
      }
      &.active {
        background-color: none;
        outline: 1px solid $gray4;
      }
    }
  }
}
</style>
