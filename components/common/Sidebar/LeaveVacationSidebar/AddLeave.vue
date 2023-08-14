<template>
  <div>
    <div class="pt-1">
      <div class="row" v-show="employeeNameInput">
        <div class="col-12">
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
      <div class="row">
        <div class="col-12" v-show="employeeNameSelectShow">
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

      <div class="row">
        <div class="col-12" v-show="leaveTypeSelect">
          <bib-input
            type="select"
            label="Leave type"
            :value="leaveType"
            :options="leaveTypeOptions"
            placeholder="Select your Leave type"
            :disabled="inActive"
            @input="$emit('selectLeaveType', $event, 'type')"
          ></bib-input>
          <small
            class="text-danger"
            style="margin-top: -0.25rem; display: block"
            v-show="errorMsgSelect"
            >Please select leave type</small
          >
        </div>
      </div>
      <div class="row pt-075 pb-075">
        <div class="col-4">
          <div class="d-flex input-display-wrapper">
            <span>Allowance</span>
            <span>{{ allowanceDays }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex input-display-wrapper">
            <span>Used</span>
            <span>{{ usedDays }}</span>
          </div>
        </div>
        <div class="col-4">
          <div class="d-flex input-display-wrapper">
            <span>Available</span>
            <span>{{ allowanceDays - usedDays }}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <bib-input
            type="date"
            label="Start date"
            :value="startDate"
            placeholder="Select your start date"
            @change="$emit('input', $event, 'start')"
            :disabled="inActive"
          ></bib-input>
          <small
            class="text-danger"
            style="margin-top: -0.25rem; display: block"
            v-show="errorMsgStartDate"
            >Please select start date</small
          >
        </div>
        <div class="col-6">
          <bib-input
            type="date"
            label="End date"
            placeholder="Select your end date"
            @change="$emit('input', $event, 'end')"
            :value="endDate"
            :disabled="inActive"
          ></bib-input>
          <small
            class="text-danger"
            style="margin-top: -0.25rem; display: block"
            v-show="errorMsgEndDate"
            >Please select end date</small
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
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
    <!-- <div class="row">
      <div class="col-12">
        <info-card-success></info-card-success>
      </div>
    </div> -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    employeeNameInput:{
      type:Boolean
    },
    employeeNameSelectShow:{
      type:Boolean
    },
    leaveTypeSelect: {
      type: Boolean,
    },
    leaveType: {
      type: String,
    },
    leaveTypeOptions: {
      type: Array,
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
  },
  data() {
    return {
      // ltype: this.leaveType,
      // dateStart: this.startDate,
      // dateEnd: this.endDate,
      // reason: this.note,
    };
  },
  computed: {
    ...mapGetters({
      getUserRole: "token/getUserRole",
    })
    
  },
  mounted(){
  }
};
</script>
<style lang="scss">
.input-display-wrapper {
  padding: 0.75rem;
  border-radius: 4px;
  border: solid 1px var(--bib-gray4);
  display: block;
  justify-content: space-between;
  span {
    display: block;
    font-size: 14px;
    color: #999;
  }
}
</style>
