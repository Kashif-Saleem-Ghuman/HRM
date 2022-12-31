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
            <tabs-title title="Employee details" variant="gray" icon="info" :scale="0.9"></tabs-title>
            <div class="py-1"><drop-zone></drop-zone></div>
          </div>
          <div class="py-1 row-custom">
            <div id="profile-info-wrapper">
              <div class="row mx-0">
                <div class="col-4">
                  <custom-input
                    type="text"
                    label="First Name"
                    :vmodel="form.name"
                    placeholder="Type your name"
                  ></custom-input>
                </div>
                <div class="col-4">
                  <custom-input
                    type="text"
                    label="Middle Name"
                    :vmodel="form.midname"
                    placeholder="Type your name"
                  ></custom-input>
                </div>
                <div class="col-4">
                  <custom-input
                    type="text"
                    label="Last Name"
                    :vmodel="form.lastname"
                    placeholder="Type your name"
                  ></custom-input>
                </div>
              </div>
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <custom-input
                    type="text"
                    label="Personal email address •"
                    :vmodel="form.email"
                    placeholder="Enter your email"
                  ></custom-input>
                </div>
              </div>
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <custom-input
                    type="text"
                    label="Personal mobile number •"
                    :vmodel="form.mobile"
                    placeholder="Enter your email"
                  ></custom-input>
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
                <div v-if="activeTab == bibTabs[0].value">
                  <div id="info_wrapper">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title :title="bibTabs[0].title" variant="gray" icon="info" :scale="0.9"></tabs-title>
                      </div>
                    </div>
                    <div class="row mx-0 pt-2">
                      <div class="col-6">
                        <custom-input
                          type="date"
                          label="Date of Birth"
                          :vmodel="form.birthday"
                          placeholder="Enter your email"
                        ></custom-input>
                      </div>
                      <div class="col-6">
                        <custom-input
                          type="select"
                          label="Gender"
                          :vmodel="form.fruit"
                          :options="fruitOptions"
                          placeholder="Enter your email"
                        ></custom-input>
                      </div>
                    </div>
                    <div class="row mx-0 pt-1">
                      <black-button
                        label="Save"
                        size="custom"
                        variant="dark"
                        @click="sortBy()"
                      ></black-button>
                    </div>
                  </div>
                </div>
                <div v-if="activeTab == bibTabs[1].value">
                  <div id="info_wrapper">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title :title="bibTabs[1].title" variant="gray" icon="info" :scale="0.9"></tabs-title>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="section-mid"></div>
        <div class="section-right py-1 px-2">
            <div class="tab-wrapper row-custom">
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
                <div v-if="activeTab == bibTabs[0].value">
                  <div id="info_wrapper">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title :title="bibTabs[0].title" variant="gray" icon="info" :scale="0.9"></tabs-title>
                      </div>
                    </div>
                    <div class="row mx-0 pt-2">
                      <div class="col-6">
                        <custom-input
                          type="date"
                          label="Date of Birth"
                          :vmodel="form.birthday"
                          placeholder="Enter your email"
                        ></custom-input>
                      </div>
                      <div class="col-6">
                        <custom-input
                          type="select"
                          label="Gender"
                          :vmodel="form.fruit"
                          :options="fruitOptions"
                          placeholder="Enter your email"
                        ></custom-input>
                      </div>
                    </div>
                    <div class="row mx-0 pt-1">
                      <black-button
                        label="Save"
                        size="custom"
                        variant="dark"
                        @click="sortBy()"
                      ></black-button>
                    </div>
                  </div>
                </div>
                <div v-if="activeTab == bibTabs[1].value">
                  <div id="info_wrapper">
                    <div class="row mx-0">
                      <div class="col-12">
                        <tabs-title :title="bibTabs[1].title" variant="gray" icon="info" :scale="0.9"></tabs-title>
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
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        name: "Jianyu Wu",
        midname: "Middle Name",
        lastname: "Vervelsky",
        email: "name@organization.com",
        mobile: "+1 514 555 8877",
        age: 36,
        birthday: "2021-09-22",
        time: "11:56",
        color: "#2ba026",
        profile: "",
        fruit: "Select Gender",
      },
      fruitOptions: [
        { label: "Please choose one", value: null },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
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
  methods: {
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
