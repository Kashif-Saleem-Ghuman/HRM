<template>
  <div>
    <div class="add-leave-wrapper min-z-index">
      <div v-show="employeeNameInput">
        <div>
          <bib-input
            type="text"
            label="Employee"
            :value="employeeName"
            icon-left="user"
            placeholder="Employee"
            disabled
            @change="$emit('input', $event, 'employeeId')"
          ></bib-input>
        </div>
      </div>
      <div>
        <div v-show="employeeNameSelectShow">
          <bib-input
            type="select"
            label="Employee"
            :value="employeeNameSelect"
            :options="employeesOptions"
            icon-left="user"
            avatar-right=""
            placeholder="Employee"
            :disabled="inActive"
            @input="$emit('selectUser', $event, 'employeeId')"
          ></bib-input>
        </div>
      </div>

      <div class="border-wrapper-box">
        <div class="p-0">
          <div class="p-0">
            <div v-show="leaveTypeSelect" class="pb-05">
              <bib-input
                type="select"
                label="Leave type"
                :value="leaveType"
                :options="leaveTypeOptions"
                placeholder="Select your Leave type"
                :disabled="inActive"
                @input="$emit('selectLeaveType', $event, 'type')"
              ></bib-input>
            </div>
          </div>

          <div class="pb-05 d-flex justify-between">
            <div class="items-width" v-if="showAllowance">
              <div class="d-flex input-display-wrapper">
                <span>Allowance</span>
                <span>{{ allowanceDays }}</span>
              </div>
            </div>
            <div
              class="items-width"
              :key="usedDayLeave"
              :class="showAllowance === false ? 'p-0' : ''"
            >
              <div class="d-flex input-display-wrapper">
                <span>Used</span>
                <span>{{ usedDays }}</span>
              </div>
            </div>
            <div class="last-child" v-if="showAllowance">
              <div class="d-flex input-display-wrapper">
                <span>Available</span>
                <span>{{ allowanceDays - usedDays }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-wrapper-box">
        <div>
          <label class="d-block">Dates</label>
        </div>
        <div class="d-flex">
          <div class="items-width end-date-wrapper">
            <form-datepicker
              label="Start Date"
              :value="startDate"
              :dateValue="startDate"
              fieldKey="start"
              @change="menuClick"
              :dis="disable"
            >
            </form-datepicker>
          </div>
          <div class="last-child end-date-wrapper">
            <form-datepicker
              label="End Date"
              :value="endDate"
              :dateValue="endDate"
              fieldKey="end"
              @change="menuClick"
              :dis="disable"
            >
            </form-datepicker>
          </div>
        </div>
        <div class="py-05 checkbox">
          <bib-checkbox
            label="Half day"
            fieldKey="isHalfDay"
            :value="isHalfDay"
            :checked="isHalfDay"
            :disabled="inActive"
            size="md"
            @change="setValueIsHalfDay"
          ></bib-checkbox>
        </div>
      </div>
    </div>
    <div>
      <div>
        <bib-input
          type="textarea"
          label="Reason"
          placeholder="Enter text"
          :value="note"
          @change="$emit('input', $event, 'note')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
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
    allowanceDays: {
      type: [Number, String],
    },
    usedDays: {
      type: [Number, String],
      default: "00",
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
    errorMsgEndDateGreater: {
      type: Boolean,
    },
    showAllowance: {
      type: Boolean,
      default: true,
    },
    isHalfDay: {
      type: Boolean,
    },
  },
  data() {
    return {
      usedDayLeave: 0,
      disable: this.edit,
      start: null,
      end: null,
    };
  },
  created() {
    this.$root.$on("used-days", () => {
      this.usedDayLeave += 1;
    });
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },
  methods: {
    menuClick(value, fieldKey) {
      this[fieldKey] = value;
      this.$emit("change", value, fieldKey);
    },
    setValueIsHalfDay(value, fieldKey) {
      this[fieldKey] = value;
      this.$emit("change", fieldKey, "isHalfday");
    },

    displayEmployeeField() {
      return this.$store.state.token.isAdmin;
    },

    disableEmployeeField() {
      return this.$route.path.includes("leave-vacations-profile-tab");
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.add-leave-wrapper {
  input {
    color: #85858f;
  }
}
.items-width {
  width: 100%;
  padding-right: 1rem;
}
.last-child {
  width: 100%;
  padding-right: 0px;
}
.input-display-wrapper {
  padding: 0.75rem;
  border-radius: 6px;
  border: solid 1px var(--bib-gray4);
  display: block;
  justify-content: space-between;
  span {
    display: block;
    font-size: 14px;
    color: #999;
  }
}
.pad-remove {
  // padding: 0px;
}
.border-wrapper-box {
  border: 1px solid $secondary-sub3;
  padding: 16px 16px 8px 16px;
  border-radius: 6px;
  margin-bottom: 1rem;
  margin-top: 8px;
  margin-left: 1px;
  label {
    font-size: 14px;
    color: #85858f;
    margin-bottom: 0.7rem;
  }
  .checkbox {
    label {
      margin-top: 2px !important;
    }
  }
  input {
    margin-bottom: 0 !important;
  }
}
@media (min-width: 500px) {
  .end-date-wrapper {
    .vdpPositionBottom {
      bottom: 1% !important;
    }
  }
}
@media (min-width: 768px) {
  .end-date-wrapper {
    .vdpPositionBottom {
      bottom: 1% !important;
    }
  }
}

@media (min-width: 1400px) {
  .end-date-wrapper {
    .vdpPositionBottom {
      bottom: 50% !important;
    }
  }
}
</style>
