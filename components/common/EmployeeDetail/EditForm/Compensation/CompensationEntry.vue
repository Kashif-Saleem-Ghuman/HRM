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
            label="Pay Schedule"
            v-model="paySchedule"
            :options="payScheduleOptions"
            placeholder="Please select pay schedule"
            @input="$emit('input', $event, 'paySchedule')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="select"
            label="Pay Type"
            v-model="payType"
            :options="payTypeOptions"
            placeholder="Select your pay type"
            @input="$emit('input', $event, 'payType')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Pay Rate"
            v-model="payRate"
            placeholder="Enter title pay rate"
            @change="$emit('input', $event, 'payRate')"
            :disabled="inActive"
          ></bib-input>
        </div>
          <div class="col-3">
          <bib-input
            type="text"
            label="Currency"
            v-model="currency"
            placeholder="Enter Currency"
            @change="$emit('input', $event, 'currency')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-3">
          <bib-input
            type="text"
            label="Term"
            v-model="term"
            placeholder="Enter term"
            @change="$emit('input', $event, 'term')"
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
    name: "CompensationEntry",
    props: {
      paySchedule: {
        type: String,
      },
      payScheduleOptions: {
        type: Array,
      },
      payType: {
        type: String,
      },
      payTypeOptions: {
        type: Array,
      },
      payRate: {
        type: String,
      },
      currency: {
        type: String,
      },
      term: {
        type: String,
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
  