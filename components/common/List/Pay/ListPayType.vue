<template>
  <custom-table
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    :allChecked="checkedAll"
    @column-header-clicked="headerColumnClick($event.column)"
    cellActionIcon="table-column-solid"
  >
    <template #cell(name)="data">
      <div class="justify-between">
        <span>{{ data.value.name }}</span>
      </div>
    </template>
    <template #cell(created-on)="data">
      <div class="justify-between">
        <span
          >{{ formatIsoDateToYYYYMMDD(data.value.createdAt) }} -
          {{ getTimeFromDate(data.value.createdAt) }}</span
        >
      </div>
    </template>
    <template #cell_action_right="data">
      <bib-button
        class="button-pop"
        pop="horizontal-dots"
        :variant="isLightThemeCheck ? 'light' : 'secondary'"
      >
        <template v-slot:menu>
          <div class="list">
            <span
              @click="handleActionChange('edit', data.value)"
              class="list__item"
              >Edit</span
            >
            <span
              @click.stop="handleActionChange('delete', data.value)"
              class="list__item"
              >Delete</span
            >
          </div>
        </template>
      </bib-button>
    </template>
  </custom-table>
</template>

<script>
import { TABLE_HEAD } from "../../../../utils/constant/pay/PayConstant";
import {
  getTimeFromDate,
  formatIsoDateToYYYYMMDD,
} from "../../../../utils/functions/dates";
import { sortColumn } from "../../../../utils/functions/table-sort";
export default {
  props: {
    payTypeList: {
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
      if (!this.sortByField) return this.payTypeList;

      return sortColumn({ items: this.payTypeList, field: this.sortByField });
    },
  },

  methods: {
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
    handleActionChange(action, data) {
      if (action === "edit" || action === "delete") {
        this.$emit("action-selected", { action, data });
      }
    },
  },
};
</script>
