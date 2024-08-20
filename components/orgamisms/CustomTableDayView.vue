<template>
  <table
    v-click-outside="unselectAll"
    class="table"
    :class="{
      'table--light': isLightThemeCheck,
      'table--dark': !isLightThemeCheck,
    }"
    cellspacing="0"
  >
  <template>
       <tr class="table__hrow" :class="fixHeader ? 'table__hrow-fixed' : ''">
         <th v-if="!hideNoColumn" class="table__hrow__no">
           {{ fields[0].label }}
         </th>
         <th v-if="type === PENDING_TYPE || type === PAST_DUE_TYPE" class="cell_action_header">
           <div v-if="$scopedSlots.cell_action" class="d-flex justify-center align-center">
             <bib-checkbox
                 size="md"
                 @change="$emit('select-all', $event)"
                 :checked="allChecked"
                 style="margin: 0; padding: 0px"
                 :variant="isLightThemeCheck ? '' : 'secondary'"
             ></bib-checkbox>
           </div>
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
         <th v-if="$scopedSlots.cell_action_right" class="cell_action_header">
           <div class="d-flex justify-center align-center">
             <bib-icon icon="horizontal-dots" :variant="isLightThemeCheck ? '' : 'light'"></bib-icon>
           </div>
         </th>
       </tr>
     </template>
    <tr :style="{ width: '0rem' }" v-if="collapseObj">
      <td colspan="2">
        <bib-detail-collapse
          :label="collapseObj.label"
          :open="!isCollapsed"
          :variant="collapseObj.variant"
          @click="isCollapsed = !isCollapsed"
          style="transform: translateX(-10px)"
        >
        </bib-detail-collapse>
      </td>
    </tr>
    <template v-for="(item, keyI) in sections">
       <tr class="table__irow">
         <td colspan="11">
           <div class="d-flex justify-between align-center py-025">
             <div class="" style="text-align: left">
               <div
                 class="d-flex align-center text-left gap-05"
                 style="position: relative"
               >
                 <div
                   class="cursor-pointer"
                   v-on:mouseover="profiletab('id_' + item.id)"
                   v-on:mouseleave="profiletab('id_' + item.id, true)">
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
                   <div :id="'id_' + item.id" class="userCard">
                     <user-info-card
                       :user="item"
                       @viewProfile="viewProfile(item.id)"
                       @sendMeet.stop="makeCall(getUser.userId, item.userId)"
                       @sendMessage="sendMessage(item.userId)"
                       :active="item.active"
                       :contactButtons="$isActiveUser(item.id)"
                       style="min-width: 320px !important;"
                     ></user-info-card>
                   </div>
                 </div>
                 <div class="info_wrapper">
                   <div class="employee-name-label" :class="isLightThemeCheck ? 'text-black' : 'text-white'">
                     {{ item.firstName }} {{ item.lastName }}
                   </div>
                   <div :class="isLightThemeCheck ? 'text-dark' :'light'">
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
         class="table__irow"
         :key="`${item.id}-${keyI}`"
       >
         <td v-if="!hideNoColumn" class="table__irow-count">
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
             v-bind:value="sections[keyI], items"
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
import {mapGetters} from 'vuex'
 import {
   meetLink,
   sendMessage,
   makeCall
 } from "@/utils/functions/functions_lib";
 import { formatIsoDateToYYYYMMDD } from "@/utils/functions/dates";
 import {PAST_DUE_TYPE, PENDING_TYPE, WEEK_DAY} from "@/utils/constant/Constant";
/**
 * @module Orgamisms/BibTable
 * @author Ihab Benbouziyane
 * @rebuild Jianyu Wu
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
    type: {
      type: String,
    }
  },
  data() {
    return {
      PENDING_TYPE: PENDING_TYPE,
      PAST_DUE_TYPE: PAST_DUE_TYPE,
      cols: [],
      item: {},
      isCollapsed: this.collapseObj ? this.collapseObj.collapsed : false,
      themeIdentfier: this.$cookies.get("isLightTheme"),
    };
  },
  created() {
    this.cols = this.fields.map((field) => field.key);
    this.cols.shift();
  },
  methods: {
    meetLink,
     sendMessage,
     makeCall,
     formatIsoDateToYYYYMMDD,
    clickItem($event, key) {
      this.$emit("item-dblclicked", $event, this.sections[key]);
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
    viewProfile(id) {
       this.$router.push("/profile/" + id);
     },
     profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
    },
  },
  computed: {
    activeClass() {
      return (keyI) => (this.sections[keyI].active ? "active" : "");
    },
  },
  // mounted() {
  //   EventBus.on("theme-switch", (e) => {
  //     this.themeIdentfier = e.value;
  //   });
  // },
};
</script>


<style lang="scss" scoped>
</style>