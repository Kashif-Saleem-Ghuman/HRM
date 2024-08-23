<template>
  <div>
    <div class="rounded-border shape-rounded py-05 mt-05 px-05">
      <label class="f-weight-600 font-md">{{
        formatLabel(filteredLeaveData.leaveType.name)
      }}</label>
      <div class="d-flex mt-05 w-50">
        <div class="w-100" v-show="leaveTypeField">
          <bib-input
            label="Select available leave types"
            @change="updateFormData('leaveType', $event)"
            size="md"
            type="text"
            :variant="isLightThemeCheck ? 'light' : 'dark'"
          ></bib-input>
        </div>
      </div>
      <div class="d-flex mt-05 w-50">
        <div class="w-100">
          <form-datepicker
            label="Effective Date"
            :value="formData.effectiveDate"
            :dateValue="formData.effectiveDate"
            fieldKey="start"
            @change="updateFormData('effectiveDate', $event)"
            :dis="disable"
          >
          </form-datepicker>
        </div>
      </div>
      <div class="d-flex gap-05 mt-05">
        <div class="w-50">
          <bib-input
            label="Annual Allowance"
            v-model="formData.annualAllowance"
            @change="updateFormData('annualAllowance', $event)"
            size="md"
            type="text"
            :variant="isLightThemeCheck ? 'light' : 'dark'"
          ></bib-input>
        </div>
        <div class="w-50">
          <bib-input
            label="Starting Balance"
            type="text"
            :variant="isLightThemeCheck ? 'light' : 'dark'"
            v-model="formData.startingBalance"
            name="startBalance"
            placeholder=""
            @input="updateFormData('startingBalance', $event)"
          ></bib-input>
        </div>
      </div>
      <div class="d-flex gap-05 mt-05">
        <div class="w-50">
          <bib-input
            label="Paid"
            type="text"
            :variant="isLightThemeCheck ? 'light' : 'dark'"
            name="paidResponse"
            placeholder=""
            :disabled="true"
            @input="updateFormData('isPaid', $event)"
          ></bib-input>
        </div>
        <div class="w-50">
          <bib-input
            label="Rollover"
            v-model="formData.isRollover"
            :options="rolloverOptions"
            @input="updateFormData('isRollover', $event)"
            size="md"
            type="select"
            :variant="themeInputVariant"
          ></bib-input>
        </div>
      </div>
      <div class="d-flex gap-05 pt-05">
        <bib-button
          label="Cancel"
          :variant="isLightThemeCheck ? 'gray' : 'light'"
          class="button-wrapper-align w-100 font-sm"
          @click="cancelSettings"
        ></bib-button>
        <bib-button
          label="Add"
          variant="primary-24"
          class="button-wrapper-align w-100 font-sm"
          @click.native.stop="handleSingleClick"
        ></bib-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: {
    rolloverOptions: Array,
    filteredLeaveData: Object,
    leaveTypeField: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: this.filteredLeaveData,
      updateForm: {},
    };
  },
  methods: {
    updateFormData(key, value) {
      if (key === "effectiveDate") {
        const date = value;
        const formattedDate = DateTime.fromFormat(date, "yyyy-MMM-dd")
          .startOf("day")
          .toISODate();
        this.$set(this.updateForm, key, formattedDate);
      } else {
        this.$set(this.updateForm, key, value);
      }
    },
    formatLabel(name) {
      if (!name) return "";
      const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
      return `${capitalized} Setting`;
    },
    validation() {
      let isValid = true;
      let errorMessage = "";

      const allowanceResult = this.validateField(
        this.formData.annualAllowance,
        { min: 0, max: 30 }
      );
      if (allowanceResult) {
        errorMessage = allowanceResult;
        isValid = false;
      }

      const balanceResult = this.validateField(this.formData.startingBalance, {
        min: 0,
      });
      if (balanceResult) {
        errorMessage = balanceResult;
        isValid = false;
      }

      if (!isValid) {
        this.$openPopupNotification({
          text: errorMessage,
          variant: "danger",
        });
      }

      return isValid;
    },

    validateField(value, { min = -Infinity, max = Infinity }) {
      const numericValue = Number(value);

      if (isNaN(numericValue)) {
        return "Please enter a valid number";
      } else if (numericValue < min) {
        return "Value cannot be negative";
      } else if (numericValue > max) {
        return `Maximum value allowed is ${max}`;
      }

      return "";
    },
    cancelSettings() {
      this.$emit("cancelSettings");
    },
    handleSingleClick() {
      if (this.validation()) {
        this.$emit("updateAdjustment", this.updateForm);
      }
    },
  },
};
</script>
