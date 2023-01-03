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
            <div class="py-1"><drop-zone :src="form.preview"></drop-zone></div>
          </div>
          <div class="py-1 row-custom custom-input">
            <div id="profile-info-wrapper">
              <div class="row mx-0">
                <div class="col-4">
                  <bib-input
                    type="text"
                    label="First Name"
                    v-model="form.name"
                    placeholder="Type your name"
                  ></bib-input>
                </div>
                <div class="col-4">
                  <bib-input
                    type="text"
                    label="Middle Name"
                    v-model="form.midname"
                    placeholder="Type your name"
                  ></bib-input>
                </div>
                <div class="col-4">
                  <bib-input
                    type="text"
                    label="Last Name"
                    v-model="form.lastname"
                    placeholder="Type your name"
                  ></bib-input>
                </div>
              </div>
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <bib-input
                    type="text"
                    label="Personal email address •"
                    v-model="form.email"
                    placeholder="Enter your email"
                  ></bib-input>
                </div>
              </div>
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <bib-input
                    type="text"
                    label="Personal mobile number •"
                    v-model="form.mobile"
                    placeholder="Enter your email"
                  ></bib-input>
                </div>
              </div>
            </div>
            <div class="tab-wrapper">
              <div class="row mx-0 pt-1">
                <div class="col-12">
                  <bib-tabs
                    :tabs="bibTabs"
                    :value="activeTab"
                    @change="handleChange_Tabs"
                  ></bib-tabs>
                </div>
              </div>
              <div class="pt-2" id="tab_info_wrapper">
                <div v-if="activeTab == tabItem[0].value">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title
                          :title="tabItem[0].title"
                          variant="gray"
                          icon="info"
                          :scale="0.9"
                        ></tabs-title>
                      </div>
                    </div>
                    <div id="personal-info">
                      <personal-info
                        :date_vmodel="form.birthday"
                        :gender_vmodel="form.gender"
                        :options="form.genderOptions"
                      ></personal-info>
                    </div>
                </div>
                <div v-if="activeTab == tabItem[1].value">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title
                          :title="tabItem[1].title"
                          variant="gray"
                          icon="info"
                          :scale="0.9"
                        ></tabs-title>
                      </div>
                  </div>
                  <div id="Address-info">
                      <personal-info
                        :date_vmodel="form.birthday"
                        :gender_vmodel="form.gender"
                        :options="form.genderOptions"
                      ></personal-info>
                    </div>
                </div>
                <div v-if="activeTab == tabItem[2].value">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title
                          :title="tabItem[2].title"
                          variant="gray"
                          icon="info"
                          :scale="0.9"
                        ></tabs-title>
                      </div>
                  </div>
                  <div id="Address-info">
                      <personal-info
                        :date_vmodel="form.birthday"
                        :gender_vmodel="form.gender"
                        :options="form.genderOptions"
                      ></personal-info>
                    </div>
                </div>
              </div>
              
            </div>
          </div>
          <div class="row mx-0 pt-1 pb-2">
            <black-button
              label="Save"
              size="custom"
              variant="dark"
              @click="sortBy()"
            ></black-button>
          </div>
        </div>
        <div class="section-mid"></div>
        <!-- <div class="section-right py-1 px-2">
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { USER_DETAILS, EMPLOYEE_TAB } from "../../../utils/constant/Constant.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      tabItem: EMPLOYEE_TAB,
      form: {},
      bibTabs: [
        {
          title: "Personal Information",
          value: "personal-information",
        },
        {
          title: "Address",
          value: "address",
        },
        {
          title: "Contacts",
          value: "contacts",
        },
      ],
      activeTab: "personal-information",
    };
  },
  created() {
    // this.$store.dispatch("users/setSingleUserList", { userId: this.$route.params.id})
    // this.$store.dispatch("users/setSingleUserList");
  },

  mounted() {
    this.fetchSingleUser();
    console.log(EMPLOYEE_TAB[0], "asdkjansdjkahkjsdhasd")
  },
  methods: {
    sortBy() {
      alert("called");
    },
    async fetchSingleUser() {
      var users = USER_DETAILS.find((user) => user.id === this.id);
      this.form = users;
      return users;
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
    height: 100vh;
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
