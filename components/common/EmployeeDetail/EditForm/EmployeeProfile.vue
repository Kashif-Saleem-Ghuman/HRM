<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="First Name"
          v-model="firstname"
          placeholder="Type your firstName"
          @change="$emit('input', $event, 'firstName')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Last Name"
          v-model="lastname"
          placeholder="Type your lastName"
          @change="$emit('input', $event, 'lastName')"
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
          @change="$emit('input', $event, 'title')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Department"
          v-model="department"
          placeholder="Enter your department"
          @change="$emit('input', $event, 'department')"
          :disabled="inActive"
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
          @change="$emit('input', $event, 'status')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "EmployeeProfile",
  props: {
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    title: {
      type: String,
    },
    department: {
      type: String,
    },
    employeeStatus: {
      type: String,
    },
    disabled:{
      type:String
    },
    input: {
      type: Function,
    },
    inActive:{
        type:String
      },
  },
  data() {
    return {
    };
  },
};
</script>
