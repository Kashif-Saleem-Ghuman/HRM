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
            :variant="themeClassDarkLightVariant"
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
            :variant="themeClassDarkLightVariant"
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
                :variant="themeClassDarkLightVariant"
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
                <span>{{ balanceLeaveValue }}</span>
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
        <transition name="fade">
          <div class="checkbox" v-show="shouldShowHalfDayCheckbox">
            <bib-checkbox
              label="Half day"
              fieldKey="isHalfDay"
              :value="isHalfDay"
              :checked="isHalfDay"
              :disabled="inActive"
              size="md"
              @change="setValueIsHalfDay"
              :key="updateCheckbox"
              :variant="themeClassDarkLightVariant"
            ></bib-checkbox>
          </div>
        </transition>
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
          :variant="themeClassDarkLightVariant"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { DateTime } from "luxon";

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
    checkboxDisabled: {
      type: Boolean,
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
      default: false,
    },
    shouldShowHalfDayCheckbox: {
      type: Boolean,
      default: false,
    },
    daysUsedCarryOver: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      usedDayLeave: 0,
      disable: this.edit,
      start: null,
      end: null,
      updateCheckbox: 0,
      // shouldShowHalfDayCheckbox: false,
    };
  },
  created() {
    this.$root.$on("used-days", () => {
      this.usedDayLeave += 1;
    });
    this.$root.$on("update-checkbox", () => {
      this.updateCheckbox += 1;
    });
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
    balanceLeaveValue() {
      if (!Number.isNaN(this.allowanceDays) && !Number.isNaN(this.usedDays)) {
        let balance = this.allowanceDays - this.usedDays;
        if (this.leaveType === "vacation") {
          balance -= this.daysUsedCarryOver;
        }
        return balance % 1 === 0 ? balance : balance.toFixed(2);
      }
      return 0;
    },
  },

  methods: {
    menuClick(value, fieldKey) {
      if (fieldKey === "start" || fieldKey === "end") {
        this[fieldKey] = value;
        // this.updateCheckbox += 1;
      }
      const startDefined = typeof this.start === "string";
      const endDefined = typeof this.end === "string";
      const datesMatch = startDefined && endDefined && this.start === this.end;
      // if(!datesMatch){
      //   this.updateCheckbox += 1;
      // }

      this.shouldShowHalfDayCheckbox = datesMatch;
      this[fieldKey] = value;
      this.$emit("change", value, fieldKey);
    },
    setValueIsHalfDay(value, fieldKey) {
      this[fieldKey] = value;
      this.$emit("change", fieldKey, "isHalfDay");
    },
    displayEmployeeField() {
      return this.$store.state.token.isAdmin;
    },

    disableEmployeeField() {
      return this.$route.path.includes("leave-vacations-profile-tab");
    },
  },
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
    input {
      margin-bottom: 0 !important;
    }
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
