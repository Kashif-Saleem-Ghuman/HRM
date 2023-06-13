<template>
  <div id="people-action-wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
    >
      <section-header-left
        title="People"
        :avatar="userPhoto"
        headerRight="headerRight"
        :items="items"
        :icon="items.icon"
        @vclick="clickAction"
      ></section-header-left>
      <!-- <div class="d-flex justify-between">
        <template v-for="user in userList.slice(0, 4)">
          <section-header-right
            @click="userId(user.id)"
            :avatar="
              user.photo == null
                ? 'http://localhost:3000/_nuxt/_/bib-shared/img/user-default.png'
                : user.photo
            "
          >
          </section-header-right>
        </template>
        <div
          style="z-index: 1"
          class="bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0"
        >
          <span style="font-size: 14px; font-weight: 500">{{ totalUser }}</span>
        </div>
        <button-circle
          icon="user-add"
          :scale="1"
          @click="addUser()"
          variant="success"
          class="ml-05"
          icon_bg="light-green"
        ></button-circle>
      </div> -->
    </div>
    <div class="tab-wrapper">
      <div class="row mx-0">
        <div class="col-12 px-1">
          <bib-tabs
            :tabs="peopleTabItem"
            :value="activeTab"
            @change="handleChange_Tabs"
          ></bib-tabs>
        </div>
      </div>

      <div id="directory-wrapper">
        <div class="" id="tab_info_wrapper">
          <div v-if="activeTab == peopleTabItem[0].value">
            <div
              class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
            >
              <div class="d-flex align-center">
                <button-green
                  icon="add"
                  variant="success"
                  :scale="1"
                  title="Add employee"
                  @on-click="actionBY()"
                ></button-green>
              </div>
            </div>
            <div class="scroll_wrapper">
              <div>
                <list :userList="localData.slice(0, 5)"></list>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <action-sidebar v-show="openSidebar"></action-sidebar> -->
    <template>
      <action-sidebar
        @close-sidebar="closeSidebar"
        @close="closeSidebar"
        :className="slideClass"
        heading="Add Employee"
        v-show="newMessageSidebar"
      >
        <template v-slot:sidebar-body>
          <div class="row mx-0">
            <div class="col-12 custom-tabs">
              <div class="py-cus">
                <drop-zone
                  :src="form.photo"
                  :className="form.photo != null ? 'hide' : ''"
                  :customRemove="form.photo == null ? 'hide' : 'hide'"
                  @vfileAdded="vfileAdded"
                ></drop-zone>
              </div>
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-12 custom-tabs pb-1">
              <bib-tabs
                :tabs="personalTabItem"
                :value="activeTabSidebar"
                @change="handleChange_Tabs"
              ></bib-tabs>
            </div>
          </div>
          <div class="row mx-0">
            <div class="col-12 custom-tabs pb-1">
              <div class="d-flex pb-1">
                <button-gray
                  @on-click="$emit('employee')"
                  icon="mail-new"
                  variant="gray1"
                  :scale="0.8"
                  title="Send Message"
                  titleClass="button-title"
                ></button-gray>
                <button-gray
                  @on-click="$emit('employee')"
                  icon="device-mobile"
                  variant="gray1"
                  :scale="0.8"
                  title="Make a call"
                  titleClass="button-title"
                ></button-gray>
              </div>
            </div>
          </div>
          <div id="employee-profile-wrapper">
            <div class="" id="tab_info_wrapper">
              <div v-if="activeTabSidebar == personalTabItem[0].value">
                <div class="scroll_wrapper">
                  <div>
                    <div class="col-12 row-custom">
                      <div class="">
                        <employee-profile
                          :firstname="form.firstName"
                          :midname="form.middleName"
                          :lastname="form.lastName"
                          :department="form.department"
                          :departmentOptions="departmentOptions"
                          :title="form.jobTitle"
                          :employeeStatus="form.status"
                        ></employee-profile>
                      </div>
                      <div class="bg-light mt-1" style="height: 1px"></div>
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
                          ></contact-info>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:sidebar-footer>
          <div class="d-flex justify-between align-center">
              <bib-button label="Cancle" variant="gray" size="lg" style="width:50%" class="mr-1"></bib-button>
              <bib-button label="Save" variant="success" size="lg" style="width:50%"></bib-button>
          </div>
        </template>
      </action-sidebar>
    </template>
  </div>
