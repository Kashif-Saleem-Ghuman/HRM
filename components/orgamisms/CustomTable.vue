<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{ table__headless: headless, resizableTable: resizableColumns }"
    cellspacing="0"
  >
    <template>
      <tr
        class="table__hrow__custom"
        :class="fixHeader ? 'table__hrow__custom-fixed' : ''"
      >
        <th v-if="!hideNoColumn" class="table__hrow__custom__no">
          {{ fields[0].label }}
        </th>
        <th v-if="$scopedSlots.cell_action" class="cell_action_header">
          <div class="d-flex justify-center align-center">
            <bib-checkbox
              size="md"
              @change="$emit('input', $event)"
              :checked="allChecked"
            ></bib-checkbox>
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
            th_center: field.center,
          }"
        >
          <div
            class="align-center border-0"
            :class="{ 'cursor-pointer': $listeners['column-header-clicked'] }"
            :id="field.label + '_action'"
          >
            <span class="flex-grow-1"> {{ field.label }} </span>
            <template v-if="field.header_icon">
              <div
                v-if="field.header_icon.icon"
                class="ml-05 shape-circle bg-white border-0 bg-hover-gray2 width-105 height-105 d-flex justify-center align-center cursor-pointer"
                :class="{ 'bg-black': field.header_icon.isActive }"
                @click="
                  field.header_icon.event && $emit(field.header_icon.event)
                "
                style="border: 0"
              >
                <bib-icon
                  :icon="field.header_icon.icon"
                  :scale="0.9"
                  variant="gray5"
                  hoverVariant="white"
                ></bib-icon>
              </div>
            </template>
          </div>
        </th>
        <th v-if="$scopedSlots.cell_action_right" class="cell_action_header">
          <div class="d-flex justify-center align-center">
            <bib-icon icon="trash" :scale="0.9"></bib-icon>
          </div>
        </th>
      </tr>
    </template>
    <tr :style="{ width: '0rem' }" v-if="collapseObj">
      <td colspan="2" class="colapse">
        <bib-detail-collapse
          :label="collapseObj.label"
          :open="!isCollapsed"
          :variant="collapseObj.variant"
          @click="isCollapsed = !isCollapsed"
          style="transform: translateX(-10px); height: 48px"
        >
        </bib-detail-collapse>
      </td>
    </tr>
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
    <tr
      v-if="status"
      v-show="showTotal"
      style="padding: 16px !important; font-size: 14px"
    >
      <!-- <td></td> -->
      <td
        :colspan="colspan"
        class="pl-1"
        style="text-align: right; padding: 16px !important"
      >
        Status
      </td>
      <td class="" style="text-align: center; font-weight: bold">
        <!-- {{ status }} -->
        <bib-button
          :icon="
            status == 'Submit'
              ? $button.approved.icon
              : '' || status == 'Past Due'
              ? $button.past_due.icon
              : '' || status == 'Pending'
              ? $button.pending.icon
              : ''
          "
          :variant="
            status == 'Submit'
              ? $button.approved.variant
              : '' || status == 'Past Due'
              ? $button.past_due.variant
              : '' || status == 'Pending'
              ? $button.pending.variant
              : ''
          "
          :scale="$button.pending.scale"
          :label="
            status == 'Submit'
              ? $button.approved.label
              : '' || status == 'Past Due'
              ? $button.past_due.label
              : '' || status == 'Pending'
              ? $button.pending.label
              : ''
          "
          class="mr-05 w-50"
          @click="buttonClicked"
          :style="buttonDisabled"
        ></bib-button>
      </td>
    </tr>
    <tr
      v-if="buttonLable"
      v-show="showTotal"
      style="padding: 16px !important; font-size: 14px"
    >
      <td
        colspan="4"
        class="pl-1"
        style="text-align: right; padding: 16px !important"
      >
        {{
          buttonLable == "Submit"
            ? "Submit your weekly timesheet"
            : "" || buttonLable == "Pending"
            ? "Timesheet is pending"
            : "" || buttonLable == "Past Due"
            ? "Timesheet is past due"
            : ""
        }}
      </td>
      <td class="" style="text-align: center; font-weight: bold">
        <bib-button
          :icon="
            buttonLable == 'Submit'
              ? $button.approved.icon
              : '' || buttonLable == 'Past Due'
              ? $button.past_due.icon
              : '' || buttonLable == 'Pending'
              ? $button.pending.icon
              : ''
          "
          :variant="
            buttonLable == 'Submit'
              ? $button.approved.variant
              : '' || buttonLable == 'Past Due'
              ? $button.past_due.variant
              : '' || buttonLable == 'Pending'
              ? $button.pending.variant
              : ''
          "
          :scale="$button.pending.scale"
          :label="
            buttonLable == 'Submit'
              ? $button.approved.label
              : '' || buttonLable == 'Past Due'
              ? $button.past_due.label
              : '' || buttonLable == 'Pending'
              ? $button.pending.label
              : ''
          "
          class="mr-05 w-50"
          @click="buttonClicked"
          :style="buttonDisabled"
        ></bib-button>
        <!-- <bib-button
          :label="buttonLable"
          size="lg"
          :variant="buttonDisabled ? 'warning' : 'success'"
          @click="buttonClicked"
        ></bib-button> -->
      </td>
    </tr>
  </table>
</template>

<script>
/**
 * @module Orgamisms/CustomTable
 * @author Charan Pal
 * @rebuild Charan Pal
 * @desc Table component
 * @vue-prop {Boolean} headless=null - table without header.
 * @vue-prop {String} fields=[] - table header names.
 * @vue-prop {String} sections=[] - table data.
 * @vue-prop {Object} collapseObj=null - collapsible table settings.
 */
export default {
  name: "BibTable",
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
      if (this.buttonLable !== "Submit") {
      } else {
        this.$emit("button-clicked");
      }
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
.colapse {
  .detail-collapse__content {
    height: unset !important;
  }
}

.table {
  width: 100%;
  height: max-content;
  margin: 0;
  border: none !important;
  th,
  td {
    padding-left: 8px;
    padding-right: 6px;
  }

  &__hrow__custom {
    background-color: $white;
    color: $gray5;
    font-weight: 600;
    text-transform: uppercase !important;
    th {
      border: $gray3 1px solid;
      // border-top: none;
      text-align: left;
      height: 40px !important;
      text-transform: uppercase !important;

      color: #1d1d20;

      span {
        font-size: 12px;
        font-weight: 500;
        color: #b1b1b4;
      }
      &:first-child {
        border-left: none;
      }
      &:last-child {
        width: 250px !important;
      }
      &:not(:last-child) {
        border-right: none;
      }

      &.cell_action_header {
        width: 0rem;
      }
    }

    &__no {
      text-align: center;
      font-weight: normal;
    }

    &__active {
      // border-bottom-color: $dark-sub1 !important;
      span {
        color: $dark-sub1 !important;
      }
    }

    &.collapsed {
      visibility: collapse;
      height: 48px !important;
    }
  }

  &__srow {
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  &__irow {
    cursor: pointer;
    color: $gray6;
    font-weight: 400;
    background-color: #f8f8f9;
    outline: 1px solid transparent;
    transition: background-color 0.3s linear, outline-color 0.3s linear;
    &-count {
      width: 60px;
    }

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

  &__headless {
    border-top: 0;
    .table__hrow__custom {
      visibility: collapse;
    }
  }

  .th_center {
    text-align: center;
  }
}

.table__hrow__custom-fixed {
  position: sticky; // first row
  top: 50px;
  z-index: 4;
  left: 0;
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
</style>
