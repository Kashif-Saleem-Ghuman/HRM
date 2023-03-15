<template>
  <div class="employee_wrapper">
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
            <div class="" id="tab_info_wrapper">
              <div v-if="activeTab == personalTabItem[0].value">
                <div class="scroll_wrapper">
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
                          :departmentOptions="departmentOptions"
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
                            :personalPhone="form.personalPhone"
                            :extension="form.extension == '' ? '' : 'extension'"
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
          </div>
          <div id="personal-information-wrapper">
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
                      :genderOptions="genderOptions"
                      :maritalStatus="form.maritalStatus"
                      :maritalOptions="maritalOption"
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
                        @click="updateAllData()"
                      ></bib-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="contact-info-wrapper">
            <div v-if="activeTab == personalTabItem[2].value">
              <div class="scroll_wrapper">
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
                      :personalEmail="form.personalEmails"
                      :inActive="inactiveEmail"
                      @input="handleInput"
                    ></email>
                    <div class="row mx-0 pt-1">
                      <div class="col-12">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateAllData()"
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
                <div id="phone-wrapper">
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
                      :personalPhone="form.personalPhone"
                      :mobile="form.phone"
                      :inActive="inactivePhone"
                      @input="handleInput"
                    ></phone>
                    <div class="row mx-0 pt-1">
                      <div class="col-12">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateAllData()"
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
                <div id="address-wrapper">
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
                    <div>
                      <address-info
                        :address="form?.addresses[0]?.street"
                        :address2="form?.address2"
                        :country="form.addresses[0]?.country"
                        :countryOptions="countries"
                        :state="form.addresses[0]?.state"
                        :stateOptions="cureentState"
                        :stateVisible="stateVisible"
                        :city="form?.addresses[0]?.city"
                        :postalCode="form?.addresses[0]?.postalCode"
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
                          @click="updateAllData()"
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
                <!-- Emergency Contact Wrppaer Start Here  -->
                <div id="emergency-contact-wrapper">
                  <div class="row mx-0 py-cus">
                    <div class="col-6">
                      <tabs-title
                        title="Emergency Contact"
                        variant="gray"
                        icon="info"
                        :updateButton="infoUpdateEmergencyContact"
                        @click="updateEmergencyContact"
                        :scale="0.9"
                      ></tabs-title>
                    </div>
                  </div>
                  <div class="col-6 row-custom">
                    <div>
                      <emergency-contact
                        :fullName="form.emergencyContacts[0]?.name"
                        :releationships="
                          form.emergencyContacts[0]?.relationship
                        "
                        :telephone="form.emergencyContacts[0]?.phone"
                        :email="form.emergencyContacts[0]?.email"
                        :inActive="inactiveEmergencyContact"
                        emContact="emContact"
                        @input="handleInputObject"
                      ></emergency-contact>
                    </div>
                  </div>
                  <div class="col-6 row-custom" v-if="showEmergencyContact">
                    <div>
                      <emergency-contact
                        :fullName="form.emergencyContacts[1]?.name"
                        :releationships="
                          form.emergencyContacts[1]?.relationship
                        "
                        :telephone="form.emergencyContacts[1]?.phone"
                        :email="form.emergencyContacts[1]?.email"
                        :inActive="inactiveEmergencyContact"
                        @input="handleInputObject"
                        emContact="emContact1"
                      ></emergency-contact>
                    </div>
                  </div>
                  <div class="row mx-0 pt-1">
                    <div class="col-12 pb-1">
                      <div class="d-flex">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateAllData()"
                          v-if="emergencyContactUpdateButton"
                          class="mr-1"
                        ></bib-button>
                        <button-green
                          @on-click="showEmergency"
                          variant="success"
                          v-if="emContact"
                          :scale="1"
                          :title="
                            this.form.emergencyContacts.length >= 2
                              ? 'Edit another emergency contact'
                              : ' Add another emergency contact'
                          "
                          titleClass="button-title"
                        ></button-green>
                      </div>
                    </div>
                  </div>
                  <div
                    class="bg-light mt-2"
                    :class="seprator"
                    style="height: 1px"
                  ></div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div id="employeement-information-wrapper">
            <div v-if="activeTab == personalTabItem[3].value">
              <!-- Employee Information Wrapper Start Here  -->
              <div class="scroll_wrapper">
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
                      :employeeNumber="form.id"
                      :employeeStatus="form.status"
                      :esstatusOptions="statusOptions"
                      :inActive="inActiveEmployeeInfo"
                      @input="handleInput"
                    ></employee-information>
                    <div class="row mx-0 pt-1">
                      <div class="col-12">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateAllData()"
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
                      :department="form.department"
                      :departmentOptions="departmentOptions"
                      :team="form.teams"
                      :teamOptions="teamOptions"
                      :title="form.jobTitle"
                      :reportsTo="form.reportTo"
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
                          @click="updateAllData()"
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
                      :email="form.email"
                      :personalPhone="form.personalPhone"
                      :phone="form.phone"
                      :ext="form.ext"
                      :inActive="inActiveContactInfo"
                      @input="handleInput"
                    ></contact-information>
                    <div class="row mx-0 pt-1">
                      <div class="col-12">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateAllData()"
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
          <div id="compensation-wrapper">
            <div v-if="activeTab == personalTabItem[4].value">
              <!-- Compensation Wrapper Start Here  -->
              <div class="scroll_wrapper">
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
                          @click="updateAllData()"
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
                          @click="updateAllData()"
                          v-if="compenstaionEntryUpdateButton"
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
          <div id="benifit-wrapper">
            <div v-if="activeTab == personalTabItem[5].value">
              <!-- Compensation Wrapper Start Here  -->
              <div class="scroll_wrapper">
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
                          @click="updateBenefitsData()"
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
                      :effectiveDate="benefitsEffectiveDate"
                      :benefitsPlanName="benefits.name"
                      :benefitsPlanURL="benefits.url"
                      :inActive="inActiveBenefits"
                      @input="handleInput"
                    ></benefits>
                    <div class="row mx-0 pt-1">
                      <div class="col-12">
                        <bib-button
                          label="Save"
                          size="lg"
                          variant="success"
                          @click="updateBenefitsData()"
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
                        @click="updateAllData()"
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
                    :orgSettings="time.useOrganizationSettings"
                    :trackAttendance="time.trackAttendance"
                    :trackTime="time.trackTime"
                    :switchLabelOrgSettings="switchLabelOrgSettings"
                    :switchLabelAttendance="switchLabelAttendance"
                    :switchLabelweekStarts="switchLabelweekStarts"
                    :weekOptions="weekOptions"
                    :weekStart="time.startWeekDay"
                    :weekCapacity="time.weekCapacity"
                    :deadlineDay="time.deadlineDay"
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
                        @click=""
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
        </div>
        <div id="files-wrapper">
          <div v-if="activeTab == personalTabItem[8].value">
            <!-- Benefits info Wrppaer Start Here  -->
            <div id="folder-info-wrapper" class="scroll_wrapper">
              <div class="nav_wrapper bottom_border_wrapper">
                <div class="px-1 main-wrapper">
                  <div class="d-flex py-075">
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
import axios from "axios";
import dayjs from "dayjs";
import {
  EMPLOYEE_PROFILE_TAB,
  SELECT_OPTIONS,
  FOLDERS_DATA,
  FILES_DATA,
  COUNTRIES,
  STATES,
  WEEK_DAY,
} from "../../utils/constant/Constant.js";
import {
  openPopupNotification,
  vfileAdded,
  updateAllData,
  handleInput,
  handleInputObject,
  employeeTime,
  updateBenefitsData,
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
  updateEmergencyContact,
} from "../../utils/functions/profile/index";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();

