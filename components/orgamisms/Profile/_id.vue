<template>
    <div class="my-profile-wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper px-025 bottom_border_wrapper"
      >
        <section-header-left
          :title="
            form.firstName == undefined
              ? 'User Name'
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
                :tabs="personalTabItem"
                :value="activeTab"
                @change="handleChange_Tabs"
              ></bib-tabs>
            </div>
          </div>
          <div class="px-1 main-wrapper">
            <!-- Employe Profile Wrapper Start Here  -->
            <div id="employee-profile-wrapper">
              <div v-if="activeTab == personalTabItem[0].value">
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
                  <div class="col-6">
                    <!-- my profile Info Wrapper Start Here  -->
                    <div id="my-profile-wrapper">
                      <div class="row-custom py-cus">
                       
                        <employee-profile
                          :firstName="form.firstName"
                          :lastName="form.lastName"
                          :maritalStatus="form.marital"
                          :maritalOptions="maritalOption"
                          :genderOptions="genderOptions"
                          :gender="form.gender"
                          :dob="form.dateOfBirth"
                          :inActive="inactiveCommon"
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
                        :inActive="inactiveCommon"
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
                          :streetState="form?.address?.street"
                          :suitApartmentState="form?.address?.suitApartment"
                          :countryState="form?.address?.country"
                          :countryOptions="countries"
                          :stateState="form?.address?.state"
                          :stateOptions="cureentState"
                          :postalCodeState="form?.address?.postalCode"
                          :inActive="inactiveCommon"
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
                          :fullNameState="fullName"
                          :releationshipsState="
                            form?.emergencyContacts?.releationships
                          "
                          :telephoneState="form?.emergencyContacts?.telephone"
                          :emailState="form?.emergencyContacts?.email"
                          :inActive="inactiveCommon"
                        ></emergency-conta>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="employee-information-wrapper py-cus">
              <div class="row mx-0">
                <div class="col-6">
                  <div class="" id="tab_info_wrapper">
                    <div v-if="activeTab == personalTabItem[1].value">
                      <div class="scroll_wrapper">
                        <div class="py-cus row-custom">
                          <add-employement-info
                          :employeeStatusState="form?.employeeStatus"
                          :esstatusOptions="statusOptions"
                          :employeeNumberState="form?.employeeNumber"
                          :socialInsuranceNumberState="form?.sin"
                          :hireDateState="form?.hireDate"
                          :employeeTypeState="form?.employeeType"
                            @input="handleInput"
                            :inActive="inactiveCommon"
                          ></add-employement-info>
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
                              :workTitleState="form?.workTitle"
                              :departmentState="form?.department"
                              :reportsToState="form?.reportsTo"
                              :workEmailState="form?.workEmail"
                              :workTelephoneState="form?.workTelephone"
                              :workExtState="form?.workExt"
                              :inActiveState="form?.inactiveCommon"
                              ></placement>
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
  } from "../../../utils/constant/Constant.js";
  import {
    openPopupNotification,
    vfileAdded,
    updateAllData,
    handleInput,
    handleInputObject,
  } from "../../../utils/functions/functions_lib.js";
  
  import getJson from "../../../utils/dataJson/app_wrap_data";
  const appWrapItems = getJson();
  
  export default {
    data() {
      return {
        id: "",
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
      };
    },
    computed: {
      ...mapGetters({
        getUser: "employee/GET_USER",
        getAccessToken: "token/getAccessToken",
        getUserId: "token/getUserId",
        activeUserRole: "token/getUserRole",
      }),
    },
  
    async created() {
      // await this.users();
      this.$store.dispatch("token/setActiveTab", "Employee Profile");
      if (this.$route.params.id) {
        this.id = this.$route.params.id;
        await this.$store.dispatch("employee/setUser", this.id);
      } else {
        var users = this.getUser;
        this.id = users.id
        await this.$store.dispatch("employee/setActiveUser");
        await this.$store.dispatch("token/setActiveUserId", this.getUser.id);
        await this.$store.dispatch("employee/setUser", this.getUser.id);     
        this.form = users;
      }
  
      this.form = this.getUser;
      if (!this.form.address?.country) {
        this.cureentState = this.states.filter((item, index) => {
          return item;
        });
      }
      if (this.form.address?.country === "Canada") {
        this.cureentState = this.states.filter((item, index) => {
          return item;
        });
      }
      if (this.form.address?.country === "USA") {
        this.cureentState = this.states.filter((item, index) => {
          return item;
        });
      } else {
      }
    },
    
    async mounted() {
      this.formOptions = SELECT_OPTIONS;
    },
    methods: {
      change(event, name) {
        this.updateForm[name] = event;
        console.log(this.updateForm, "switchLabelweekStarts");
      },
      showEmergency() {
        this.showEmergencyContact = true;
        this.emContact = false;
      },
      openPopupNotification,
      vfileAdded,
      updateAllData,
      handleInput,
      handleInputObject,
      async handleChange_Tabs(tab) {
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
  </style>
  