<template>
    <custom-table
      :fields="tableFields"
      :sections="leavePendingList"
      :hide-no-column="true"
      :allChecked="checkedAll"
      @column-header-clicked="headerColumnClick($event.column)"
    >
      <template #cell(pay-type)="data">
        <div class="justify-between">
          <span>{{ data.value.payType }}</span>
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
  import { TABLE_HEAD } from "../../../../utils/constant/pay/PayConstant";
  import { sortColumn } from "../../../../utils/functions/table-sort";
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
    },
    data() {
      return {
        showRefusalModal: false,
        tableFields: TABLE_HEAD.tHeadPayType,
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
    },
  
    methods: {
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
    },
  };
  </script>
  
  