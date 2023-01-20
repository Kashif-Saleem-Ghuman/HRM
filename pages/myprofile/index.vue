<template>
  <div class="employee_wrapper">
    <div
      class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper"
    >
      <section-header-left
        title="Employee Profile"
        bookmark="bookmark-solid"
        moreIcon="horizontal-dots"
        headerRight="headerRight"
      ></section-header-left>
    </div>
    <div class="d-flex">
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
              ></drop-zone>
            </div>
          </div>
          <div class="py-1 row-custom">
            <static-info
            :firstname="form.firstName"
              :lastname="form.lastName"
              :email="form.email"
              :mobile="form.phone"
            ></static-info>
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
                        updateButton
                      ></tabs-title>
                    </div>
                  </div>
                  <div id="personal-info">
                    <static-personal-info
                      :date_vmodel="form.dateOfBirth"
                      :gender_vmodel="form.gender"
                    ></static-personal-info>
                  </div>
                </div>
              </div>
            </div>
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
                    updateButton
                  ></tabs-title>
                </div>
              </div>
              <div id="personal-info">
                <static-employee-info
                  :hireDate="form.hireDate"
                  :socialInsuranceNumber="form.sin"
                  :employeeNumber="form.employeeNumber = null ? '': '1111'"
                  :employeeStatus="form.status"
                  :department="form.department"
                  :team="this.teamOption"
                  teamOptions="A"
                  :title="form.title"
                  titleOptions="Software Engineer"
                  :reportsTo="form.reportTo"
                  :allowWebAccess="form.allowWebAccess"
                ></static-employee-info>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  USER_DETAILS,
  PERSONAL_INFO_TAB,
  EMPLOYEE_INFO_TAB,
} from "../../utils/constant/Constant.js";
export default {
  data() {
    return {
      id: '',
      personalTabItem: PERSONAL_INFO_TAB,
      employeInfoTabItem: EMPLOYEE_INFO_TAB,
      form: {},
      teamOption:'',
      activeTab: "personal-information",
      employeInfoActiveTab: "employment-information",
    };
  },
  
  fetch() {
    this.$store.dispatch("users/setUserList");
  },
  computed: {
    ...mapGetters({
      userList: "users/GET_USERS_LIST",
      getUser:"users/GET_USER"
    }),
  },
  async mounted() {
   
    await this.users();

    if (process.client) {
      var userEmail = localStorage.getItem('userEmail')
      var users = this.userList.find((user) => user.email === userEmail);
      this.id = users.id
      await this.user(this.id);
      console.log(this.getUser.teams[0], "userssssssssssssssssssss")
      this.form = this.getUser
    }
    var team = this.form.teams
    var teamOption =  team.join(',  ');
    this.teamOption = teamOption; 
  },
  methods: {
    ...mapActions({
      users: "users/setUserList",
      user: "users/setUser",
    }),
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