</template>
<script>
import {
  PEOPLE_TAB,
  MORE_MENU,
  SORTING_MENU,
  DEPARTMENT_ITEMS,
  ACCESS_ITEMS,
  TABLE_HEAD,
} from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import {
  INBOX_DATA,
  LEAVE_CARD_DATA,
  INBOX_CARD_NEW_MESSAGE_DATA,
} from "../../utils/constant/DashboardData";
import {
  vfileAdded,
  updateAllData,
  handleInput,
  handleInputObject,
} from "../../utils/functions/functions_lib.js";
import { ADD_EMPLOYEE_TAB } from "../../utils/constant/Constant.js";
export default {
  data() {
    return {
      infoCardData: LEAVE_CARD_DATA,
      infoCardV2Data: INBOX_CARD_NEW_MESSAGE_DATA,
      openSidebar: false,
      tableFields: TABLE_HEAD.tHeadDepartment,
      tableFieldsTeam: TABLE_HEAD.tHeadTeam,
      peopleTabItem: PEOPLE_TAB,
      localData: [],
      items: MORE_MENU,
      departmentItems: DEPARTMENT_ITEMS,
      actionMenu: SORTING_MENU.actionMenuPeople,
      orderBy: "asc",
      totalUser: "",
      userPhoto: localStorage.getItem("userPhoto"),
      departmentModel: false,
      accessOptions: ACCESS_ITEMS,
      teamOptions: "",
      departmentOptions: "",
      newMessageSidebar: false,
      slideClass: "slide-in",
      personalTabItem: ADD_EMPLOYEE_TAB,
      form: {},
      activeTab: "Directory",
      dropzoneDisable: "pointer-events: none; cursor: default; opacity:0.5",
      departmentOptions: [],
    };
  },
  async created() {
    await this.$store.dispatch("employee/setUserList");
    this.localData = this.userList;
    console.log(this.localData, "userList");
    this.totalUser = this.localData.length;
    // await this.$store.dispatch("employee/setTeamList");
    this.$store.dispatch("teams/setTeamListOptions");
  },

  computed: {
    ...mapGetters({
      userList: "employee/GET_USERS_LIST",
      getAccessToken: "token/getAccessToken",
      activeUserRole: "token/getUserRole",
      activeTabSidebar: "token/getActiveTab",
      // getTeamListOptions: "teams/GET_TEAM_SELECT_OPTIONS",
      getDepartment: "department/GET_DEPARTMENT_LIST",
    }),
  },
  mounted() {},

  methods: {
    vfileAdded,
    handleClickOutside() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.newMessageSidebar = false;
      }, 700);
    },
    actionBY() {
      if (this.newMessageSidebar == true) {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.newMessageSidebar = false;
        }, 700);
      } else {
        this.newMessageSidebar = true;
        this.slideClass = "slide-in";
      }
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.newMessageSidebar = false;
      }, 700);
    },
    close() {
      alert("sadjlaksjdlasldkjlasjdl");
      this.departmentModel = false;
    },
    async handleChange_Tabs(tab) {
      this.$store.dispatch("token/setActiveTab", tab.value);

      if (tab.value == "Departments") {
        await this.$store.dispatch("department/setDepartmentList");
        this.departmentOptions = this.getDepartment;
      }
      if (tab.value == "Teams") {
        // await this.$store.dispatch("teams/setTeamListOptions");
        // this.teamOptions = this.getTeamListOptions;
      }
    },
    clickAction(event) {
      if (event.key == "name") {
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.firstName.localeCompare(a.firstName));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.firstName.localeCompare(b.firstName));
        }
      }
      if (event.key == "presence") {
        if (this.orderBy == "desc") {
          this.orderBy = "asc";
          this.localData.sort((a, b) => b.email.localeCompare(a.email));
        } else {
          this.orderBy = "desc";
          this.localData.sort((a, b) => a.email.localeCompare(b.email));
        }
      }
      if (event.key == "reset") {
        this.$store.dispatch("employee/setUserList");
      }
    },
    userId(id) {
      this.$router.push("/myprofile/" + id);
    },
  },
};
</script>
<style lang="scss">
.custom-tabs {
  .tabs {
    border: none !important;
    button {
      margin-right: 10px;
      border: none !important;
      border-radius: 6px;
      background-color: #eee !important;
    }
    .active {
      color: #fff !important;
      background-color: #000 !important;
    }
  }
}
</style>
