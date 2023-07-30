<template>
    <div>
      <div class="row mx-0">
          <div class="col-6">
          <bib-input
            type="text"
            label="Work Title"
            v-model="workTitle"
            placeholder="Enter Work title"
            @input="$emit('input', $event, 'workTitle')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Department"
            v-model="department"
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
            v-model="reportsTo"
            placeholder="Enter your Social Insurance Number"
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
            v-model="workEmail"
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
            v-model="workTelephone"
            placeholder="Enter work telephone"
            @change="$emit('input', $event, 'workTelephone')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Work extension"
            v-model="workExt"
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
  };
  </script>
  