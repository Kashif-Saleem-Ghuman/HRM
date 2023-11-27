<template>
  <div class="my-profile-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper px-025 bottom_border_wrapper"
    >
      <section-header-left
        :title="
          name.firstName == undefined
            ? '--'
            : name.firstName + ' ' + name.lastName
        "
        :avatar="name.photo"
        :key="topNav"
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
              <employee-profile-form></employee-profile-form>
            </div>
          </div>

          <div id="files-information-wrapper">
            <div v-if="activeTab == personalTabItem[1].value">
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
                        variant="primary"
                        @click="fileUpload"
                      ></bib-button>
                    </div>
                    <div
                      class="d-grid gap-1"
                      style="grid-template-columns: repeat(4, 1fr)"
                    >
                      <div
                        v-for="file in filesUploaded"
                        class="cursor-pointer shape-rounded mt-05 height-205 pl-05 d-flex justify-between align-center bg-light"
                        @click="handleFileClick(file)"
                        :key="file.id"
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  COUNTRIES,
  EMPLOYEE_PROFILE_TAB,
  SELECT_OPTIONS,
  STATES,
} from "../../../../utils/constant/Constant.js";

import {
  handleInput,
  handleInputObject,
  openPopupNotification,
  sendMeet,
  sendMessage,
  updateAllData,
  vfileAdded,
} from "../../../../utils/functions/functions_lib.js";
import {
  addFiles,
  getFiles,
} from "../../../../utils/functions/functions_lib_api";

import { downloadEmployeeFile } from "@/utils/functions/api_call/employees";

import fecha from "fecha";
import getJson from "../../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      loading: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      usersOptions: "",
      formOptions: {},
      departmentOptions: "",
      personalTabItem: EMPLOYEE_PROFILE_TAB,
      genderOptions: SELECT_OPTIONS.genderOptions,
      maritalOption: SELECT_OPTIONS.maritalStatusOptions,
      statusOptions: SELECT_OPTIONS.esstatusOptions,
      countries: COUNTRIES,
      states: STATES,
      currentState: STATES,
      teamOptions: "",
      emContact: false,
      activeTab: "Employee Profile",
      // Employee profile state
      dropzoneDisable: "pointer-events: none; cursor: default; opacity:0.5",
      inactiveCommon: "disabled",
      form: {},
      formOptions: {},
      updateForm: {},
      isFlag: false,
      confirmastionMessageModal: false,
      componentKeyUser: 0,
      stateVisible: true,
      otherStateVisible: false,
      errorMsgStreet: false,
      errorMsgCountry: false,
      errorMsgPostalCode: false,
      errorMsgState: false,
      errorMsgSuit: false,
      reportOptions: "",
      is_data_fetched: false,
      format: "MMM D, YYYY",
      date2: fecha.format(new Date(), "YYYY-MM-DD"),
      todayDate: fecha.format(new Date(), "YYYY-MM-DD"),
      errorMsgPrimaryEmail: false,
      files: [],
      filesUploaded: "",
      fileList: 0,
      topNav: 0,
      name: {},
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      activeUserRole: "token/getUserRole",
      getReportList: "employee/GET_REPORTS_LIST",
      getActiveUserData: "token/getActiveUserData",
    }),
  },

  async created() {
    await this.$store.dispatch("employee/setActiveUser");
    await this.$store.dispatch("employee/setUser", this.getUser.id);
    var users = this.getUser;

    this.form = users;
    this.id = this.getUser.id;
    this.name = users;
    this.getFiles(this.id).then((result) => {
      this.filesUploaded = result;
      this.filesUploaded.reverse();
    });
    this.$root.$on("top-nav-key", () => {
      this.$store
        .dispatch("employee/setUser", this.getUser.id)
        .then((result) => {
          this.name = result;
          this.topNav += 1;
        });
    });
  },

  async mounted() {
    this.$store.dispatch("employee/setReportsToList").then((result) => {
      this.reportOptions = result;
    });
  },
  methods: {
    openPopupNotification,
    vfileAdded,
    updateAllData,
    handleInput,
    handleInputObject,
    addFiles,
    getFiles,
    sendMeet,
    sendMessage,

    handleFileClick(file) {
      this.downloadFile(file);
    },

    async downloadFile(file) {
      try {
        const blob = await downloadEmployeeFile({
          employeeId: this.id,
          fileId: file.id,
        });
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = file.name;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading file", error);
      }
    },
    async handleChange__FileInput(files) {
      this.files = files;
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
  display: flex;
  border: 1px dotted #2ba026 !important;
  justify-content: space-between;
  background-color: #eef7ee;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
  margin: 20px 0;
  .input--file {
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
  margin-right: -5px;
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
