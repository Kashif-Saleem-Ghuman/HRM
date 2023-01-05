<template>
  <div style="padding-top: 22px;">
    <div class="row mx-0" >
      <div class="col-6">
        <bib-input
          type="date"
          label="Hire Date"
          v-model="hireDate"
          placeholder="Enter your email"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="password"
          label="Social Insurance Number"
          v-model="socialInsuranceNumber"
          placeholder="Enter your email"
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
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Employee Status"
          v-model="employeeStatus"
          :options="esstatusOptions"
          placeholder="Enter your email"
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
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Team"
          v-model="team"
          placeholder="Enter your team"
          :options="teamOptions"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Title"
          v-model="title"
          :options="titleOptions"
          placeholder="Enter title"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="select"
          label="Reports to"
          v-model="reportsTo"
          :options="reportsToOptions"
          placeholder="Enter your email"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <span style="display: block; font-size: 10px;">Allow web portal access</span>
        <div style="padding-bottom: 24px; padding-top: 3px;"><bib-switch :checked="switchChecked2" @change="switchChecked2 = !switchChecked2"></bib-switch></div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input type="textarea" placeholder="Type about yourself" label="Textarea"></bib-input>

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
    data() {
                        return {
                         
                            switchChecked1: true,
                            switchChecked2: false
                          
                        }
                      }
  },
};
</script>
