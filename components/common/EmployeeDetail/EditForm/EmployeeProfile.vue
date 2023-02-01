<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="First Name"
          v-model="firstname"
          placeholder="Type your first name"
          :disabled="disabled"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Last Name"
          v-model="lastname"
          placeholder="Type your last name"
          :disabled="disabled"
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
          :disabled="disabled"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Department"
          v-model="department"
          placeholder="Enter your department"
          :disabled="disabled"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Employee Status"
          v-model="employeeStatus"
          placeholder="Please select employee status"
          :disabled="disabled"
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
    department: {
      type: String,
    },
    title: {
      type: String,
    },
    employeeStatus: {
      type: String,
    },
    disabled:{
      type:String
    },
  },
  data() {
    return {
    };
  },
  components: { validate },
};
</script>
