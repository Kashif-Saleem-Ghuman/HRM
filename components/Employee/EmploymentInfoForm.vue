<template>
  <div>
    <loader :loading="loading"></loader>
    <form-with-validations
      :fields="fields"
      :form="form"
      :is-create-form="!form?.id"
      :submit-fn="submitToApi"
      v-show="form.id"
      :buttonDisable="isDisabled"
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
                            :options="statusOptions"
                            placeholder="Select your employee status"
                            :disabled="isDisabled"
                          ></form-input>
                        </div>
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Employee number"
                            field-key="employeeNo"
                            :value="form.employeeNo"
                            placeholder=""
                            :disabled="isDisabled"
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
                            placeholder=""
                            :disabled="isDisabled"
                          ></form-input>
                        </div>
                        <div class="col-6">
                          <form-input
                            type="date"
                            label="Hire Date"
                            field-key="hireDate"
                            :value="form.hireDate"
                            placeholder="Select your Hire Date"
                            :editable="!isDisabled"
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
                            :options="employmentTypeOptions"
                            placeholder=""
                            :disabled="isDisabled"
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
                              placeholder=""
                              :disabled="isDisabled"
                            ></form-input>
                          </div>
                          <div class="col-6">
                            <form-input
                              type="text"
                              label="Department"
                              field-key="department"
                              :value="getDepartmentsString(form.departments)"
                              placeholder=""
                              :disabled="true"
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
                              class="mb-05"
                              placeholder="Please select reporting manager"
                              icon-left="file"
                              :disabled="isDisabled"
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
                              placeholder=""
                              icon-left="file"
                              disabled="disabled"
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
                              placeholder=""
                              :disabled="isDisabled"
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
      </div>
    </form-with-validations>
  </div>
</template>
<script>
import employmentInfo from "@/components/Employee/forms/employment-info-fields";
import placementFields from "@/components/Employee/forms/placement-fields";
import { SELECT_OPTIONS } from "@/utils/constant/Constant";
import { updateEmployee } from "@/utils/functions/api_call/employees";
import { mapGetters } from "vuex";
import { getEmployee } from "@/utils/functions/api_call/employees.js";
import { USER_ROLES } from "@/utils/constant/Constant.js";
import { getDepartmentsString } from "../../utils/functions/employees-helper";

export default {
  props: {
    buttonDisable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isDisabled() {
      if (this.$store.state.token.hrmRole === USER_ROLES.ADMIN) return false;
      if (this.$store.state.token.hrmRole === USER_ROLES.MANAGER) return false;
      return true;
      // return this.$isAdmin
    },

    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
      getUserRole: "token/getUserRole",
    }),
  },

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
      dateFormat: "",
      loading: false,
    };
  },
  methods: {
    getDepartmentsString,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    submitToApi(form) {
      return updateEmployee({
        id: this.form.id,
        employee: form,
      })
        .then(() => {
          this.$openPopupNotification(1);
        })
        .catch((error) => {
          console.error(error);
          this.$openPopupNotification({
            text: "Error while updating employee",
            variant: "danger",
          });
        });
    },

    async fetchEmployee() {
      this.loading = true;
      const id = this.$route.params.id ?? this.getUser?.id;
      try {
        if (id) {
        this.id = id;
        const employee = await getEmployee({ id });
        this.form = employee;
      }
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false;
    },

    async setReportToList() {
      await this.$store.dispatch("employee/setReportsToList").then((result) => {
        const employees = result.filter((e) => e?.value != this.id);
        this.reportOptions = [{ label: "", value: null }, ...employees];
      });
    },
  },

  created() {
    this.fetchEmployee();
  },

  mounted() {
    this.setReportToList();
  },

  watch: {
    getUser() {
      if (this.id) return;
      this.fetchEmployee();
    },
  },
};
</script>

<style scoped>
.vdpInnerWrap {
  position: absolute;
}
</style>