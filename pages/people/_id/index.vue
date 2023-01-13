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
    <div class="d-flex custom-input">
      <div class="section-wrapper d-flex">
        <div class="section-left py-2 px-2">
          <div>
            <tabs-title
              title="Employee details"
              variant="gray"
              icon="info"
              :scale="0.9"
            ></tabs-title>
            <div class="py-1">
              <drop-zone
                :src="form.avatar"
                :className="form.avatar != null ? 'hide' : ''"
                :customRemove="form.avatar == null ? 'hide' : ''"
                @vfileAdded="vfileAdded"
              ></drop-zone>
            </div>
          </div>
          <div class="py-1 row-custom">
            <info
              :firstname="form.firstName"
              :midname="form.middleName"
              :lastname="form.lastName"
              :email="form.email"
              :mobile="form.phone"
              @input="handleInput"
            ></info>
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
              <div class="pt-2" id="tab_info_wrapper">
                <div v-if="activeTab == personalTabItem[0].value">
                  <div class="row mx-0">
                    <div class="col-12">
                      <tabs-title
                        :title="personalTabItem[0].title"
                        variant="gray"
                        icon="info"
                        :scale="0.9"
                      ></tabs-title>
                    </div>
                  </div>
                  <div id="personal-info">
                    <personal-info
                      :dob="form.dateOfBirth"
                      :gender="form.gender"
                      :options="formOptions.genderOptions"
                      @input="handleInput"
                    ></personal-info>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row mx-0 pb-1 pt-0">
            <black-button
              label="Save"
              size="custom"
              variant="dark"
              @click="getAllData()"
            ></black-button>
          </div>
        </div>
        <div class="section-mid"></div>
        <div class="section-right py-1 pl-2 pr-1 row-custom">
          <div class="row mx-0 pt-1">
            <div class="col-12">
              <bib-tabs
                :tabs="employeInfoTabItem"
                :value="employeInfoActiveTab"
                @change="employee_info_Tabs"
              ></bib-tabs>
            </div>
          </div>
          <div class="pt-2" id="tab_info_wrapper">
            <div v-if="employeInfoActiveTab == employeInfoTabItem[0].value">
              <div class="row mx-0">
                <div class="col-12">
                  <tabs-title
                    :title="employeInfoTabItem[0].title"
                    variant="gray"
                    icon="info"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div id="personal-info">
                <employee-info
                  :hireDate="form.hireDate"
                  :socialInsuranceNumber="form.sin"
                  :employeeNumber="form.employeeNumber"
                  :employeeStatus="form.status"
                  :esstatusOptions="formOptions.esstatusOptions"
                  :department="form.department"
                  :departmentOptions="formOptions.departmentOptions"
                  :team="form.team"
                  :teamOptions="formOptions.teamOptions"
                  :title="form.title"
                  :titleOptions="formOptions.titleOptions"
                  :reportsTo="form.reportsTo"
                  :reportsToOptions="formOptions.reportsToOptions"
                  :note="form.note"
                  @input="handleInput"
                  :webPortalAccess="this.allowWebAccess"
                  @change-it="chnage"
                ></employee-info>
              </div>
              <div class="row mx-0 pb-1 pt-1">
                <div class="col-12">
                  <black-button
                    label="Save"
                    size="custom"
                    variant="dark"
                  ></black-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <loader v-bind:showloader="loading" :text="loaderMessage"></loader>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  SELECT_OPTIONS,
  PERSONAL_INFO_TAB,
  EMPLOYEE_INFO_TAB,
} from "../../../utils/constant/Constant.js";
import getJson from "../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { openPopupNotification } from "../../../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      webPortalAccess: false,
      loading: false,
      fileDetail: "",
      personalTabItem: PERSONAL_INFO_TAB,
      employeInfoTabItem: EMPLOYEE_INFO_TAB,
      localData: {},
      form: {},
      formOptions: {},
      updateForm: {},
      activeTab: "personal-information",
      employeInfoActiveTab: "employment-information",
    };
  },
  created() {
    this.$store.dispatch("users/GET_USERS_LIST");
    if (process.client) {
      this.$axios
        .$get(`${process.env.API_URL}/employees/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          this.form = res;
        })
        .catch((err) => {
          console.log("There was an issue in employees API", err);
        });
    }
  },

  mounted() {
    this.fetchSingleUser();
  },
  methods: {
    openPopupNotification,
    chnage(event, name) {
      this.updateForm[name] = event;
    },
    vfileAdded(file) {
      this.fileDetail = file;
    },
    handleInput(event, name) {
      this.updateForm[name] = event;
    },
    async getAllData() {
      this.loading = true;
      await this.$axios
        .$put(
          `${process.env.API_URL}/employees/${this.$route.params.id}`,
          this.updateForm,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          this.openPopupNotification(1);
          this.form = res;
        })
        .catch((err) => {
          console.log("There was an issue in employees API", err);
        });
      this.loading = false;
    },
    sortBy() {
      alert("called");
    },
    async fetchSingleUser() {
      // var users = this.userList.find((user) => user.id === this.id);
      // this.form = users;
      this.formOptions = SELECT_OPTIONS;
      console.log(this.form, "http://localhost:3000/");
    },

    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    employee_info_Tabs(tab) {
      this.employeInfoActiveTab = tab.value;
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
