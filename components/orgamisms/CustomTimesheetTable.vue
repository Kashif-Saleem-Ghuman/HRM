<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{ table__headless: headless, resizableTable: resizableColumns }"
    cellspacing="0"
  >
    <template>
      <tr v-if="customTitle" :class="classTypeHead">
        <th
          colspan="5"
          v-if="$scopedSlots.cell_action"
          class="cell_action_header"
        >
          <div class="" style="text-align: left">
            <label>Timesheet</label>
          </div>
        </th>
        <th>
          <div class="d-flex justify-center align-center">
            <bib-icon
              icon="arrowhead-down"
              :scale="1"
              variant="gray5"
            ></bib-icon>
          </div>
        </th>
      </tr>
      <tr :class="classTypeHead">
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
      <tr
        :style="{ visibility: isCollapsed ? 'collapse' : '' }"
        :class="classTypeBody"
        @contextmenu.stop="rightClickItem($event, keyI)"
        @click="$emit('item-clicked', $event, keyI, item)"
        @dblclick="clickItem(keyI)"
        :id="keyI"
        style="cursor: pointer"
      >
        <td v-if="!hideNoColumn" class="table__irow-count">{{ keyI + 1 }}</td>
        <td v-if="$scopedSlots.cell_title" colspan="2" style="width: 50px">
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
              v-bind:value="sections[keyI]"
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
    </template>
   
    <tr >
      <td colspan="4" class="without-border">
        00:00:00
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
    className: {
      type: Array,
      default: [],
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
  },
  computed: {
    activeClass() {
      return (keyI) => (this.sections[keyI].active ? "active" : "");
    },
  },
};
</script>
