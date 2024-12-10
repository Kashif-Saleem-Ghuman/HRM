<template>
  <custom-table
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    @select-all="$emit('selectAllItems')"
    :allChecked="checkedAll"
    @column-header-clicked="headerColumnClick($event.column)"
  >
    <!-- <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox
          size="md"
          :key="data.value.id"
          @change="
            $emit('item-checked', { id: data.value.id, key: data.value.id })
          "
          :checked="data.value.checked"
          :variant="isLightThemeCheck ? 'light' : 'secondary'"
        ></bib-checkbox>
      </div>
    </template> -->
    <template #cell(name)="data">
      <div class="d-flex align-center text-left gap-05 position-relative">
        <div
          class="cursor-pointer"
          v-on:mouseover="
            $profiletab('id_' + data.keyI + data.value.employee.id)
          "
          v-on:mouseleave="
            $profiletab('id_' + data.keyI + data.value.employee.id, true)
          "
        >
          <div class="avtar-contain">
            <bib-avatar
              variant="secondary-sub3 font-w-600"
              :text="$getEmployeeInitials(data.value.employee)"
              text-variant="primary"
              size="2.7rem"
              v-show="data.value.employee.photo === null"
            ></bib-avatar>
            <bib-avatar
              class="mt-auto mb-auto"
              shape="circle"
              :src="data.value.employee.photo"
              v-show="data.value.employee.photo != null"
              size="2.7rem"
            >
            </bib-avatar>
          </div>
          <div
            :id="'id_' + data.keyI + data.value.employee.id"
            class="userCard"
          >
            <user-info-card
              :user="data.value.employee"
              @viewProfile="viewProfile(data.value.employee.id)"
              @sendMeet.stop="
                makeCall(getUser.userId, data.value.employee.userId)
              "
              @sendMessage="sendMessage(data.value.employee.userId)"
              :contactButtons="$isActiveUser(data.value.employee.id)"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper">
          <div
            :title="$getEmployeeFullName(data.value.employee)"
            @click="employeeDetail(data)"
          >
            {{
              $getEmployeeFullName(data.value.employee)
                | truncate(truncateText, "...")
            }}
          </div>
          <div :class="isLightThemeCheck ? 'description' : 'text-gray1'">
            {{ data.value.employee.jobTitle }}
          </div>
        </div>
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
      console.log("event --- ", $event);

      this.$nuxt.$emit("open-sidebar-salaries", $event.value);
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
