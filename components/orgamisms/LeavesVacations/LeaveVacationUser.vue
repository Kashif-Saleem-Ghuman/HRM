<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        :title="activeUserName"
        :avatar="activeUserData.photo"
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="pl-1 py-1">
      <div
        class="d-grid d-flex gap-1"
        style="grid-template-columns: repeat(3, 1fr)"
        v-if="is_data_fetched"
      >
        <info-card-leave-vacation
          title="Vacation"
          :daysUsed="allowanceLeavesDetailedData.vacationsUsed"
          totalAllowance="30"
          buttonLable="Request Vacation"
          icon="airplane-solid"
          className="button-wrapper__bgsucess"
          variant="white"
          @on-click="addLeaves('vacation')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Medical/sick"
          :daysUsed="allowanceLeavesDetailedData.otherLeavesUsed"
          totalAllowance="10"
          buttonLable="Request Medical Leave"
          icon="medical-clinic-solid"
          className="button-wrapper__bgalert"
          variant="white"
          @on-click="addLeaves('medical')"
        ></info-card-leave-vacation>
        <info-card-leave-vacation
          title="Request Personal leave"
          :daysUsed="allowanceLeavesDetailedData.medicalLeavesUsed"
          totalAllowance="12"
          buttonLable="Request Personal Leave"
          icon="accessibility-cognitive-disability-Solid"
          className="button-wrapper__bgwarnning"
          variant="white"
          @on-click="addLeaves('leave')"
        ></info-card-leave-vacation>
      </div>
    </div>
    <div class="d-flex justify-between align-center px-075">
      <div class="d-flex align-center">
        <div class="custom_date_picker">
          <!-- <div class="mr-05">Date:</div> -->
          <!-- <bib-datetime-picker
                    v-model="date2"
                    :format="format"
                    :parseDate="parseDate"
                    :formatDate="formatDate"
                    @input="onChange"
                    class="custom_date_picker"
                  ></bib-datetime-picker> -->
        </div>
      </div>
      <!-- <div class="d-flex align-center">
        <div class="d-flex align-center">
          <dropdown-menu
            :items="items"
            filterLabel="All"
            @click="filterItem($event)"
            style="margin-left: -10px; z-index: 1000"
            actionMenu="actionMenu"
          ></dropdown-menu>
        </div>
      </div> -->
    </div>
    <div class="py-1">
      <list-leave-attendance
        :leaveData="leaveVacationDataUser"
        :key="componentKeyUser"
        @delete-item="deleteItemConfirmation($event)"
        v-show="leaveVacationDataUser?.length ? true : false"
      ></list-leave-attendance>
      <div>
        <no-record
          v-show="leaveVacationDataUser?.length ? false : true"
        ></no-record>
      </div>
      <confirmation-modal
        :title="modalContent[0].title"
        :confirmationMessage="modalContent[0].message"
        :confirmastionMessageModal="confirmastionMessageModal"
        @close="closeconfirmastionMessageModal"
        @deleteLeave="deleteItem()"
      ></confirmation-modal>
      <loader v-bind:showloader="loading"></loader>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import fecha, { format } from "fecha";
import { DELETE_MESSAGE } from "../../../utils/constant/ConfirmationMessage";
import {
  getUserLeavesDetailUser,
  deleteLevaeVacation,
} from "../../../utils/functions/functions_lib_api";
import {
  getCurrentDateMonth,
  getCurrentYear,
} from "../../../utils/functions/functions_lib";
import { SORTING_MENU } from "../../../utils/constant/Constant";
import { INFO_CARD_LEAVE_VACATION_DATA } from "../../../utils/constant/Calander";
export default {
  data() {
    return {
      id: "",
      activeTab: "Dashborad",
      activeUserData: "",
      items: SORTING_MENU.leaveVacationUserFilter,
      activeUserName: "",
      infoCardData: INFO_CARD_LEAVE_VACATION_DATA,
      leaveVacationDataUser: [],
      currentMonth: fecha.format(new Date(), "MM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedYear: "2023",
      fromDate: "",
      toDate: "",
      componentKeyUser: 0,
      loading: false,
      allChecked: false,
      checked: false,
      confirmastionMessageModal: false,
      deleteItemId: "",
      modalContent: DELETE_MESSAGE.deleteConfirmationMessage,
      allowanceLeavesDetailedData: [],
      is_data_fetched: false
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
      getformToDate: "leavevacation/getformToDate",
      getUserRole: "token/getUserRole",
    }),
  },
  async created() {
    this.$root.$on("leaves-list", () => {
      this.componentKeyUser += 1;
      this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });
      this.leaveVacationDataUser = this.getLeaveVacationUser;
      console.log(this.getActiveUser.id, "getActiveUsergetActiveUser")
      // this.getUserLeavesDetail(item.employee.id)
    });
  },
  async mounted() {
    await this.$store.dispatch("employee/setUserList");
    await this.$store.dispatch("employee/setActiveUser");
    this.getUserLeavesDetailUser().then((result)=>{
      this.allowanceLeavesDetailedData = result
      this.is_data_fetched = true
    });
    this.activeUserData = this.getActiveUser;
    this.getCurrentYear();
    this.loading = true;
    this.selectedMonth = this.currentMonth;
    this.getCurrentYear();
    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    await this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    });
    this.leaveVacationDataUser = this.getLeaveVacationUser;
    this.activeUserName =
      this.activeUserData.firstName +
      " " +
      this.activeUserData.lastName +
      " / " +
      "Leaves and Vacations";
    this.loading = false;
    // fecha.format(new Date(this.leaveVacationDataUser.start), "YYYY/MM/DD"),
    // fecha.format(new Date(this.leaveVacationDataUser.end), "YYYY/MM/DD"),
  },
  methods: {
    getCurrentDateMonth,
    getCurrentYear,
    deleteLevaeVacation,
    getUserLeavesDetailUser,
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteItemConfirmation(event) {
      this.confirmastionMessageModal = true;
      this.deleteItemId = event;
      console.log(this.deleteItemId, "this.deleteItemId ");
    },
    async deleteItem() {
      await this.deleteLevaeVacation(this.deleteItemId);
      await this.getCurrentYear();
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then(() => {
          this.$nuxt.$emit("leaves-list");
        });
    },
    filterItem(event) {
      console.log(event, "filterItem");
      // if(event.key=='all'){
      //   for (var i = 0; i < this.items.length; i++){
      //     this.items[i].selected = !this.items[i].selected
      // }
      // }
      // console.log(event.key, "filterItem")
      // // event.selected = !event.selected
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar", $event);
      this.$nuxt.$emit("add-leave");
    },
  },
};
</script>
<style lang="scss">
.pagination {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px 0;
  margin: 0;
  border-radius: 5px;
  > li {
    display: inline; // Remove list-style and block-level defaults
    > a,
    > span {
      position: relative;
      float: left; // Collapse white-space
      padding: 5px 10px;
      line-height: 30px;
      text-decoration: none;
      color: #000;
      background-color: #d5e8d4;
      border: 1px solid #8dd488;
      margin-left: -1px;
    }
    &:first-child {
      > a,
      > span {
        margin-left: 0;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
    &:last-child {
      > a,
      > span {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
    }
  }
  > li > a,
  > li > span {
    &:hover {
      z-index: 2;
      color: #31a22c;
      background-color: #f2f5f1;
      // border-color: @pagination-hover-border;
    }
  }

  > .active > a,
  > .active > span {
    &,
    &:hover,
    &:focus {
      z-index: 3;
      color: #fff;
      background-color: #31a22c;
      // border-color: @pagination-active-border;
      cursor: default;
    }
  }
}
</style>
