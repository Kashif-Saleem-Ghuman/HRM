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
        <span>{{ data.value.name }}</span>
      </div>
    </template>
    <template #cell(pay-method-type)="data">
      <div class="justify-between">
        <span>{{ data.value.type }}</span>
      </div>
    </template>
    <template #cell(created-on)="data">
      <div class="justify-between">
        <span>
          {{ formatIsoDateToYYYYMMDD(data.value.createdAt) }} -
          {{ getTimeFromDate(data.value.createdAt) }}
        </span>
      </div>
    </template>

    <template #cell(action)="data">
      <div class="justify-between">
       <bib-input
      type="select" 
      :options="actionOptions" 
      placeholder="Select action"
      :disabled="false"
      @input="handleActionChange($event, data.value.id)"
    ></bib-input>
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
import {
  getTimeFromDate,
  formatIsoDateToYYYYMMDD,
} from "../../../../utils/functions/dates";

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
      actionOptions: [
        {label:"select action", value:''},
        { label: "Edit", value: "edit" },
        { label: "Delete", value: "delete" },
      ],
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
    getTimeFromDate,
    formatIsoDateToYYYYMMDD,
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
    handleActionChange(action, id) {
      if (action === "edit") {
        this.editRow(id);
      } else if (action === "delete") {
        this.deleteRow(id);
      }
      console.log("First place ", action, id);
      this.$emit("action-selected", { action, id });
    },
    editRow(rowData) {
      console.log("Editing row:", rowData);
      // Implement the edit functionality here
    },
    deleteRow(rowData) {
      console.log("Deleting row:", rowData);
      // Implement the delete functionality here
    },
  },
};
</script>

<style scoped>
.action-dropdown {
  width: 100%;
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
