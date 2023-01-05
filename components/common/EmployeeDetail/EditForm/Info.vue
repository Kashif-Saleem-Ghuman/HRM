<template>
  <div id="profile-info-wrapper">
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="First Name"
          v-model="firstname"
          placeholder="Type your name"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Middle Name"
          v-model="midname"
          placeholder="Type your name"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Last Name"
          v-model="lastname"
          placeholder="Type your name"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Personal email address •"
          v-model="email"
          placeholder="Enter your email"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Personal mobile number •"
          v-model="mobile"
          placeholder="Enter your email"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Info",
  props: {
    firstname: {
      type: String,
    },
    midname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
  },
};
</script>
