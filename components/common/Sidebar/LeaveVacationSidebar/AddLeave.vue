<template>
    <form-with-validations
      :fields="fields"
      :form="addForm"
      :is-create-form="!form?.id"
      :submit-fn="submitRequestForm"
      :update-form.sync="updateForm"
    >
    <div class="add-leave-wrapper">
      <div>
        <div v-show="displayEmployeeField">
          <form-input
            type="select"
            label="Employee"
            field-key="employeeId"
            :value="form.employeeId"
            :options="employeesOptions"
            icon-left="user"
            avatar-right=""
            placeholder="Employee"
            :disabled="disableEmployeeField"
            style="padding-right: 0px"
          ></form-input>
        </div>
      </div>

      <div class="border-wrapper-box">
        <div style="padding: 0px;">
          <div style="padding: 0px;">
          <div  v-show="leaveTypeSelect" class="pb-05">
            <form-input
              type="select"
              label="Leave type"
              field-key="type"
              :value="form.type"
              :options="leaveTypeOptions"
              placeholder="Select your Leave type"
              :disabled="inActive"
            ></form-input>
            <small
              class="text-danger"
              style="margin-top: -0.25rem; display: block"
              v-show="errorMsgSelect"
              >Please select leave type</small
            >
            </div>
          </div>

          <div class="pb-05 d-flex justify-between">
            <div class="items-width">
              <div class="d-flex input-display-wrapper">
                <span>Allowance</span>
                <span>{{ allowanceData?.allowedDays }}</span>
              </div>
            </div>
            <div class="items-width" :key="usedDayLeave">
              <div class="d-flex input-display-wrapper">
                <span>Used</span>
                <span>{{ allowanceData?.usedDays }}</span>
              </div>
            </div>
            <div class="last-child">
              <div class="d-flex input-display-wrapper">
                <span>Available</span>
                <span>{{ allowanceData?.availableDays }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-wrapper-box">
        <div>
        <label style="display: block;">Dates</label>
      </div>
        <div class="d-flex">
        <div class="items-width">
          <form-input
            type="date"
            label="Start date"
            field-key="start"
            :value="form.start"
            placeholder="Select your start date"
            :disabled="inActive"
          ></form-input>
          <small
            class="text-danger"
            style="margin-top: -0.25rem; display: block"
            v-show="errorMsgStartDate"
            >Please select start date</small
          >
        </div>
        <div class="last-child">
          <form-input
            type="date"
            label="End date"
            field-key="end"
            placeholder="Select your end date"
            :value="form.end"
            :disabled="inActive"
          ></form-input>
          <small
            class="text-danger"
            style="margin-top: -0.25rem; display: block"
            v-show="errorMsgEndDate"
            >Please select end date</small
          >
        </div>
      </div>
    </div>
    </div>
    <div>
      <div>
        <form-input
          type="textarea"
          label="Reason"
          field-key="note"
          placeholder="Enter text"
          :value="form.note"
          :disabled="inActive"
          name="note"
        ></form-input>
      </div>
    </div>
    
    <template v-slot:form-action-buttons="scope">
        <div class="position-absolute pb-1 pr-1" style="bottom: 0;right: 0;">
          <div style="text-align: right">
            <bib-button
              label="Cancel"
              variant="gray"
              size="lg"
              v-on:click="closeSidebar"
            ></bib-button>
            <bib-button
              label="Save"
              variant="success"
              size="lg"
              v-on:click="scope.submit"
            ></bib-button>
          </div>
        </div>
    </template>
    </form-with-validations>
</template>

<script>
import { mapGetters } from "vuex";
import { createRequest } from "@/utils/functions/api_call/requests"
import { isRequired } from "@/utils/form-validations/string-validations"
import { REQUEST_TYPES }  from "@/utils/constant/Constant";
export default {

  props: {
    employeeNameInput: {
      type: Boolean,
    },
    employeeNameSelectShow: {
      type: Boolean,
    },
    leaveTypeSelect: {
      type: Boolean,
    },
    showUsedDay: {
      type: Boolean,
    },
    leaveType: {
      type: String,
    },
    leaveTypeOptions: {
      type: [Array, Object],
    },
    employeeName: {
      type: String,
    },
    employeeNameSelect: {
      type: [String, Number],
    },
    employeesOptions: {
      type: [Array, Object],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    note: {
      type: String,
    },
    inActive: {
      type: String,
    },
    errorMsgSelect: {
      type: Boolean,
    },
    errorMsgStartDate: {
      type: Boolean,
    },
    errorMsgEndDate: {
      type: Boolean,
    },
    request: {
      type: Object,
      default: () => ({})
    },
    addForm:{
      type: Object,
      default: () => ({})
    },
    activeUserAllowanceData: {
      type: Object
    }
  },
  data() {
    return {
      usedDayLeave: 0,
      form: {},
      fields: {
        employeeId:  {validations: [isRequired]},
        type: {validations: [isRequired]},
        start: {validations: [isRequired]},
        end: {validations: [isRequired]},
        note:{validations: []}
      },
      updateForm: {}
    };
  },

  methods: {
    async submitRequestForm(form) {
      const request = await createRequest({ request: form })
      this.closeSidebar()
    },

    closeSidebar() {
      this.$nuxt.$emit("close-sidebar");  
    },

    setDefaultEmployee() {
      if (!this.form?.employeeId) {
        this.form.employeeId = this.currentEmployee?.id ?? null
      } 
    },

    getAllowanceDataForType(type) {
      if (!type) return {}
      const { activeUserAllowanceData } = this
      const dataMapper = {
        [REQUEST_TYPES.VACATION]: [activeUserAllowanceData?.vacationsAllowance, activeUserAllowanceData?.vacationsUsed],
        [REQUEST_TYPES.MEDICAL]: [activeUserAllowanceData?.medicalLeavesAllowance, activeUserAllowanceData?.medicalLeavesUsed],
        [REQUEST_TYPES.LEAVE]: [activeUserAllowanceData?.otherLeavesAllowance, activeUserAllowanceData?.otherLeavesUsed],
      }

      const [allowedDays, usedDays] = dataMapper[type]

      let availableDays = 0

      if (!Number.isNaN(allowedDays) && !Number.isNaN(usedDays)) {
        const balance = allowedDays - usedDays
        availableDays = balance < 0 ? 0 : balance
      }

      return {allowedDays, usedDays, availableDays }
    }
  },

  
  created() {
    this.$root.$on("used-days", () => {
      this.usedDayLeave += 1;
      console.log(this.usedDayLeave, "this.$nuxt.$emit(");
    });
  },
  computed: {
    ...mapGetters({
      currentEmployee: "employee/GET_USER"
    }),

    allowanceData() {
      const type = this.updateForm?.type ?? this.form?.type
      return this.getAllowanceDataForType(type)
    },

    displayEmployeeField() {
      return this.currentEmployee?.role == "ADMIN"
    },

    disableEmployeeField() {
      return this.$route.path.includes("leave-vacations-profile-tab")
    }

  },
  mounted() {
    if (this.request) {
      this.form = this.request
    }

    this.form = this.form ?? {}

    this.setDefaultEmployee()
    
  },
};
</script>
<style lang="scss">
.add-leave-wrapper {
  input {
    color: #85858f;
  }
  
}
.items-width{
  width: 100%;
  padding-right: 1rem;
}
.last-child{
  width: 100%;
    padding-right: 0px;
  }
.input-display-wrapper {
  padding: 0.75rem;
  border-radius: 6px;
  border: solid 1px var(--bib-gray4);
  display: flex;
  justify-content: space-between;
  span {
    display: block;
    font-size: 14px;
    color: #999;
  }
  :nth-child(2){
      font-weight: 600;
      color: #000;
    }
}
.pad-remove {
  // padding: 0px;
}
.border-wrapper-box {
  border: 1px solid #f2f2f5;
  padding: 16px 16px 8px 16px;
  border-radius: 6px;
  margin-bottom: 1rem;
  margin-top: 8px;
  margin-left: 1px;
  label{
    font-size: 14px;
    color: #85858F;
    padding-bottom: 0.7rem;
  }
}
</style>
