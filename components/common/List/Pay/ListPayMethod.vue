<template>
  <custom-table
    v-if="leavePendingList?.length > 0"
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    :allChecked="checkedAll"
    :cellActionIcon="'table-column-solid'"
    @column-header-clicked="headerColumnClick($event.column)"
  >
    <template #cell(name)="data">
      <div class="justify-between" :key="data.value.id">
        <span class="capitalize">{{ data.value.name }}</span>
      </div>
    </template>
    <template #cell(type)="data">
      <div class="justify-between">
        <span class="capitalize">{{
          data.value.type.replaceAll("_", " ")
        }}</span>
      </div>
    </template>
    <template #cell(created-on)="data">
      <div class="justify-between">
        <span class="capitalize">
          {{ formatIsoDateToYYYYMMDD(data.value.createdAt) }}
        </span>
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
              @click="handleActionChange('edit', data.value.id)"
              class="list__item"
              >Edit</span
            >
            <span
              @click.stop="handleActionChange('delete', data.value.id)"
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
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../../../utils/constant/pay/PayConstant";
import { sortColumn } from "../../../../utils/functions/table-sort";
import {
  meetLink,
  sendMessage,
  makeCall,
} from "../../../../utils/functions/functions_lib";
import { formatIsoDateToYYYYMMDD } from "../../../../utils/functions/dates";

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
      if (column != "action") {
        this.sortColumn(column);
      }
    },
    employeeDetail() {
      this.$nuxt.$emit("open-sidebar-salaries");
    },
    handleActionChange(action, id) {
      if (action === "edit" || action === "delete") {
        this.$emit("action-selected", { action, id });
      }
    },
  },
};
</script>
