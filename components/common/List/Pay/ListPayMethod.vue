ListPayMethod


<template>
  <custom-table
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    :allChecked="checkedAll"
    @column-header-clicked="headerColumnClick($event.column)"
  >
    <template #cell(name)="data">
      
      <div class="justify-between" :key="data.value.id">
        <span class="text-capitalize">{{ data.value.name }}</span>
      </div>
    </template>
    <template #cell(type)="data">
      <div class="justify-between">
        <span class="text-capitalize">{{ data.value.type.replaceAll('_', ' ') }}</span>
      </div>
    </template>
    <template #cell(created-on)="data">
      <div class="justify-between">
        <span class="text-capitalize">
          {{ formatIsoDateToYYYYMMDD(data.value.createdAt) }} -
          {{ getTimeFromDate(data.value.createdAt) }}
        </span>
      </div>
    </template>
    <template #cell(action)="data">
      <bib-button class="button-pop" pop="horizontal-dots" :variant="isLightThemeCheck ? 'light' : 'secondary'">
          <template v-slot:menu>
              <div class="list">
                  <span @click="handleActionChange('edit', data.value.id)" class="list__item">Edit</span>
                  <span @click="handleActionChange('delete', data.value.id)" class="list__item">Delete</span>
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
      if(column != "action"){
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
<style scoped>
  .text-capitalize{
    text-transform: capitalize;
  }
  .dropdown {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      display: inline-block;
      border: none;
      padding: 0;
      margin: 0;
  }
  .dropdown-menu {
    display: none;
    border-radius: 4px;
    position: absolute;
    min-width: 160px;
    z-index: 1;
    overflow: hidden;
    right: -30px;
    left: -70px;
  }

    .dropdown:hover .dropdown-menu {
        display: block;
    }

    .dropdown-menu span {
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        width: 100%;
        transition: background-color 0.3s;
    }

    .dropdown-menu span:hover {
        cursor: pointer;
        width: 100%;
        background-color: #292730;
    }
    .table tr td{
      color: #f4f4f4 !important;
    }

    .table tr tr{
      color: #8d8d8f !important;
    }
</style>