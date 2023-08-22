<template>
  <div class="my-profile-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper px-025 bottom_border_wrapper"
    >
      <section-header-left
        :title="
          form.firstName == undefined
            ? 'Add employee'
            : form.firstName + ' ' + form.lastName
        "
        bookmark="bookmark-solid"
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="section-wrapper custom-input">
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              :tabs="!this.$route.params.id ? personalTabItem.slice(0,2) : personalTabItem"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>
        <div class="main-wrapper">
          <!-- Employe Profile Wrapper Start Here  -->
          <div id="employee-profile-wrapper">
            <div v-if="activeTab == personalTabItem[0].value">
              <div id="scroll-wrapper" class="scroll-wrapper">
                <div class="py-cus px-1 d-flex align-center">
                  <drop-zone
                    :src="form.photo"
                    :className="form.photo != null ? 'hide' : ''"
                    :customRemove="form.photo == null ? 'hide' : 'hide'"
                    @vfileAdded="vfileAdded"
                  ></drop-zone>
                  <div v-show="form.photo == null ? false : true">
                    <aside style="font-weight: bold; font-size: 18px">
                      {{ form.firstName }} {{ form.lastName }}
                    </aside>
                    <aside style="font-weight: 400; font-size: 14px">
                      {{ form.jobTitle }}
                    </aside>
                  </div>
                </div>
                <div class="d-flex px-1" style="margin-top: -10px">
                  <button-gray
                    @on-click="sendMessage()"
                    icon="mail-new"
                    variant="gray1"
                    class="mr-05"
                    :scale="0.8"
                    title="Send Message"
                    titleClass="button-title"
                  ></button-gray>
                  <button-gray
                    @on-click="sendMeet()"
                    icon="device-mobile"
                    variant="gray1"
                    :scale="0.8"
                    title="Make a call"
                    titleClass="button-title"
                  ></button-gray>
                </div>
                <div class="px-1">
                  <div class="row">
                    <div class="col-6">
                      <!-- my profile Info Wrapper Start Here  -->
                      <div id="my-profile-wrapper">
                        <div class="py-cus row-custom">
                          <employee-profile
                            :firstName="form.firstName"
                            :lastName="form.lastName"
                            :maritalStatus="form.marital"
                            :maritalOptions="maritalOption"
                            :genderOptions="genderOptions"
                            :gender="form.gender"
                            :dob="form.dateOfBirth"
                            @input="handleInput"
                          ></employee-profile>
                        </div>
                      </div>

                      <!-- Contact Info Wrapper Start Here  -->
                      <div
                        id="contact-info-wrapper"
                        class="info-wrapper border-wrapper"
                      >
                        <div class="col-6">
                          <tabs-title
                            title="Contact"
                            variant="gray"
                            :scale="0.9"
                            class="py-1"
                          ></tabs-title>
                        </div>
                        <contact-info
                          :primaryEmail="form?.email"
                          :seondaryEmail="form?.seondaryEmail"
                          :homePhone="form?.homePhone"
                          :cellPhone="form?.phone"
                          @input="handleInput"
                        >
                        </contact-info>
                      </div>

                      <!-- address Info Wrapper Start Here  -->
                      <div id="address-wrapper" class="border-wrapper">
                        <div class="col-6">
                          <tabs-title
                            title="Address"
                            variant="gray"
                            :scale="0.9"
                            class="py-1"
                          ></tabs-title>
                        </div>
                        <div>
                          <address-detail
                            :street="form?.address?.addressLine1"
                            :suitApartment="form?.address?.addressLine2"
                            :country="form?.address?.country"
                            :countryOptions="countries"
                            :state="form?.address?.state"
                            :city="form?.address?.city"
                            :stateOptions="cureentState"
                            :stateVisible="stateVisible"
                            :postalCode="form?.address?.postalCode"
                            :errorMsgStreet="errorMsgStreet"
                            :errorMsgSuit="errorMsgSuit"
                            :errorMsgCountry="errorMsgCountry"
                            :errorMsgState="errorMsgState"
                            :otherStateShow="otherStateVisible"
                            :errorMsgPostalCode="errorMsgPostalCode"
                            @input="handleInput"
                          ></address-detail>
                        </div>
                      </div>
                      <!-- emergency detail Info Wrapper Start Here  -->
                      <div class="address-info-wrapper border-wrapper">
                        <div class="col-6">
                          <tabs-title
                            title="Emergency Contact"
                            variant="gray"
                            :scale="0.9"
                            class="py-1"
                          ></tabs-title>
                        </div>
                        <div>
                          <emergency-conta
                            :fullName="form?.emergencyContact?.name"
                            :releationships="
                              form?.emergencyContact?.relationship
                            "
                            :telephone="form?.emergencyContact?.phone"
                            :email="form?.emergencyContact?.email"
                            @input="handleInputObject"
                          ></emergency-conta>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="action-button">
                <div class="row mx-0 pl-1 pb-2 pt-1">
                  <div class="col-6 row-custom">
                    <div
                      class="d-flex justify-between align-center button-custom-wrapper"
                    >
                      <bib-button
                        label="Cancle"
                        variant="gray"
                        size="lg"
                        class="mr-1"
                        style="
                          width: 50%;
                          display: flex;
                          justify-content: center;
                        "
                      ></bib-button>
                      <bib-button
                        label="Save"
                        variant="success"
                        size="lg"
                        @click="updateAllData"
                        style="
                          width: 50%;
                          display: flex;
                          justify-content: center;
                        "
                      ></bib-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="employee-information-wrapper">
            <div v-if="activeTab == personalTabItem[1].value">
              <div id="scroll-wrapper" class="scroll-wrapper">
                <div class="px-1">
                  <div class="row">
                    <div class="col-6">
                      <!-- my profile Info Wrapper Start Here  -->
                      <div id="my-profile-wrapper">
                        <div class="py-cus row-custom">
                          <add-employement-info
                            :employeeStatus="form?.employeeStatus"
                            :esstatusOptions="statusOptions"
                            :employeeNumber="form?.employeeNo"
                            :socialInsuranceNumber="form?.sin"
                            :hireDate="form?.hireDate"
                            :employeeType="form?.sin"
                            @input="handleInput"
                          ></add-employement-info>
                        </div>
                      </div>

                      <!-- Contact Info Wrapper Start Here  -->
                      <div class="border-wrapper">
                        <div class="contact-info-wrapper">
                          <div class="row mx-0">
                            <div class="col-6">
                              <tabs-title
                                title="Placement"
                                variant="gray"
                                :scale="0.9"
                                class="py-1"
                              ></tabs-title>
                            </div>
                          </div>
                          <div>
                            <placement
                              :workTitle="form?.jobTitle"
                              :department="form?.department"
                              :reportsTo="form?.managerId"
                              :reportOptions="reportOptions"
                              :workEmail="form?.email"
                              :workTelephone="form?.phone"
                              :workExt="form?.workExt"
                              @input="handleInput"
                            ></placement>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="action-button">
                <div class="row mx-0 pl-1 pb-2 pt-1">
                  <div class="col-6 row-custom">
                    <div
                      class="d-flex justify-between align-center button-custom-wrapper"
                    >
                      <bib-button
                        label="Cancle"
                        variant="gray"
                        size="lg"
                        class="mr-1"
                        style="
                          width: 50%;
                          display: flex;
                          justify-content: center;
                        "
                      ></bib-button>
                      <bib-button
                        label="Save"
                        variant="success"
                        size="lg"
                        @click="updateAllData"
                        style="
                          width: 50%;
                          display: flex;
                          justify-content: center;
                        "
                      ></bib-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="time-attendance-wrapper">
            <div v-if="activeTab == personalTabItem[2].value">
              <div class="scroll_wrapper">
                <div class="time-attendance-wrapper">
                  <div
                    class="d-flex align-center bottom_border_wrapper px-1 py-05"
                  >
                    <label class="pr-05">View:</label>
                    <div style="position: relative">
                      <button-gray
                        variant="light"
                        :scale="1"
                        :title="ViewTitle"
                        style="height: 2.5rem; color: #000"
                        @on-click="show = !show"
                        v-click-outside="clickOutside"
                        class="pr-05"
                      ></button-gray>
                      <div class="menu-items">
                        <ul v-if="show">
                          <li class="d-flex align-center">
                            <span
                              class="ml-05"
                              @click="viewChange('Today')"
                              style="cursor: pointer"
                              >Today</span
                            >
                          </li>
                          <li class="d-flex align-center">
                            <span
                              class="ml-05"
                              @click="viewChange('Week')"
                              style="cursor: pointer"
                              >Week</span
                            >
                          </li>
                          <li class="d-flex align-center">
                            <span
                              class="ml-05"
                              @click="viewChange('Month')"
                              style="cursor: pointer"
                              >Month</span
                            >
                          </li>
                          <li class="d-flex align-center">
                            <span
                              class="ml-05"
                              @click="viewChange('Year')"
                              style="cursor: pointer"
                              >Year</span
                            >
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div class="button-items">
                      <!-- <label>Month:</label> -->
                      <select
                        class="select_month"
                        id="my-select"
                        ref="myInput"
                        style="height: 2.5rem"
                      >
                        <option
                          v-for="i in monthList"
                          :value="i.key"
                          :selected="i.key === currentYear ? true : false"
                        >
                          {{ i.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="px-1 py-05">
                    <div
                      class="d-grid d-flex gap-1 py-05"
                      style="grid-template-columns: repeat(3, 1fr)"
                    >
                      <info-card-timer
                        buttonLable="Online"
                        icon="table"
                        className="button-wrapper__bgsucess"
                        :employeeId="this.id"
                      ></info-card-timer>
                      <info-card-one
                        :item="timesheetData"
                        title="View Timesheet"
                        buttonLable="View timesheet past due"
                        icon="table"
                        profilePic="profilePic"
                        buttonVariant="light"
                        className="button-wrapper__bgwarnning"
                      ></info-card-one>

                      <info-card-help
                        custumBg="help-wrapper__bg-black"
                      ></info-card-help>
                    </div>
                  </div>
                  <div>
                    <list-day-admin
                      :listToday="todayData"
                      v-show="todayListView"
                    ></list-day-admin>
                    <list-week
                      :listWeek="weekDataView"
                      v-show="weekListView"
                    ></list-week>
                    <list-month
                      :listMonth="MonthViewData"
                      v-show="monthListView"
                    ></list-month>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="leave-vacation-wrapper py-cus">
            <div class="" id="tab_info_wrapper">
              <div v-if="activeTab == personalTabItem[3].value">
                <div class="scroll_wrapper">
                  <div class="px-1 py-05">
                    <div
                      class="d-grid d-flex gap-1 py-05"
                      style="grid-template-columns: repeat(3, 1fr)"
                      v-if="is_data_fetched"
                    >
                      <info-card-leave-vacation
                        title="Vacation"
                        :daysUsed="allowanceLeavesDetailedData.vacationsUsed"
                        totalAllowance="30"
                        buttonLable="Request Vacation"
                        icon="table"
                        className="button-wrapper__bgsucess"
                        variant="white"
                        @on-click="addLeaves('vacation')"
                      ></info-card-leave-vacation>
                      <info-card-leave-vacation
                        title="Medical/sick"
                        :daysUsed="allowanceLeavesDetailedData.medicalLeavesUsed"
                        totalAllowance="10"
                        buttonLable="Request Medical Leave"
                        icon="table"
                        className="button-wrapper__bgalert"
                        variant="white"
                        @on-click="addLeaves('medical')"
                      ></info-card-leave-vacation>
                      <info-card-leave-vacation
                        title="Request Personal leave"
                        :daysUsed="allowanceLeavesDetailedData.otherLeavesUsed"
                        totalAllowance="12"
                        buttonLable="Request Personal Leave"
                        icon="table"
                        className="button-wrapper__bgwarnning"
                        variant="white"
                        @on-click="addLeaves('leave')"
                      ></info-card-leave-vacation>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <!-- <loader v-bind:showloader="loading"></loader> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  USER_PROFILE_TAB,
  SELECT_OPTIONS,
  COUNTRIES,
  STATES,
  WEEK_DAY,
} from "../../../utils/constant/Constant.js";
import {
  TIMESHEET_DATA,
  DAY_VIEW_DATA,
  WEEK_VIEW_DATA,
} from "../../../utils/constant/TimesheetData.js";
import {
  deleteLevaeVacation,
  getUserLeavesDetail,
  getTimesheet,
} from "../../../utils/functions/functions_lib_api";
import {
  openPopupNotification,
  vfileAdded,
  updateAllData,
  handleInput,
  handleInputObject,
  getCurrentYear,
  getCurrentDateMonth,
} from "../../../utils/functions/functions_lib.js";
import { DELETE_MESSAGE } from "../../../utils/constant/ConfirmationMessage";

import getJson from "../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { MONTH_LIST, YEAR_LIST } from "../../../utils/constant/Calander";
import { INFO_CARD_DATA } from "../../../utils/constant/DashboardData";

import fecha from "fecha";
export default {
  data() {
    return {
      id: "",
      ViewTitle: "Today",
      monthList: YEAR_LIST,
      currentYear: fecha.format(new Date(), "YYYY"),
      infoCardData: INFO_CARD_DATA,
      todayData: DAY_VIEW_DATA,
      MonthViewData: TIMESHEET_DATA,
      weekDataView: WEEK_VIEW_DATA,
      todayListView: true,
      weekListView: false,
      monthListView: false,
      show: false,
      loading: false,
      showYear: false,
      activeRole: this.activeUserRole === "ADMIN" ? true : false,
      showButton: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      webPortalAccess: "true",
      personalTabItem: USER_PROFILE_TAB,
      usersOptions: "",
      formOptions: {},
      departmentOptions: "",
      genderOptions: SELECT_OPTIONS.genderOptions,
      maritalOption: SELECT_OPTIONS.maritalStatusOptions,
      statusOptions: SELECT_OPTIONS.esstatusOptions,
      countries: COUNTRIES,
      states: STATES,
      cureentState: STATES,
      teamOptions: "",
      emContact: false,
      activeTab: "Employee Profile",
      // Employee profile state
      dropzoneDisable: "pointer-events: none; cursor: default; opacity:0.5",
      fullName: "Vishwajeet Mandal",
      inactiveCommon: "disabled",
      form: {},
      formOptions: {},
      updateForm: {},
      isFlag: false,
      leaveVacationDataUser: [],
      allowanceLeavesDetailedData: [],
      confirmastionMessageModal: false,
      componentKeyUser: 0,
      modalContent: DELETE_MESSAGE.deleteConfirmationMessage,
      stateVisible: true,
      otherStateVisible: false,
      errorMsgStreet: false,
      errorMsgCountry: false,
      errorMsgPostalCode: false,
      errorMsgState: false,
      errorMsgSuit: false,
      reportOptions:'',
      is_data_fetched:false,
      currentMonth: fecha.format(new Date(), "MM"),
      selectedMonth: "",
      fromDate: "",
      toDate: "",
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedYear: "2023",
      timesheetData:[],
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      getUserId: "token/getUserId",
      activeUserRole: "token/getUserRole",
      getformToDate: "leavevacation/getformToDate",
      getLeaveVacationUser: "leavevacation/getLeaveVacationUser",
      getReportList:"employee/GET_REPORTS_LIST"
    }),
  },

  async created() {
    this.id = this.$route.params.id;
    // await this.users();
    await this.getCurrentDateMonth();

    this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });

    this.$root.$on("leaves-list", () => {
      this.componentKeyUser += 1;
      
      this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        employeeId:this.id

      });
      this.leaveVacationDataUser = this.getLeaveVacationUser;
    });
    this.$store.dispatch("token/setActiveTab", "Employee Profile");
    if (this.$route.params.id) {
      await this.$store.dispatch("employee/setUser", this.id);
      this.form = this.getUser;
      // this.getUserLeavesDetail(this.id).then((result)=>{
      //   this.allowanceLeavesDetailedData = result
      // this.is_data_fetched = true
      // });
      this.$store.dispatch("leavesdata/setLeaveVacationsAllowance", + this.id).then((result)=>{
        this.allowanceLeavesDetailedData = result;
        this.is_data_fetched = true;
      });
      
    } 
  },

  async mounted() {
    this.selectedMonth = this.currentMonth;
    this.id = this.$route.params.id;
    
    this.$store.dispatch("employee/setReportsToList").then((result)=>{
      this.reportOptions = result
    });
    this.formOptions = SELECT_OPTIONS;
    this.getCurrentYear();
    await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });
    await this.$store.dispatch("leavevacation/setLeaveVacationsUser", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
      employeeId:this.id
    });
    this.leaveVacationDataUser = this.getLeaveVacationUser;
  },
  methods: {
    openPopupNotification,
    vfileAdded,
    updateAllData,
    handleInput,
    handleInputObject,
    deleteLevaeVacation,
    getCurrentYear,
    getCurrentDateMonth,
    getUserLeavesDetail,
    getTimesheet,
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
    change(event, name) {
      this.updateForm[name] = event;
      console.log(this.updateForm, "switchLabelweekStarts");
    },
    addLeaves($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("add-leave");
    },
    showEmergency() {
      this.showEmergencyContact = true;
      this.emContact = false;
    },

    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if(this.activeTab == 'Time & Attendance')
       this.getCurrentDateMonth();
      await this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });
    console.log(this.getformToDate, "getformToDate")
      this.getTimesheet();
    },
    viewChange(e) {
      if (e == "Today") {
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.ViewTitle = "Today";
      }
      if (e == "Week") {
        this.todayListView = false;
        this.weekListView = true;
        this.monthListView = false;
        this.ViewTitle = "Week";
      }
      if (e == "Month") {
        this.todayListView = false;
        this.monthListView = true;
        this.weekListView = false;
        this.ViewTitle = "Month";
      }
      if (e == "Year") {
        alert("No list Found");
      }
    },
    clickOutside() {
      this.show = false;
    },
  },
};
</script>
<style lang="scss">
.scroll-wrapper {
  height: 70vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.section-wrapper {
  width: 100%;

  .section-left {
    width: 50%;
    height: 100%;
  }

  .section-mid {
    border-left: 1px solid #f2f2f5;
  }

  .section-right {
    width: 50%;
  }
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  select {
    margin-bottom: 12px !important;
    border-radius: 4px;
    padding: 8px;
  }
}
.dropdown span {
  display: inline-block;
  width: 80px;
}
.border-wrapper {
  border: solid 1px $light;
  border-radius: 5px;
  padding: 0px 10px 1rem 10px;
  margin-bottom: 16px;
}
.time-attendance-wrapper {
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid #f2f2f5;
      border-radius: 0.2rem;
      background-color: #f2f2f5;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: #fff;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: #fff;
    width: 97px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: 0px;
    top: 0px;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 0;
      }
    }
  }
}
.button-custom-wrapper {
  .button {
    text-align: center;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      justify-content: center;
    }
    div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
