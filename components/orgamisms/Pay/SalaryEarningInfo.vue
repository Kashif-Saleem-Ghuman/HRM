<template>
    <div class="section-wrapper">
      <div class="tab-wrapper">
        <div class="px-1">
          <bib-tabs
            :tabs="salaryInfoTab"
            :value="activeTab"
            @change="handleChange_Tabs"
          ></bib-tabs>
        </div>
      </div>
  
      <div class="details-main-wrapper">
        <editable-select
          :options="options"
          label="Select year"
          avatarText="BG"
          v-model="selectedYear"
          @update-value="updatedValue"
        />
        <div id="employee-profile-wrapper">
          <salary-summary v-if="activeTab === salaryInfoTab[0].value"></salary-summary>
        </div>
  
        <div id="employee-information-wrapper">
          <earnings-info v-if="activeTab === salaryInfoTab[1].value"></earnings-info>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { PAY_SALARY_SIDBAR_TAB } from '../../../utils/constant/pay/PayConstant';
  
  export default {
    data() {
      return {
        salaryInfoTab: PAY_SALARY_SIDBAR_TAB,
        activeTab: "Salary summary",
        selectedYear: 2024,
        options: [
          { value: 2024, label: "2024 (Current)" },
          { value: 2023, label: "2023" },
          { value: 2022, label: "2022" },
          { value: 2021, label: "2021" },
          { value: 2020, label: "2020" }
        ],
      };
    },
    methods: {
      handleChange_Tabs(tab) {
        this.activeTab = tab.value;
      },
      updatedValue(newValue) {
        this.selectedYear = newValue;
      },
    },
  };
  </script>
  
  <style lang="scss">
  .details-main-wrapper {
    border: 1px $dark-sub3 solid;
    border-radius: 8px;
    padding: 1rem;
  }
  </style>
  