export default {
  data() {
    return {
      id: "",
      activeRole: this.activeUserRole === "ADMIN" ? true : false,
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
      genderOptions: SELECT_OPTIONS.genderOptions,
      maritalOption: SELECT_OPTIONS.maritalStatusOptions,
      statusOptions: SELECT_OPTIONS.esstatusOptions,
      countries: COUNTRIES,
      states: STATES,
      cureentState: [],
      teamOptions: "",
      emContact: false,
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
      inactiveEmergencyContact: "disabled",
      emailUpdateButton: false,
      phoneUpdateButton: false,
      emergencyContactUpdateButton: false,
      addressUpdateButton: false,
      infoUpdatePersonalEmail: true,
      infoUpdateTelephoneNumber: true,
      infoUpdateAddress: true,
      infoUpdateEmergencyContact: true,
      stateVisible: true,
      showEmergencyContact: false,

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

      // Time & attandance
      weekOptions: WEEK_DAY,
      timesheetOptions: WEEK_DAY,
      timeAttendanceUpdateButton: false,
      inActiveTimeAttendance: "disabled",
      infoUpdateTimeAttendance: true,
      switchLabelOrgSettings: "",
      switchLabelAttendance: "",
      switchLabelweekStarts: "",

      inactiveCommon: "disabled",
      form: {},
      benefits: {},
      benefitsEffectiveDate: "",
      timeoff: {},
      time: {},
      teamOption: "",
      formOptions: {},
      updateForm: {},
      isFlag: false,
    };
  },

  async created() {
    // await this.users();
    this.$store.dispatch("token/setActiveTab", "Employee Profile");
    if (this.$route.params.id) {
      this.id = this.$route.params.id;
      await this.$store.dispatch("employee/setUser", this.id);
    } else {
      await this.$store.dispatch("employee/setActiveUser");
      var users = this.getUser;
      this.id = users.id;
    }
    await this.$store.dispatch("department/setDepartmentList");
    this.departmentOptions = this.getDepartment;
    this.form = this.getUser;
    if (this.form.addresses[0]?.country === "Canada") {
      console.log(this.states);
      this.cureentState = this.states.filter((item, index) => {
        return item;
      });
    }
    if (this.form.addresses[0]?.country === "USA") {
      console.log(this.states);
      this.cureentState = this.states.filter((item, index) => {
        return item;
      });
    }
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getDepartment: "department/GET_DEPARTMENT_LIST",
      getReportsToList: "employee/GET_REPORTS_LIST",
      getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getAccessToken: "token/getAccessToken",
      activeTab: "token/getActiveTab",
      activeUserRole: "token/getUserRole",
      getTimeOff: "timeoff/GET_TIMEOFF_LIST",
    }),
  },

  async mounted() {
    this.formOptions = SELECT_OPTIONS;
    this.switchLabelOrgSettings =
      this.form.useOrganizationSettings != null ? "Yes" : "No";
    this.switchLabelAttendance = this.form.switchLabelAttendance = null
      ? "Yes"
      : "No";
    this.switchLabelweekStarts = this.form.switchLabelweekStarts = null
      ? "Yes"
      : "No";
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
    updateEmergencyContact,
    employeeTime,
    updateBenefitsData,
    sortBy() {
      alert("called");
    },
    async handleChange_Tabs(tab) {
      // this.activeTab = tab.value;
      this.$store.dispatch("token/setActiveTab", tab.value);
      if (tab.value == "time-off") {
        await this.$store.dispatch("timeoff/gettimeOff", { id: this.id });
        this.timeoff = this.getTimeOff;
        console.log(this.timeoff, "sadnflkasfjahfkjhskjka");
      }
      if (tab.value == "benefits") {
        try {
          const benefits = await axios.get(
            process.env.API_URL + "/employees/" + this.id + "/benefits",
            {
              headers: {
                Authorization: "Bearer " + this.getAccessToken,
              },
            }
          );
          var dateFormat = dayjs(benefits.data.effectiveDate).format(
            "YYYY-MM-DD"
          );
          this.benefitsEffectiveDate = dateFormat;
          this.benefits = benefits.data;
        } catch (e) {
          alert(e);
        }
      }
      if (tab.value == "Employment Information") {
        await this.$store.dispatch("employee/setReportsToList");
        await this.$store.dispatch("teams/setTeamListOptions");
        this.usersOptions = this.getReportsToList;
        this.teamOptions = this.getTeamListOptions;
      }
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
</style>
