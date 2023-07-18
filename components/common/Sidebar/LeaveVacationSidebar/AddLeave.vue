<template>
  <div>
    <div class="pt-1">
      <!-- <div class="row">
        <div class="col-12">
          <bib-input
            type="text"
            label="Employee"
            v-model="employeeName"
            icon-left="user"
            placeholder="Employee"
            disabled
            @change="$emit('input', $event, 'employeeId')"
          ></bib-input>
        </div>
      </div> -->
      <div class="row">
        <div class="col-12">
          <bib-input
            type="select"
            label="Leave type"
            :options="leaveTypeOptions"
            placeholder="Select your Leave type"
            @input="$emit('input', $event, 'type')"
          ></bib-input>
        </div>
      </div>
      <div class="row pt-075 pb-075">
        <div class="col-4">
          <div class="d-flex input-display-wrapper">
            <span>Allowance</span>
            <span>{{allowanceDays}}</span>
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
            <span>23</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <bib-input
            type="date"
            label="Start date"
            placeholder="Select your start date"
            @change="$emit('input', $event, 'start')"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="date"
            label="End date"
            placeholder="Select your end date"
            @change="$emit('input', $event, 'end')"
          ></bib-input>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <bib-input
          type="textarea"
          label="Reason"
          placeholder="Enter text"
          @change="$emit('input', $event, 'note')"
        ></bib-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <info-card-success></info-card-success>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    leaveType: {
      type: String,
    },
    leaveTypeOptions: {
      type: Array,
    },
    employeeName: {
      type: String,
    },
    teamOptions: {
      type: Array,
    },
    allowanceDays:{
      type:Number
    },
    usedDays:{
      type:Number
    },
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
