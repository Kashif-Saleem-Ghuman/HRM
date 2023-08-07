<template>
    <div>
      <div class="row mx-0">
          <div class="col-6">
          <bib-input
            type="text"
            label="Work Title"
            v-model="workTitleState"
            placeholder="Enter Work title"
            @input="$emit('input', $event, 'workTitle')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Department"
            v-model="departmentState"
            placeholder="Enter your Department"
            @change="$emit('input', $event, 'department')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Reports to"
            v-model="reportsToState"
            placeholder="Please select reporting Manager"
            @change="$emit('input', $event, 'reportsTo')"
            icon-left="file"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="text"
            label="Work email"
            v-model="workEmailState"
            placeholder="Enter your work email"
            @change="$emit('input', $event, 'workEmail')"
            icon-left="file"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Work telephone"
            v-model="workTelephoneState"
            placeholder="Enter work telephone"
            @change="$emit('input', $event, 'workTelephone')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Work extension"
            v-model="workExtState"
            placeholder="Enter work extension"
            @change="$emit('input', $event, 'workExtenstion')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "Placement",
    props: {
      workTitle: {
        type: String,
      },
      department: {
        type: String,
      },
      reportsTo: {
        type: String,
      },
      workEmail: {
        type: String,
      },
      workTelephone: {
        type: String,
      },
      workExt:{
        type:String
      },
      inActive: {
        type: String,
      },
    },
    data() {
    return {
      workTitleState:this.workTitle,
      departmentState:this.department,
      reportsToState:this.reportsTo,
      workEmailState:this.workEmail,
      workTelephoneState:this.workTelephone,
      workExtState:this.workExt
    };
  },
  };
  </script>
  