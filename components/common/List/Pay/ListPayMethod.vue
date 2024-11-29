<template>
    <custom-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      :allChecked="checkedAll"
      @column-header-clicked="headerColumnClick($event.column)"
    >
      <template #cell(pay-method)="data">
        <div class="justify-between">
          <span>{{ data.value.payMethod }}</span>
        </div>
      </template>
      <template #cell(pay-method-type)="data">
        <div class="justify-between">
          <span>{{ data.value.payMethodType }}</span>
        </div>
      </template>
      <template #cell(created-on)="data">
        <div class="justify-between">
          <span>{{ data.value.createdAt }}</span>
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
  export default {
    props: {
      payMethodList: {
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
        tableFields: TABLE_HEAD.tHeadPayMethods,
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
        if (!this.sortByField) return this.payMethodList;
  
        return sortColumn({ items: this.payMethodList, field: this.sortByField });
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
      headerColumnClick(column) {
        this.sortColumn(column);
      },
      employeeDetail() {
      this.$nuxt.$emit("open-sidebar-salaries");
    },
    },
  };
  </script>
  
  