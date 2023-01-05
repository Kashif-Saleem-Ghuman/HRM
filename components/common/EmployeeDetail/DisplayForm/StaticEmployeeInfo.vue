<template>
  <div style="padding-top: 22px;" class="static_display">
    <div class="row mx-0" >
      <div class="col-6">
        <label>Hire Date</label>
        <p class="d-flex align-center">
          <bib-icon
            icon="calendar-solid"
            scale="1"
            variant="secondary"
            class="mr-05"
          ></bib-icon
          >{{ hireDate }}
        </p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Social Insurance Number</label>
      <p>{{ socialInsuranceNumber }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Employee Number</label>
      <p>{{ employeeNumber }}</p>
      </div>
      <div class="col-6">
        <label>Employee Status</label>
      <p>{{ employeeStatus }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Department</label>
      <p>{{ departmentOptions }}</p>
      </div>
      <div class="col-6">
        <label>Team</label>
      <p>{{ teamOptions }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label>Title</label>
      <p>{{ titleOptions }}</p>
      </div>
      <div class="col-6">
        <label>Reports To</label>
      <p>{{ reportsToOptions }}</p>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <span style="display: block; font-size: 10px;">Allow web portal access</span>
        <div style="padding-bottom: 24px; padding-top: 3px;"><bib-switch :checked="true" disabled></bib-switch></div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <label>Notes</label>
      <p style="border:none">N/A</p>

      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: "EmployeeInfo",
  props: {
    hireDate: {
      type: String,
    },
    socialInsuranceNumber: {
      type: String,
    },
    employeeNumber: {
      type: String,
    },
    employeeStatus: {
      type: String,
    },
    esstatusOptions: {
      type: Array,
    },
    department: {
      type: String,
    },
    departmentOptions: {
      type: Array,
    },
    team: {
      type: String,
    },
    teamOptions: {
      type: Array,
    },
    title: {
      type: String,
    },
    titleOptions: {
      type: Array,
    },
    reportsTo: {
      type: String,
    },
    reportsToOptions: {
      type: Array,
    },
    note: {
      type: String,
    },
  },
};
</script>
