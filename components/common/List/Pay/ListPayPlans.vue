<template>
    <custom-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      @select-all="$emit('selectAllItems')"
      :allChecked="checkedAll"
      @column-header-clicked="headerColumnClick($event.column)"
    >
    <template #cell(id)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.id }}</span>
        </div>
      </template>
      <template #cell(role)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.role }}</span>
        </div>
      </template>
      <template #cell(engagement-type)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.engagementType }}</span>
        </div>
      </template>
      <template #cell(rate-annual)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.rateAnnual }}</span>
        </div>
      </template>
      <template #cell(rate-hourly)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.rateHourly }}</span>
        </div>
      </template>
      <template #cell(currency)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.currency }}</span>
        </div>
      </template>
      <template #cell(pay-plan)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.payPlan }}</span>
        </div>
      </template>
      <template #cell(payment-method)="data">
        <div class="justify-between">
          <span>{{ data.value.employee.paymentMethod }}</span>
        </div>
      </template>
    </custom-table>
  </template>
  
  <script>
  import { mapGetters } from "vuex";
  import { TABLE_HEAD } from "../../../../utils/constant/pay/PayConstant";
  import { sortColumn } from "../../../../utils/functions/table-sort";
  import {
    meetLink,
    sendMessage,
    makeCall,
  } from "../../../../utils/functions/functions_lib";
  import { DateTime } from "luxon";
  import { DATETIME_FORMAT } from "../../../../utils/functions/datetime-input";
  export default {
    props: {
      listPending: {
        type: [Array, Object],
        default: "",
      },
      checked: {
        type: Boolean,
      },
      checkedAll: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        showRefusalModal: false,
        tableFields: TABLE_HEAD.tHeadPaySalaries,
        attendanceClass: [],
        satisfaction: "",
        userPhotoClick: false,
        sortByField: null,
      };
    },
    async created() {
      await this.$store.dispatch("employee/setActiveUser");
    },
    beforeDestroy() {
      this.$resetTableFieldsHeaderIcon(this.tableFields);
    },
    computed: {
      leavePendingList() {
        if (!this.sortByField) return this.listPending;
  
        return sortColumn({ items: this.listPending, field: this.sortByField });
      },
      truncateText() {
        var screenWidth = window.screen.width;
        if (screenWidth >= "1920") {
          return 40;
        } else {
          return 25;
        }
      },
      ...mapGetters({
        getUser: "employee/GET_ACTIVE_USER",
      }),
    },
  
    methods: {
      meetLink,
      sendMessage,
      makeCall,
      sortColumn(columnKey) {
        if (this.sortByField && this.sortByField.key != columnKey) {
          this.sortByField.header_icon.isActive = false;
        }
        const field = this.tableFields.find((field) => field.key === columnKey);
        field.header_icon.isActive = !field.header_icon.isActive;
        this.sortByField = field;
      },
      employeeDetail($event) {
        this.$nuxt.$emit("open-sidebar-salaries", $event);
      },
      headerColumnClick(column) {
        this.sortColumn(column);
      },
      onLoad(item) {
        return DateTime.fromISO(item, { zone: "utc" }).toFormat(DATETIME_FORMAT);
      },
      // handleItemClick_Table($event, keyI, item) {
      //   this.$router.push("/profile/" + item.id);
      // },
      handleAction($event) {
        this.$emit("get-id", $event);
      },
      viewProfile(id) {
        this.$router.push("/profile/" + id);
      },
      mouseover() {
        this.showTooltip = true;
      },
      mouseleave() {
        this.showTooltip = false;
      },
  
      async approveItem(id) {
        this.$emit("approve-item-single", id);
      },
    },
  };
  </script>
  
  <style lang="scss">
  .info_wrapper {
    color: $black;
    font-weight: normal;
  }
  
  .title-user {
    font-size: 14px;
    font-weight: 600;
    color: $dark;
  }
  
  .description {
    font-size: 14px;
    font-weight: normal;
    color: $dark;
  }
  </style>
  