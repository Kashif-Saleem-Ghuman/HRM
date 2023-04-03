<template>
    <table
      v-click-outside="unselectAll"
      class="table_day"
      :class="{ table__headless: headless, resizableTable: resizableColumns }"
      cellspacing="0"
    >
      <template>
        
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
        <tr v-if="customTitle" :class="classTypeHead">
          <th
            colspan="6"
            v-if="$scopedSlots.cell_action"
            class="cell_action_header"
          >
           <div class="d-flex justify-between align-center py-05">
            <div class="" style="text-align: left">
              <label>Timesheet</label>
            </div>
            <div class="time-list">
             <ul class="time-list-item">
                <li>In <label>00:00</label></li>
                <li>Out <label>00:00</label></li>
                <li>Break <label>00:00</label></li>
                <li>Total <label>00:00</label></li>
             </ul>
            </div>
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
  
  <style lang="scss">
  .time-list{
    ul{
        margin: 0px;
        padding: 0;
    }
    .time-list-item{
        display:flex;
        color: #000;
        li{
            list-style: none;
            padding: 0 10px;
            border-right: 1px solid #eee;
            font-weight: normal;
            font-size: 11px;
            &:last-child{
                border-right: 0px;
                padding-right: 0px;
            }
            label{
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
    th{
      padding-left: 8px;
      padding-right: 6px;
    }
    td{
        padding: 0;
        padding: 0;
    }
  
    &__hrow__default {
      background-color: $white;
      color: $gray5;
      font-size: 12px;
      font-weight: 600;
  
      th {
        border: $gray3 1px solid;
        border-top: none;
        border-left: none;
        text-align: left;
        height: 48px !important;
  
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
          border: 1px solid $light;
        }
  
        &:hover {
          cursor: default;
          background-color: none;
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
  