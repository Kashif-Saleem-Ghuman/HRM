<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="First Name"
            v-model="firstname"
            placeholder="Enter your first name"
            @change="$emit('input', $event, 'firstName')"
            :disabled="inActive"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Last Name"
            v-model="lastname"
            placeholder="Type your last name"
            @change="$emit('input', $event, 'lastName')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
        type="select"
        label="Gender"
        v-model="gender"
        :options="options"
        placeholder="Enter your email"
        @input="$emit('input', $event, 'gender')"
        :disabled="inActive"
      ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6 validation-mark">
          <bib-input
        type="date"
        label="Date of Birth"
        v-model="dob"
        placeholder="Enter your email"
        @change="$emit('input', $event, 'dateOfBirth')"
        :disabled="inActive"
      ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6 validation-mark">
          <bib-input
            type="select"
            v-model="married"
            label="Marital Status"
            placeholder="Select marital status"
            @change="$emit('input', $event, 'married')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { validate } from "json-schema";
  export default {
    name: "Info",
    props: {
      firstname: {
        type: String,
      },
      lastname: {
        type: String,
      },
      inActive:{
        type:String
      },
      input: {
        type: Function,
      },
      married: {
        type: Array,
      },
      dob: {
        type: Array,
      },
      gender:{
        type:String
      },
      options: {
      type: Array,
    },
    },
    data() {
      return {
        methods: {
          updateInput($event) {
            // console.log($event, "called")
            this.$emit("update-value", $event);
          },
        },
      };
    },
    components: { validate },
  };
  </script>
  <style lang="scss">
  .validation-mark {
    label {
      line-height: 20px !important;
    }
  }
  .text-gray6 {
    span {
      padding-left: 4px;
    }
  }
  </style>
  