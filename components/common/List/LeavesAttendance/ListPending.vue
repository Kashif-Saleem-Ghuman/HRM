<template>
  <custom-table
    :fields="tableFields"
    :sections="leavePendingList"
    :hide-no-column="true"
    @select-all="$emit('selectAllItems')"
    :allChecked="checkedAll"
    @column-header-clicked="headerColumnClick($event.column)"
  >
    <template #cell_action="data">
      <div class="d-flex justify-center align-center">
        <bib-checkbox
          size="md"
          :key="data.value.id"
          @change="
            $emit('item-checked', { id: data.value.id, key: data.value.id })
          "
          :checked="data.value.checked"
        ></bib-checkbox>
      </div>
    </template>
    <template #cell(name)="data">
      <div class="d-flex align-center text-left gap-05 position-relative">
        <div
          class="cursor-pointer"
          v-on:mouseover="profiletab('id_' + data.value.employee.id)"
          v-on:mouseleave="profiletab('id_' + data.value.employee.id, true)"
        >
          <bib-avatar
            variant="secondary-sub3 font-w-600"
            :text="getEmployeeInitials(data.value.employee)"
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
          <div :id="'id_' + data.value.employee.id" class="userCard">
           
            <user-info-card
              :user="data.value.employee"
              @viewProfile="viewProfile(data.value.employee.id)"
              @sendMeet.stop="makeCall(getUser.userId, data.value.employee.userId)"
              @sendMessage="sendMessage(data.value.employee.userId)"
            ></user-info-card>
          </div>
        </div>
        <div class="info_wrapper">
          <div
            class="title-user"
            :title="getEmployeeFullName(data.value.employee)"
          >
            {{
              getEmployeeFullName(data.value.employee)
                | truncate(truncateText, "...")
            }}
          </div>
          <div class="description">
            {{ data.value.employee.jobTitle }}
          </div>
        </div>
      </div>
    </template>
    <!-- <template #cell(recived)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.id }}</span>
      </div>
    </template> -->
    <template #cell(type)="data">
      <div class="justify-between text-dark">
        <span class="capitalize">{{ data.value.type }}</span>
      </div>
    </template>
    <template #cell(start)="data">
      <div class="justify-between text-dark">
        <span>{{ onLoad(data.value.start) }}</span>
      </div>
    </template>
    <template #cell(end)="data">
      <div class="justify-between text-dark">
        <span>{{ onLoad(data.value.end) }}</span>
      </div>
    </template>
    <template #cell(duration)="data">
      <div class="justify-between text-dark">
        <span>{{
          data.value.duration == null
            ? "N/A"
            : `${data.value.duration} day${data.value.duration > 1 ? "s" : ""}`
        }}</span>
      </div>
    </template>
    <template #cell(reason)="data">
      <div class="justify-between text-dark">
        <span>{{ data.value.note }}</span>
      </div>
    </template>
    <template #cell(action)="data">
      <div class="d-flex align-center justify-center space-between">
        <bib-button
          :icon="$button.approved_g.icon"
          :variant="$button.approved_g.variant"
          :scale="$button.approved_g.scale"
          :label="$button.approved_g.label"
          class="mr-05"
          :disabled="disabled"
          @click="$emit('approve-item', data.value.id)"
        ></bib-button>
        <bib-button
          :icon="$button.rejected.icon"
          :variant="$button.rejected.variant"
          :scale="$button.rejected.scale"
          :label="$button.rejected.label"
          class="mr-05"
          :disabled="disabled"
          @click="$emit('reject-item', data.value.id)"
        ></bib-button>
      </div>
    </template>
  </custom-table>
</template>

<script>
import fecha, { format } from "fecha";
import { mapGetters } from "vuex";
import { TABLE_HEAD } from "../../../../utils/constant/Constant";
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "../../../../utils/functions/common_functions";
import { sortColumn } from "../../../../utils/functions/table-sort";
import {
  meetLink,
  sendMessage,
  makeCall,
} from "../../../../utils/functions/functions_lib";
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
    disabled:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      showRefusalModal: false,
      tableFields: TABLE_HEAD.tHeadLeaveVacationPending,
      attendanceClass: [],
      satisfaction: "",
      userPhotoClick: false,
      sortByField: null,
    };
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
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
    getEmployeeFullName,
    getEmployeeInitials,
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
    onLoad(item) {
      return fecha.format(new Date(item), "DD-MMM-YYYY");
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
    profiletab(name, isLeave) {
      document.querySelector("#" + name).style.display = isLeave
        ? "none"
        : "block";
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
