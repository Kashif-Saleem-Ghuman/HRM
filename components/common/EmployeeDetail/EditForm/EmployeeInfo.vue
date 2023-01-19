<template>
  <div style="padding-top: 22px">
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="date"
          label="Hire Date"
          v-model="hireDate"
          placeholder="Select your Hire Date"
          @change="$emit('input', $event, 'hireDate')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Social Insurance Number"
          v-model="socialInsuranceNumber"
          placeholder="Enter your email"
          @input="$emit('input', $event, 'sin')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Employee number"
          v-model="employeeNumber"
          placeholder="Enter your email"
          @change="$emit('input', $event, 'employeNumber')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Employee Status"
          v-model="employeeStatus"
          :options="esstatusOptions"
          placeholder="Enter your email"
          @input="$emit('input', $event, 'status')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Department"
          v-model="department"
          :options="departmentOptions"
          placeholder="Enter your email"
          @input="$emit('input', $event, 'department')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Team"
          v-model="team"
          placeholder="Enter your team"
          :options="teamOptions"
          @input="$emit('input', $event, 'team')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Title"
          v-model="title"
          :options="titleOptions"
          placeholder="Enter title"
          @input="$emit('input', $event, 'title')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Reports to"
          v-model="reportsTo"
          :options="reportsToOptions"
          placeholder="Enter your email"
          @input="$emit('input', $event, 'reportsto')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <span style="display: block; font-size: 10px; padding-top: 5px"
          >Allow web portal access</span
        >
        <div style="padding-bottom: 24px; padding-top: 5px">
          <bib-switch :checked="webPortalAccess" @change="$emit('change-it', $event, 'allowWebAccess'), webPortalAccess= !webPortalAccess"></bib-switch>
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="textarea"
          v-model="note"
          placeholder="Type about yourself"
          label="Note"
          @change="$emit('input', $event, 'note')"
        ></bib-input>
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
    webPortalAccess:{
      type:String
    },
    
  },
};
</script>
