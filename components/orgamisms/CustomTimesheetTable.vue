<template>
    <table
      v-click-outside="unselectAll"
      class="table"
      :class="{ table__headless: headless, resizableTable: resizableColumns }"
      cellspacing="0"
    >
      <template>
        <tr v-if="customTitle">
          <th colspan="5" v-if="$scopedSlots.cell_action" class="cell_action_header">
            <div class="" style="text-align: left ;">
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
        <tr
          :class="classTypeHead"
        >
          <th v-if="!hideNoColumn" class="table__hrow__custom__no">
            {{ fields[0].label }}
          </th>
          
          <th v-if="$scopedSlots.cell_action" class="cell_action_header">
            <div class="d-flex justify-center align-center">
              <bib-checkbox  size="md"></bib-checkbox>
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
              <bib-icon icon="trash" :scale="1.1"></bib-icon>
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
      <template v-for="(item, keyI) in sections">
        <tr
          :key="'item-' + keyI"
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
      checkBox:{
        type:String
      },
      customTitle:{
        type:String
      },
      classTypeHead:{
        type:String
      },
      classTypeBody:{
        type:String
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
  .colapse{
  .detail-collapse__content{
    height: unset !important;
  }
  }
      
  .table {
    width: 100%;
    height: max-content;
    margin: 0;
    border: none !important;
    label{
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }
    th,
    td {
      padding-left: 8px;
      padding-right: 6px;
    }
  
    &__hrow__default{
      background-color: $white;
      color: $gray5;
      font-size: 12px;
      font-weight: 600;
     
      th {
        border: $gray3 1px solid;
        border-top: none;
        text-align: left;
        height: 48px !important;
        // &:first-child {
        //   border-left: none;
        // }
        // &:not(:last-child) {
        //   border-right: none;
        // }
  
        &.cell_action_header {
          width: 0rem;
        }
      }
      &__irow {
      color: $gray6;
      height: 4rem !important;
      font-weight: 400;
      line-height: 2.5rem;
      font-size: $base-size;
      outline: 1px solid transparent;
      transition: background-color 0.3s linear, outline-color 0.3s linear;
  
      td {
        border: 1px solid $light;
        padding: 20px !important;
        // &:first-child {
        //   border-left: 0;
        // }
        // &:not(:last-child) {
        //   border-right: none;
        // }
        // color: $gray5;
        // &:first-child {
        //   text-align: center;
        // }
      }
      // &:nth-child(2) td {
      //   border-top: none;
      // }
      // &:not(:last-child) td {
      //   border-bottom: none;
      // }
      &:hover {
        cursor: default;
        background-color: $light;
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
        background-color: $light;
        outline: 1px solid $gray4;
      }
      &.active {
        background-color: $light;
        outline: 1px solid $gray4;
      }
    }
    }
  
  
  
    &__hrow__custom{
      background-color: $white;
      color: $gray5;
      font-size: 12px;
      font-weight: 600;
     
      th {
        border: $gray3 1px solid;
        border-top: none;
        text-align: left;
        height: 48px !important;
        // &:first-child {
        //   border-left: none;
        // }
        // &:not(:last-child) {
        //   border-right: none;
        // }
  
        &.cell_action_header {
          width: 0rem;
        }
      }
      &__irow {
      color: $gray6;
      height: 4rem !important;
      font-weight: 400;
      line-height: 2.5rem;
      font-size: $base-size;
      outline: 1px solid transparent;
      transition: background-color 0.3s linear, outline-color 0.3s linear;
  
      &-count {
        width: 60px;
      }
  
      td {
        border: 1px solid $light;
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
        background-color: $light;
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
        background-color: $light;
        outline: 1px solid $gray4;
      }
      &.active {
        background-color: $light;
        outline: 1px solid $gray4;
      }
    }
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
  