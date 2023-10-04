<template>
  <form-with-validation
    :fields="fields"
    :form="updateForm"
    @errors="setErrors"
    @on-submit-valid="submit"
  >
    <div id="employee-information-wrapper">
      <div id="scroll-wrapper" class="scroll-wrapper">
        <div class="px-1">
          <div class="row">
            <div class="col-6">
              <!-- my profile Info Wrapper Start Here  -->
              <div id="my-profile-wrapper">
                <div class="py-cus row-custom">
                  <div>
                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="select"
                          label="Employee Status"
                          field-key="employeeStatus"
                          :value="form.employeeStatus"
                          :error="errors.employeeStatus"
                          :options="statusOptions"
                          placeholder="Select your employee status"
                          @input="handleInput"
                          disabled
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="Employee number"
                          field-key="employeeNo"
                          :value="form.employeeNo"
                          :error="errors.employeeNo"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="Social Insurance Number"
                          field-key="sin"
                          :value="form.sin"
                          :error="errors.sin"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="date"
                          label="Hire Date"
                          field-key="hireDate"
                          :value="form.hireDate"
                          :error="errors.hireDate"
                          placeholder="Select your Hire Date"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="select"
                          label="Employment Type"
                          field-key="employmentType"
                          :value="form.employmentType"
                          :error="errors.employmentType"
                          :options="employmentTypeOptions"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Info Wrapper Start Here  -->
              <div class="border-wrapper">
                <div class="contact-info-wrapper">
                  <div class="row mx-0">
                    <div class="col-6">
                      <tabs-title
                        title="Placement"
                        variant="gray"
                        :scale="0.9"
                        class="py-1"
                      ></tabs-title>
                    </div>
                  </div>
                  <div>
                    <!-- "Employment Information" -->
                    <div>
                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Work Title"
                            field-key="jobTitle"
                            :value="form.jobTitle"
                            :error="errors.jobTitle"
                            placeholder=""
                            @input="handleInput"
                          ></form-input>
                        </div>
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Department"
                            value="HRM"
                            placeholder=""
                            disabled="disabled"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="select"
                            label="Reports to"
                            field-key="managerId"
                            :options="reportOptions"
                            :value="form.managerId"
                            :error="errors.managerId"
                            placeholder="Please select reporting manager"
                            @input="handleInput"
                            icon-left="file"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="text"
                            label="Work email"
                            field-key="email"
                            :value="form.email"
                            :error="errors.email"
                            placeholder=""
                            @input="handleInput"
                            icon-left="file"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Work telephone"
                            field-key="phone"
                            :value="form.phone"
                            :error="errors.phone"
                            placeholder=""
                            @input="handleInput"
                          ></form-input>
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
      <bib-notification :popupMessages="popupMessages"></bib-notification>
    </div>
  </form-with-validation>
</template>
<script>
import employmentInfo from "@/components/Employee/forms/employment-info-fields";
import placementFields from "@/components/Employee/forms/placement-fields";
import formWithValidationMixin from "@/mixins/form-with-validation-mixin";
import { SELECT_OPTIONS } from "@/utils/constant/Constant";
import { popupNotificationMsgs } from "@/utils/constant/Notifications";
import {
  isValidSIN,
  isValidSSN,
} from "@/utils/form-validations/string-validations";
import { validateFormField } from "@/utils/form-validations/validate-form-field";
import { updateEmployee } from "@/utils/functions/api_call/employees";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";
import { set } from "lodash";
import { mapGetters } from "vuex";
export default {
  mixins: [formWithValidationMixin],
  data() {
    return {
      fields: { ...employmentInfo, ...placementFields },
      statusOptions: SELECT_OPTIONS.esstatusOptions,
      employmentTypeOptions: [
        { label: "", value: "" },
        { label: "Full Time", value: "full_time" },
        { label: "Part Time", value: "part_time" },
        { label: "Contract", value: "contract" },
        { label: "Intern", value: "intern" },
      ],
      reportOptions: [],
      form: {},
      id: "",
      updateForm: {},
      date: "",
      errors: {},
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
    };
  },
  methods: {
    openPopupNotification,
    submitToApi() {
      return updateEmployee({
        id: this.form.id,
        employee: this.updateForm,
      }).then(() => {
        this.openPopupNotification(1);
      });
    },

    customValidation() {
      const isSinValid = this.validateSin();
      return [isSinValid].every((validation) => validation == true);
    },

    validateSin() {
      if (this.updateForm?.sin) {
        const country =
          this.updateForm?.address?.country ?? this.form?.address?.country;

        console.log({ country });
        const isUsa = country == "USA";
        const isCanada = country == "Canada";
        if (isCanada || isUsa) {
          const validations = [];

          if (isCanada) {
            validations.push(isValidSIN);
          } else if (isUsa) {
            validations.push(isValidSSN);
          }
          const valid = validateFormField(this.updateForm?.sin, validations);
          if (valid !== true) {
            let errors = { ...this.errors };
            set(errors, "sin", valid);
            this.setErrors(errors);
            return false;
          }
        }
      }

      return true;
    },
  },
  async created() {
    this.id = this.$route.params.id;
    await this.$store.dispatch("employee/setUser", this.id);
    this.form = this.getUser;

    await this.$store.dispatch("employee/setReportsToList").then((result) => {
      const employees = result.filter((e) => e.id != this.form.id);
      this.reportOptions = [{ label: "", value: "" }, ...employees];
    });
  },

  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
    }),
  },
};
</script>