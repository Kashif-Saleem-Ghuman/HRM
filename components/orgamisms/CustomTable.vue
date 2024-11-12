<template>
  <div>
    <table
      v-click-outside="unselectAll"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
            class="table"
      cellspacing="0"
    >
      <template>
        <tr class="table__hrow" :class="fixHeader ? 'table__hrow-fixed' : ''">
          <th v-if="!hideNoColumn" class="table__hrow__no">
            {{ fields[0].label }}
          </th>
          <th v-if="$scopedSlots.cell_action" class="cell_action_header">
            <div class="d-flex justify-center align-center">
              <bib-checkbox
                size="md"
                @change="$emit('select-all', $event)"
                :checked="allChecked"
                style="margin: 0; padding: 0px"
                :variant="isLightThemeCheck ? 'light' : 'secondary'"
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
    </table>
  </div>
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
      if (this.timesheetIsSubmitable()) {
        this.$emit("button-clicked");
      }
    },
  },
};
</script>