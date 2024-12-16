<template>
  <custom-table
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    :allChecked="checkedAll"
    @column-header-clicked="headerColumnClick($event.column)"
  >
    <template #cell(id)="data">
      <div class="justify-between" @click="employeeDetail()">
        <span>{{ data.value.id }}</span>
      </div>
    </template>
    <template #cell(location)="data">
      <div class="justify-between">
        <span>{{ data.value.location }}</span>
      </div>
    </template>
    <template #cell(pay-period)="data">
      <div class="justify-between">
        <span>{{ data.value.payPeriod }}</span>
      </div>
    </template>
    <template #cell(pay-method)="data">
      <div class="justify-between">
        <span>{{ data.value.payMethod }}</span>
      </div>
    </template>
    <template #cell(next-close-day)="data">
      <div class="justify-between">
        <span
          >{{ formatIsoDateToYYYYMMDD(data.value.nextCloseDay) }} -
          {{ getTimeFromDate(data.value.nextCloseDay) }}</span
        >
      </div>
    </template>
    <template #cell(next-run-day)="data">
      <div class="justify-between">
        <span>
          {{ formatIsoDateToYYYYMMDD(data.value.nextRunDay) }} -
          {{ getTimeFromDate(data.value.nextRunDay) }}
        </span>
      </div>
    </template>
    <template #cell(status)="data">
      <div class="justify-between">
        <div
          class="d-flex status-chip text-white cursor-pointer"
          :class="getStatusClasses(data.value.status)"
        >
          <span>{{ data.value.status }}</span>
          <bib-icon icon="arrowhead-down" variant="white"></bib-icon>
        </div>
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
    payPlansList: {
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
      tableFields: TABLE_HEAD.tHeadPayPlans, 
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
      if (!this.sortByField) return this.payPlansList;

      return sortColumn({ items: this.payPlansList, field: this.sortByField });
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
      this.$nuxt.$emit("open-sidebar-pay-plan");
    },
    getStatusClasses(status) {
      if (status == "pending") {
        return "bg-secondary";
      } else if (status == "approved") {
        return "bg-success ";
      } else {
        return "bg-danger";
      }
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

.status-chip {
  padding: 2px;
  border-radius: 16px;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
  text-transform: capitalize;
}
</style>
