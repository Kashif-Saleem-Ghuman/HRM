<template>
  <div class="position-relative h-100 salary-table">
    <bib-button label="Adjust" variant="primary--outline" @click="addRow" icon="add" class="mb-1"></bib-button>
    <bib-table
      :fields="tableFields"
      class="table"
      :class="{
        'table--light': isLightThemeCheck,
        'table--dark': !isLightThemeCheck,
      }"
      :sections="employeeData"
      :hide-no-column="true"
      :fixHeader="true"
    >
      <template #cell(effective-date)="data">
        <div class="justify-between">
          <bib-input
            v-if="data.value.isNew"
            v-model="data.value.effectiveDate"
            type="date"
          ></bib-input>
          <span v-else>{{ data.value.effectiveDate }}</span>
        </div>
      </template>
      
      <template #cell(type)="data">
        <div class="justify-between">
          <bib-input
            v-if="data.value.isNew"
            v-model="data.value.type"
            :options="typeOptions"
            size="md"
            type="select"
          ></bib-input>
          <span v-else>{{ data.value.type }}</span>
        </div>
      </template>

      <template #cell(augmentation)="data">
        <div class="justify-end">
          <div :class="getRateClass(data.value.augmentation)">{{ data.value.augmentation }}</div>
        </div>
      </template>

      <template #cell(rate)="data">
        <div class="justify-end">
          <span>{{ data.value.rate }}</span>
        </div>
      </template>

      <template #cell(amount)="data">
        <div class="justify-between">
          <span>{{ data.value.amount }}</span>
        </div>
      </template>
    </bib-table>
  </div>
</template>

<script>
import {
  TABLE_HEAD,
  PAY_SALARY_DUMMY_DATA,
} from "@/utils/constant/pay/PayConstant";

export default {
  props: {
    userList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      tableFields: TABLE_HEAD.tHeadPaySalaryEarningInfo,
      employeeData: PAY_SALARY_DUMMY_DATA.map(item => ({
        ...item,
        isNew: false,
      })),
      typeOptions: [
        { label: "Salary", value: "salary" },
        { label: "Bonus", value: "bonus" },
        { label: "Compensation", value: "compensation" },
      ],
    };
  },
  methods: {
    getRateClass(rate) {
      const rateValue = parseFloat(rate);
      if (rateValue > 0) return "text-success";
      if (rateValue < 0) return "text-danger";
      return "";
    },
    addRow() {
      const newRow = {
        id: Date.now(),
        employeeId: 80,
        effectiveDate: "2024-10-28",
        type: "bonus",
        augmentation: "---",
        rate: "38.84",
        amount: "6500 USD",
        isNew: true,
      };

      this.employeeData.unshift(newRow);
    },
  },
};
</script>
<style lang="scss">
.salary-table{
  input {
    margin: -8px auto -8px -16px !important;
    padding: 0px auto !important;
    border: none !important;
    background-color: transparent !important;
    height: 30px !important;
  }
 .input select{
    margin: -8px auto !important;
    background: transparent!important;
    border: none !important;
    
    option{
      background-color: $dark;
      padding: 0 1rem;
    }
  }
  .input{
    padding: 0px !important;
    background-color: transparent!important;
    .icon{
      margin-top: 3px !important;
    }
  }
}
</style>