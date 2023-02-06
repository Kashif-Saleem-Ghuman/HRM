<template>
  <div class="employee_wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper"
    >
      <section-header-left
        title="Employee Profile"
        bookmark="bookmark-solid"
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="section-wrapper custom-input px-1">
      <div class="tab-wrapper">
        <div class="row mx-0 pt-1">
          <div class="col-12">
            <bib-tabs
              :tabs="personalTabItem"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>
        <!-- Employe Profile Wrapper Start Here  -->
        <div id="employee-profile-wrapper">
          <div class="" id="tab_info_wrapper">
            <div v-if="activeTab == personalTabItem[0].value">
              <div class="row mx-0 pt-2">
                <div class="col-6">
                  <tabs-title
                    :title="personalTabItem[0].title"
                    variant="gray"
                    icon="info"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>

              <div class="py-cus">
                <drop-zone
                  :src="form.avatar"
                  :className="form.avatar != null ? 'hide' : ''"
                  :customRemove="form.avatar == null ? 'hide' : ''"
                  @vfileAdded="vfileAdded"
                  style="pointer-events: none; cursor: default"
                ></drop-zone>
              </div>
              <div>
                <div class="col-6 row-custom">
                  <div class="">
                    <employee-profile
                      :firstname="form.firstName"
                      :midname="form.middleName"
                      :lastname="form.lastName"
                      :department="form.department"
                      :title="form.title"
                      :employeeStatus="form.status"
                      :inActive="inactiveEmployeeProfile"
                    ></employee-profile>
                  </div>
                  <div
                    class="bg-light mt-1"
                    :class="seprator"
                    style="height: 1px"
                  ></div>
                  <!-- Contact Info Wrapper Start Here  -->
                  <div class="info-wrapper py-cus">
                    <div class="row mx-0">
                      <div class="col-6">
                        <tabs-title
                          :title="personalTabItem[2].title"
                          variant="gray"
                          icon="info"
                          :scale="0.9"
                        ></tabs-title>
                      </div>
                    </div>
                    <div class="py-cus">
                      <contact-info
                        :email="form.email"
                        :mobile="form.phone"
                        disabled="disabled"
                      ></contact-info>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="my-profile-wrapper">
          <div v-if="activeTab == personalTabItem[1].value">
            <div class="row mx-0 pt-2">
              <div class="col-6">
                <tabs-title
                  :title="personalTabItem[1].title"
                  variant="gray"
                  icon="info"
                  :updateButton="true"
                  @click="updateEmployeeProfile"
                  :scale="0.9"
                ></tabs-title>
              </div>
            </div>
            <div class="py-cus">
              <drop-zone
                :src="form.avatar"
                :className="form.avatar != null ? 'hide' : ''"
                :customRemove="form.avatar == null ? 'hide' : ''"
                @vfileAdded="vfileAdded"
                :style="dropzoneDisable"
              ></drop-zone>
            </div>
            <div>
              <div class="col-6 row-custom">
                <div class="">
                  <personal-information
                    :firstname="form.firstName"
                    :lastname="form.lastName"
                    :dob="form.dateOfBirth"
                    :gender="form.gender"
                    :options="formOptions.genderOptions"
                    :inActive="inactivePersonalInfo"
                    @input="handleInput"
                  ></personal-information>
                </div>
                <div class="row mx-0 pb-2 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      v-if="personalInfoUpdateButton"
                      variant="success"
                      @click="getAllData('rightAction')"
                    ></bib-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="contact-info-wrapper">
          <div v-if="activeTab == personalTabItem[2].value">
            <!-- Email Wrapper Start Here  -->
            <div id="email-wrapper">
              <div class="row mx-0 pt-2 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Personal email address"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updateEmail"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <email
                  :firstname="form.firstName"
                  :lastname="form.lastName"
                  :dob="form.dateOfBirth"
                  :gender="form.gender"
                  :options="formOptions.genderOptions"
                  :inActive="inactiveEmail"
                  @input="handleInput"
                ></email>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="emailUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <!-- Phone Wrppaer Start Here  -->
            <div id="email-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Telephone numbers"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updatePhone"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <phone
                  :firstname="form.firstName"
                  :lastname="form.lastName"
                  :dob="form.dateOfBirth"
                  :gender="form.gender"
                  :options="formOptions.genderOptions"
                  :inActive="inactivePhone"
                  @input="handleInput"
                ></phone>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="phoneUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <!-- Address Wrapper Start Here  -->
            <div id="email-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Address"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updateAddress"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <div id="duplicater0">
                  <address-info
                    :firstname="form.firstName"
                    :lastname="form.lastName"
                    :dob="form.dateOfBirth"
                    :gender="form.gender"
                    :options="formOptions.genderOptions"
                    :inActive="inactiveAddress"
                    @input="handleInput"
                  ></address-info>
                </div>
                <!-- <bib-button
                  label="asdhgajsdgbjashgdhjsa"
                  v-on:click="duplicate"
                ></bib-button> -->
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="addressUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        <div id="employeement-information-wrapper">
          <div v-if="activeTab == personalTabItem[3].value">
            <!-- Employee Information Wrapper Start Here  -->
            <div id="employee-information">
              <div class="row mx-0 pt-2 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Employee Information"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updateEmployeeInfo"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <employee-information
                  :hireDate="form.hireDate"
                  :socialInsuranceNumber="form.sin"
                  :dob="form.dateOfBirth"
                  :gender="form.gender"
                  :options="formOptions.genderOptions"
                  :inActive="inActiveEmployeeInfo"
                  @input="handleInput"
                ></employee-information>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="employeeInfoUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <!-- Employeement info Wrppaer Start Here  -->
            <div id="employeement-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Employeement Information"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updateEmployeementInfo"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <employeement-info
                  :effectiveDate="form.effectiveDate"
                  :departmentOptions="departmentOptions"
                  :teamOptions="teamOptions"
                  :title="form.title"
                  :reportsToOptions="usersOptions"
                  :inActive="inActiveEmployeementInfo"
                  @input="handleInput"
                ></employeement-info>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="employeementInfoUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <!--  ORG Contact Info Wrapper Start Here  -->
            <div id="contact-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Contact Info"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="contactInfo"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <contact-information
                  :firstname="form.firstName"
                  :lastname="form.lastName"
                  :dob="form.dateOfBirth"
                  :gender="form.gender"
                  :options="formOptions.genderOptions"
                  :inActive="inActiveContactInfo"
                  @input="handleInput"
                ></contact-information>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="contactInfoUpdateButton"
                    ></bib-button>
                  </div>
                </div>
                <div
                  class="bg-light mt-2"
                  :class="seprator"
                  style="height: 1px"
                ></div>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <loader v-bind:showloader="loading" :text="loaderMessage"></loader>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  EMPLOYEE_PROFILE_TAB,
  SELECT_OPTIONS,
} from "../../utils/constant/Constant.js";
import {
  openPopupNotification,
  vfileAdded,
  updateAllData,
  handleInput,
} from "../../utils/functions/functions_lib.js";
import {
  updateEmployeeProfile,
  updateEmail,
  updatePhone,
  updateAddress,
  updateEmployeeInfo, 
    updateEmployeementInfo, 
    contactInfo
} from "../../utils/functions/profile/index";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      showButton: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      personalTabItem: EMPLOYEE_PROFILE_TAB,
      usersOptions: "",
      formOptions: {},
      departmentOptions: "",
      teamOptions: "",
      // Employee profile state
      inactiveEmployeeProfile: "disabled",
      dropzoneDisable: "pointer-events: none; cursor: default; opacity:0.5",
      // Personal Information States
      inactivePersonalInfo: "disabled",
      personalInfoUpdateButton: false,
      // Contact Info States
      inactiveEmail: "disabled",
      inactivePhone: "disabled",
      inactiveAddress: "disabled",
      emailUpdateButton: false,
      phoneUpdateButton: false,
      addressUpdateButton: false,

      // Employeement Info States
      inActiveEmployeeInfo: "disabled",
      inActiveEmployeementInfo: "disabled",
      inActiveContactInfo: "disabled",
      employeeInfoUpdateButton: false,
      employeementInfoUpdateButton: false,
      contactInfoUpdateButton: false,

      inactiveCommon: "disabled",
      form: {},
      teamOption: "",
      formOptions: {},
      updateForm: {},
      isFlag: false,
      activeTab: "Employee Profile",
    };
  },

  fetch() {
    this.$store.dispatch("users/setUserList");
  },
  computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
      getUser: "users/GET_USER",
      getDepartment: "users/GET_DEPARTMENT_LIST",
      getReportsList: "users/GET_REPORTS_LIST",
      getTeamList: "users/GET_TEAM_LIST",
    }),
  },
  async mounted() {
    if (this.$router.history.current.fullPath == "/people") {
      this.$router.push("/myprofile");
      return;
    }
    await this.users();
    await this.department();
    await this.reports();
    await this.team();
    this.departmentOptions = this.getDepartment;
    console.log(this.getDepartment, "department")
    this.usersOptions = this.getReportsList;
    this.teamOptions = this.getTeamList;
    this.formOptions = SELECT_OPTIONS;
    if (process.client) {
      var userEmail = localStorage.getItem("userEmail");
      var users = this.userList.find((user) => user.email === userEmail);
      this.id = users.id;
      await this.user(this.id);
      this.form = this.getUser;
    }
    var team = this.form.teams;
    var teamOption = team.join(",  ");
    this.teamOption = teamOption;
  },
  methods: {
    ...mapActions({
      users: "users/setUserList",
      user: "users/setUser",
      department: "users/setDepartmentList",
      reports: "users/setReportsList",
      team: "users/setTeamList",
    }),
    duplicate() {
      var i = 0;
      var original = document.getElementById("duplicater" + i);
      var clone = original.cloneNode(true); // "deep" clone
      clone.id = "duplicetor" + ++i; // there can only be one element with an ID
      original.parentNode.appendChild(clone);
    },
    openPopupNotification,
    vfileAdded,
    updateAllData,
    handleInput,
    updateEmployeeProfile,
    updateEmail,
    updatePhone,
    updateAddress,
    updateEmployeeInfo, 
    updateEmployeementInfo, 
    contactInfo,
    sortBy() {
      alert("called");
    },
    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
  },
};
</script>
<style lang="scss">
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

.tabs {
  button {
    padding: 0 !important;
    margin-right: 1rem;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
