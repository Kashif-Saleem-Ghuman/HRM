<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="email"
            label="Email address"
            v-model="email"
            placeholder="Enter your email"
            :disabled="disabled"
            icon-left="mail"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Phone number"
            v-model="mobile"
            placeholder="Enter your phone"
            :disabled="disabled"
            icon-left="device-mobile"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Extension"
            v-model="mobile"
            placeholder="Enter your extension"
            :disabled="disabled"
            icon-left="file"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Mobile number"
            v-model="mobile"
            placeholder="Enter your phone"
            :disabled="disabled"
            icon-left="device-mobile"
          ></bib-input>
        </div>
          </div>
    </div>
  </template>
  <script>
  export default {
    name: "PersonalInfo",
    props: {
      email: {
        type: String,
      },
      mobile: {
        type: String,
      },
      disabled: {
        type:String
      }
    },
  };
  </script>
  