<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="date"
            label="Effective Date"
            v-model="effectiveDate"
            placeholder="Please select date"
            @change="$emit('input', $event, 'effectiveDate')"
            :disabled="inActive"
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
            placeholder="Please select department"
            @input="$emit('input', $event, 'department')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="select"
            label="Team"
            v-model="team"
            placeholder="Select your team"
            :options="teamOptions"
            @input="$emit('input', $event, 'teams', 'team')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Title"
            v-model="title"
            placeholder="Enter title"
            @input="$emit('input', $event, 'title')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="select"
            label="Reports to"
            v-model="reportsTo"
            :options="reportsToOptions"
            placeholder="Select youru Reporting Manager"
            @change="$emit('input', $event, 'reportTo')"
            :disabled="inActive"
          ></bib-input>
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
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "EmployeementInfo",
    props: {
      effectiveDate: {
        type: String,
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
      reportsTo: {
        type: String,
      },
      reportsToOptions: {
        type: Array,
      },
      note: {
        type: String,
      },
      inActive:{
        type:String
      }
      
    },
  };
  </script>
  