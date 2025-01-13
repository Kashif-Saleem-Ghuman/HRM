<!-- This component is used to display the pay plan info table to create or edit a pay plan -->
<template>
  <div class="section-wrapper">
    <div class="tab-wrapper">
      <div class="px-1">
        <bib-tabs
          :tabs="formattedPayPlanTab"
          :value="activeTab"
          @change="handleChange_Tabs"
        ></bib-tabs>
      </div>
    </div>

    <div class="details-main-wrapper">
        <!-- <editable-select
          :options="options"
          label="Select year"
          avatarText="BG"
          v-model="selectedYear"
          @update-value="updatedValue"
        /> -->
      <div id="employee-profile-wrapper">
        <pay-plan-info-table v-if="activeTab === payPlanTab[0].value" @selected-users-length="handleUserLength" @selected-users="handleSelectedUsers"></pay-plan-info-table>
      </div>
    </div>
  </div>
</template>

<script>
import { PAY_PLAN_SIDBAR_TAB } from '../../../../utils/constant/pay/PayConstant';
import PayPlanInfoTable from './PayPlanInfoTable.vue';
export default {
components: { PayPlanInfoTable },
  data() {
    return {
      payPlanTab: PAY_PLAN_SIDBAR_TAB,
      activeTab: "Members",
      selectedYear: 2024,
      selectedMemberCount: 0,
      options: [
        { value: 2024, label: "2024 (Current)" },
        { value: 2023, label: "2023" },
        { value: 2022, label: "2022" },
        { value: 2021, label: "2021" },
        { value: 2020, label: "2020" }
      ],
    };
  },
  computed: {
    formattedPayPlanTab() {
      return this.payPlanTab.map(tab => ({
        ...tab,
        title: `${tab.title}${this.selectedMemberCount > 0 ? ` (${this.selectedMemberCount})` : ''}`  // Include count only if greater than 0
      }));
    },
  },
  methods: {
    handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    updatedValue(newValue) {
      this.selectedYear = newValue;
    },
    handleUserLength(selectedMemberCount){
      this.selectedMemberCount = selectedMemberCount;
    },
    handleSelectedUsers(selectedUsers){
      this.$emit('selected-users', selectedUsers);
    }
  },
};
</script>

<style lang="scss">
.details-main-wrapper {
  border: 1px $light solid;
  border-radius: 8px;
  padding: 1rem;
}
.dark-theme{
  .details-main-wrapper {
  border: 1px $dark-sub3 solid;
  }
}
</style>
