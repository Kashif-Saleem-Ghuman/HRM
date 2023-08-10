<template>
    <div>
      <div class="row mx-0">
          <div class="col-6">
          <bib-input
            type="text"
            label="Work Title"
            :value="workTitle"
            placeholder="Enter Work title"
            @input="$emit('input', $event, 'jobTitle')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Department"
            value="HRM"
            placeholder="Enter your Department"
            disabled="disabled"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="select"
            label="Reports to"
            :options="reportOptions"
            :value="reportsTo"
            placeholder="Please select reporting Manager"
            @input="$emit('input', $event, 'manager')"
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
            :value="workEmail"
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
            :value="workTelephone"
            placeholder="Enter work telephone"
            @change="$emit('input', $event, 'workTelephone')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Work extension"
            :value="workExt"
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
      reportOptions:{
        type:Array
      }
    },
    data() {
    return {
      
    };
  },
  };
  </script>
  