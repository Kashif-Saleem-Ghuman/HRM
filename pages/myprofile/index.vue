<template>
  <div class="employee_wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper"
    >
      <section-header-left
        :title="form.firstName + ' ' + form.lastName || 'Name comes here'"
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
                  :src="form.photo"
                  :className="form.photo != null ? 'hide' : ''"
                  :customRemove="form.photo == null ? 'hide' : 'hide'"
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
                      :title="form.jobTitle"
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
                  :updateButton="infoUpdatePersonalInformation"
                  @click="updatePersonalInformation"
                  :scale="0.9"
                ></tabs-title>
              </div>
            </div>
            <div class="py-cus">
              <drop-zone
                :src="form.photo"
                :className="form.photo != null ? 'hide' : ''"
                :customRemove="form.photo == null ? 'hide' : ''"
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
                    :updateButton="infoUpdatePersonalEmail"
                    @click="updateEmail"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <email
                  :email="form.email"
                  :additionalEmail="form.additionalEmail"
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
                    :updateButton="infoUpdateTelephoneNumber"
                    @click="updatePhone"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <phone
                  :homePhone="form.homePhone"
                  :mobile="form.mobile"
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
                    :updateButton="infoUpdateAddress"
                    @click="updateAddress"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <div id="duplicater0">
                  <address-info
                    :address="form.address"
                    :address2="form.address2"
                    :country="form.country"
                    :gender="form.gender"
                    :state="form.state"
                    :city="form.city"
                    :postalCode="form.postalCode"
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
                    :updateButton="infoUpdateEmployee"
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
                    :updateButton="infoUpdateEmployeement"
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
                    :updateButton="infoUpdateContactInfo"
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
        <div id="compensation-wrapper">
          <div v-if="activeTab == personalTabItem[4].value">
            <!-- Compensation Wrapper Start Here  -->
            <div id="employee-information">
              <div class="row mx-0 pt-2 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Compensation Package"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateCompensationPackage"
                    @click="updateCompensationPackage"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-12 row-custom">
                <compensation-package
                  :compenstaionPackage="form.gender"
                  :compenstaionPackageOption="compenstaionPackageOption"
                  :inActive="inActiveCompenstaionPackage"
                  @input="handleInput"
                ></compensation-package>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="compenstaionPackageUpdateButton"
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
            <!-- Compensation entry info Wrppaer Start Here  -->
            <div id="employeement-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Manual compensation entry"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateCompensationEntry"
                    @click="updateCompensationEntry"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <compensation-entry
                  :effectiveDate="form.effectiveDate"
                  :paySchedule="form.paySchedule"
                  :payScheduleOptions="payScheduleOptions"
                  :payType="form.payType"
                  :payTypeOptions="payTypeOptions"
                  :payRate="form.payRate"
                  :currency="form.currency"
                  :term="form.term"
                  :note="form.note"
                  :inActive="inActiveCompenstaionEntry"
                  @input="handleInput"
                ></compensation-entry>
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
            <div></div>
          </div>
        </div>
        <div id="benifit-wrapper">
          <div v-if="activeTab == personalTabItem[5].value">
            <!-- Compensation Wrapper Start Here  -->
            <div id="employee-information">
              <div class="row mx-0 pt-2 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Benefit Package"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateBenefitsPackage"
                    @click="updateBenefitsPackage"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-12 row-custom">
                <benefits-package
                  :benefitsPackage="form.gender"
                  :benefitsPackageOption="benefitsPackageOption"
                  :inActive="inActiveBenefitsPackage"
                  @input="handleInput"
                ></benefits-package>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="benefitsPackageUpdateButton"
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
            <!-- Benefits info Wrppaer Start Here  -->
            <div id="employeement-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Benefits"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateBenefits"
                    @click="updateBenefits"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <benefits
                  :effectiveDate="form.effectiveDate"
                  :benefitsPlanName="form.benefitsPlanName"
                  :benefitsPlanURL="form.benefitsPlanURL"
                  :inActive="inActiveBenefits"
                  @input="handleInput"
                ></benefits>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="benefitsUpdateButton"
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
        <div id="time-off-wrapper">
          <div v-if="activeTab == personalTabItem[6].value">
            <!-- Benefits info Wrppaer Start Here  -->
            <div id="employeement-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Time-off"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateTimeOff"
                    @click="updateTimeOff"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <time-off
                  :effectiveDate="form.effectiveDate"
                  :vacationAllowance="form.vacationAllowance"
                  :medicalAllowance="form.medicalAllowance"
                  :note="form.note"
                  :webPortalAccess="form.allowWebAccess"
                  :switchLabel="switchLabel"
                  @change-it="change"
                  :inActive="inActiveTimeOff"
                  @input="handleInput"
                ></time-off>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="timeOffUpdateButton"
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
        <div id="attendance-wrapper">
          <div v-if="activeTab == personalTabItem[7].value">
            <!-- Benefits info Wrppaer Start Here  -->
            <div id="employeement-info-wrapper">
              <div class="row mx-0 py-cus">
                <div class="col-6">
                  <tabs-title
                    title="Time-off"
                    variant="gray"
                    icon="info"
                    :updateButton="infoUpdateTimeAttendance"
                    @click="updateTimeAttendance"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="col-6 row-custom">
                <attendance
                  :orgSettings="form.orgSettings"
                  :trackAttendance="form.trackAttendance"
                  :weekStarts="form.weekStarts"
                  :switchLabelOrgSettings="switchLabelOrgSettings"
                  :switchLabelAttendance="switchLabelAttendance"
                  :switchLabelweekStarts="switchLabelweekStarts"
                  :weekStart="form.weekStart"
                  :weekCapacity="weekCapacity"
                  :timesheetDeadline="timesheetDeadline"
                  :timesheetOptions="timesheetOptions"
                  @change-it="change"
                  :inActive="inActiveTimeAttendance"
                  @input="handleInput"
                ></attendance>
                <div class="row mx-0 pt-1">
                  <div class="col-12">
                    <bib-button
                      label="Save"
                      size="lg"
                      variant="success"
                      @click="getAllData('rightAction')"
                      v-if="timeAttendanceUpdateButton"
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
        <div id="files-wrapper">
          <div v-if="activeTab == personalTabItem[9].value">
            <!-- Benefits info Wrppaer Start Here  -->
            <div id="folder-info-wrapper">
              <div>
                <div class="d-flex mt-1 mb-1" style="padding-left: 5px">
                  <button-green
                    @on-click="$emit('employee')"
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Create Folder"
                    titleClass="button-title"
                  ></button-green>
                  <button-green
                    @on-click="$emit('employee')"
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Upload"
                    titleClass="button-title"
                  ></button-green>
                </div>
                <div
                  class="bg-light mt-1 mb-1"
                  :class="seprator"
                  style="height: 1px;"
                ></div>
                <bib-detail-collapse label="Folders" open>
                  <template v-slot:content>
                    <div class="flex_grid">
                      <!-- <folders></folders> -->
                      <template v-for="folder in folderData">
                        <folders :folder="folder"></folders>
                      </template>
                    </div>
                  </template>
                </bib-detail-collapse>
                <div
                  class="bg-light mt-1 mb-1"
                  :class="seprator"
                  style="height: 1px"
                ></div>
                <bib-detail-collapse label="Files" open>
                  <template v-slot:content>
                    <div class="flex_grid">
                      <!-- <folders></folders> -->
                      <template v-for="files in filesData">
                        <files :files="files"></files>
                      </template>
                    </div>
                  </template>
                </bib-detail-collapse>
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
  FOLDERS_DATA,
  FILES_DATA,
} from "../../utils/constant/Constant.js";
import {
  openPopupNotification,
  vfileAdded,
  updateAllData,
  handleInput,
} from "../../utils/functions/functions_lib.js";
import {
  updatePersonalInformation,
  updateEmail,
  updatePhone,
  updateAddress,
  updateEmployeeInfo,
  updateEmployeementInfo,
  contactInfo,
  updateCompensationPackage,
  updateCompensationEntry,
  updateBenefitsPackage,
  updateBenefits,
  updateTimeOff,
  updateTimeAttendance,
} from "../../utils/functions/profile/index";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      folderData: FOLDERS_DATA,
      filesData: FILES_DATA,
      showButton: false,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      webPortalAccess: "true",
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
      infoUpdatePersonalInformation: true,

      // Contact Info States
      inactiveEmail: "disabled",
      inactivePhone: "disabled",
      inactiveAddress: "disabled",
      emailUpdateButton: false,
      phoneUpdateButton: false,
      addressUpdateButton: false,
      infoUpdatePersonalEmail: true,
      infoUpdateTelephoneNumber: true,
      infoUpdateAddress: true,

      // Employeement Info States
      inActiveEmployeeInfo: "disabled",
      inActiveEmployeementInfo: "disabled",
      inActiveContactInfo: "disabled",
      employeeInfoUpdateButton: false,
      employeementInfoUpdateButton: false,
      contactInfoUpdateButton: false,
      infoUpdateEmployee: true,
      infoUpdateEmployeement: true,
      infoUpdateContactInfo: true,

      // Compenstaion package states
      compenstaionPackageUpdateButton: false,
      inActiveCompenstaionPackage: "disabled",
      compenstaionEntryUpdateButton: false,
      inActiveCompenstaionEntry: "disabled",
      infoUpdateCompensationPackage: true,
      infoUpdateCompensationEntry: true,

      // Benefits package states
      benefitsPackageUpdateButton: false,
      benefitsUpdateButton: false,
      inActiveBenefitsPackage: "disabled",
      inActiveBenefits: "disabled",
      infoUpdateBenefitsPackage: true,
      infoUpdateBenefits: true,

      // Time-off states
      timeOffUpdateButton: false,
      inActiveTimeOff: "disabled",
      infoUpdateTimeOff: true,

      // Time-off states
      timeAttendanceUpdateButton: false,
      inActiveTimeAttendance: "disabled",
      infoUpdateTimeAttendance: true,
      switchLabelOrgSettings: "",
      switchLabelAttendance: "",
      switchLabelweekStarts: "",

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
    this.usersOptions = this.getReportsList;
    this.teamOptions = this.getTeamList;
    this.formOptions = SELECT_OPTIONS;
    if (process.client) {
      var userEmail = localStorage.getItem("userEmail");
      var users = this.userList.find((user) => user.email === userEmail);
      this.id = users.id;
      await this.user(this.id);
      this.form = this.getUser;
      this.switchLabelOrgSettings = this.form.switchLabelOrgSettings = null
        ? "Yes"
        : "No";
      this.switchLabelAttendance = this.form.switchLabelAttendance = null
        ? "Yes"
        : "No";
      this.switchLabelweekStarts = this.form.switchLabelweekStarts = null
        ? "Yes"
        : "No";
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
    change(event, name) {
      this.updateForm[name] = event;
      console.log(this.updateForm, "switchLabelweekStarts");
    },
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
    updatePersonalInformation,
    updateEmail,
    updatePhone,
    updateAddress,
    updateEmployeeInfo,
    updateEmployeementInfo,
    contactInfo,
    updateCompensationPackage,
    updateCompensationEntry,
    updateBenefitsPackage,
    updateBenefits,
    updateTimeOff,
    updateTimeAttendance,
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
