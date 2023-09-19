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
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="section-wrapper custom-input">
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
            <bib-tabs
              :tabs="personalTabItem"
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
                          :errorMsgPrimaryEmail="errorMsgPrimaryEmail"
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
                        label="Cancel"
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
                        label="Cancel"
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

          <div id="files-information-wrapper">
            <div v-if="activeTab == personalTabItem[2].value">
              <div id="scroll-wrapper" class="scroll-wrapper">
                <div class="px-1">
                  <!-- my profile Info Wrapper Start Here  -->
                  <div id="my-profile-wrapper">
                    <div class="py-cus custom-dropzone" :key="fileList">
                      <bib-input
                        type="file"
                        ref="filesUploaded"
                        @files-dropped="handleChange__FileInput"
                        variant="accepted"
                        iconLeft="upload"
                        placeholder="Drop file here or click to upload"
                        style="margin-left: -8px"
                      ></bib-input>
                      <bib-button
                        label="Upload"
                        size="lg"
                        variant="success"
                        @click="fileUpload"
                      ></bib-button>
                    </div>
                    <div
                      class="d-grid gap-1"
                      style="grid-template-columns: repeat(4, 1fr)"
                    >
                      <template v-for="(file, key) in filesUploaded">
                        <div
                          class="shape-rounded mt-05 height-205 pl-05 d-flex justify-between align-center bg-light"
                        >
                          <div class="d-flex align-center">
                            <bib-icon
                              :icon="
                                file.name.split('.').pop() == 'pdf'
                                  ? 'pdf'
                                  : '' || file.name.split('.').pop() == 'docx'
                                  ? 'word'
                                  : '' || file.name.split('.').pop() == 'word'
                                  ? 'excel'
                                  : ''
                              "
                              variant="gray5"
                            ></bib-icon>

                            <h5
                              class="pl-025 font-w-400 of-hidden text-of-elipsis text-wrap"
                            >
                              {{ file.name }}
                            </h5>
                          </div>
                        </div>
                      </template>
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
  EMPLOYEE_PROFILE_TAB,
  SELECT_OPTIONS,
  COUNTRIES,
  STATES,
  WEEK_DAY,
} from "../../../../utils/constant/Constant.js";
import {
  TIMESHEET_DATA,
  DAY_VIEW_DATA,
  WEEK_VIEW_DATA,
} from "../../../../utils/constant/TimesheetData.js";
import {
  deleteLevaeVacation,
  getUserLeavesDetail,
  getTimesheet,
  getTimeAttendanceDaily,
  getTimeAttendanceCustomRange,
  addFiles,
  getFiles,
} from "../../../../utils/functions/functions_lib_api";
import {
  openPopupNotification,
  vfileAdded,
  updateAllData,
  handleInput,
  handleInputObject,
  getCurrentYear,
  getCurrentDateMonth,
  getCurrentWeek,
} from "../../../../utils/functions/functions_lib.js";
import { DELETE_MESSAGE } from "../../../../utils/constant/ConfirmationMessage";

import getJson from "../../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { MONTH_LIST, YEAR_LIST } from "../../../../utils/constant/Calander";
import { INFO_CARD_DATA } from "../../../../utils/constant/DashboardData";

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
      personalTabItem: EMPLOYEE_PROFILE_TAB,
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
      reportOptions: "",
      is_data_fetched: false,
      currentMonth: fecha.format(new Date(), "MM"),
      selectedMonth: "",
      fromDate: "",
      toDate: "",
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedYear: "2023",
      timesheetData: [],
      format: "MMM D, YYYY",
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      todayDate: fecha.format(new Date(), "YYYY-MM-DD"),
      errorMsgPrimaryEmail: false,
      files: [],
      filesUploaded: "",
      fileList: 0,
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
      getReportList: "employee/GET_REPORTS_LIST",
    }),
  },

  async created() {
    this.id = this.$route.params.id;
    // await this.users();
    this.$store.dispatch("token/setActiveTab", "Employee Profile");
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      await this.$store.dispatch("employee/setUser", this.id);
    } else {
      var users = this.getUser;
      await this.$store.dispatch("employee/setActiveUser");
      await this.$store.dispatch("token/setActiveUserId", this.getUser.id);
      await this.$store.dispatch("employee/setUser", this.getUser.id);
      this.form = users;
      this.id = this.getUser.id;
      this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.filesUploaded.reverse();
        //  this.fileList += 1;
      });
    }
  },

  async mounted() {
    this.selectedMonth = this.currentMonth;
    this.id = this.$route.params.id;
    this.getCurrentWeek();
    this.$store.dispatch("employee/setReportsToList").then((result) => {
      this.reportOptions = result;
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
      employeeId: this.id,
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
    getTimeAttendanceDaily,
    getTimeAttendanceCustomRange,
    addFiles,
    getFiles,
    getCurrentWeek,
    async handleChange__FileInput(files) {
      this.files = files;
    },
    async sendMeet() {
      var genratedId = this.form.userId;
      var meetId = await genratedId.toUpperCase();
      var id = await meetId.match(/.{1,6}/g);
      var newValue = id.join("-");
      window.open(
        "https://dev-connect.business-in-a-box.com/" +
          newValue +
          "?webcam=inactive",
        "_blank"
      );
    },
    sendMessage() {
      window.open(
        "https://dev-chat.business-in-a-box.com/directs/" + this.form.userId,
        "_blank"
      );
    },
    async fileUpload() {
      await this.addFiles(this.id, this.files);
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.filesUploaded.reverse();
      });
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    dateSlection(event) {
      var date = fecha.format(new Date(event), "YYYY-MM-DD");
      this.todayDate = date;
      this.getTimeAttendanceDaily(date);
    },
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
      if (this.activeTab == "Time & Attendance") this.getTimesheet();
      // this.getTimeAttendanceDaily(this.todayDate).then((result)=>{
      //   this.todayData = result
      //   console.log(this.todayData, "getformToDate");

      // });
    },
    viewChange(e) {
      if (e == "Today") {
        alert("called");
        this.todayListView = true;
        this.weekListView = false;
        this.monthListView = false;
        this.ViewTitle = "Today";
        this.getTimeAttendanceDaily();
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
.custom-dropzone {
  width: 50%;
  // height: auto;
  display: flex;
  border: 1px dotted #2ba026 !important;
  justify-content: space-between;
  background-color: #eef7ee;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
  margin: 20px 0;
  .input--file {
    // border: 1px dotted #dcdcdf !important;
    background: #fff;
    margin: 0 10px;
    border-radius: 6px;
  }
  .border-gray4 {
    border: none !important;
    margin-left: -15px;
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
