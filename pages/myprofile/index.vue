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
        <div class="" id="tab_info_wrapper">
          <div id="my-profile-wrapper">
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
                      disabled="disabled"
                    ></employee-profile>
                  </div>
                  <div
                    class="bg-light mt-1"
                    :class="seprator"
                    style="height: 1px"
                  ></div>
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

          <div id="my-profile-wrapper">
            <div v-if="activeTab == personalTabItem[1].value">
              <div class="row mx-0 pt-2">
                <div class="col-6">
                  <tabs-title
                    :title="personalTabItem[1].title"
                    variant="gray"
                    icon="info"
                    :updateButton="true"
                    @click="updateInfo"
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
                      :inActive="inactive"
                      @input="handleInput"
                    ></personal-information>
                  </div>
                  <div class="row mx-0 pb-2 pt-1">
                    <div class="col-12">
                      <bib-button
                        label="Save"
                        size="lg"
                        variant="success"
                        @click="getAllData('rightAction')"
                        :disabled="updateButton"
                      ></bib-button>
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
    <loader v-bind:showloader="loading" :text="loaderMessage"></loader>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  EMPLOYEE_PROFILE_TAB,
  SELECT_OPTIONS,
} from "../../utils/constant/Constant.js";
import { openPopupNotification } from "../../utils/functions/functions_lib.js";
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      personalTabItem: EMPLOYEE_PROFILE_TAB,
      inactive: "disabled",
      updateButton: "disabled",
      // employeInfoTabItem: EMPLOYEE_INFO_TAB,
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
    }),
  },
  async mounted() {
    if (this.$router.history.current.fullPath == "/people") {
      this.$router.push("/myprofile");
      return;
    }
    await this.users();
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
    }),
    openPopupNotification,
    updateInfo() {
      this.inactive = null;
      this.updateButton = null;
    },
    handleInput(event, name) {
      this.updateForm[name] = event;
      console.log(this.updateForm, "updateForm");
      this.form[name] = event;
      this.isFlag = true;
    },
    async vfileAdded(file) {
      this.fileDetail = file;
      let pimg = new FormData();
      pimg.append("file", this.fileDetail);
      await this.$axios
        .$put(`${process.env.API_URL}/employees/${this.id}`, pimg, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          this.openPopupNotification(0);
          this.form = res;
        })
        .catch((err) => {
          console.log("There was an issue in employees API", err);
        });
      this.loading = false;
    },
    async getAllData() {
      if (this.isFlag == false) {
        alert("No data to Update");
        return true;
      }
      this.loading = true;
      await this.$axios
        .$put(`${process.env.API_URL}/employees/${this.id}`, this.updateForm, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(this.updateForm, "http://dev-hrm.business-in-a-box.com/");
          this.openPopupNotification(1);
          this.form = res;
          this.inactive = "disabled";
          this.updateButton = "disabled";
          this.loading = false;
          this.isFlag = false;
        })
        .catch((err) => {
          console.log("There was an issue in employees API", err);
        });
      this.loading = false;
    },
    sortBy() {
      alert("called");
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
