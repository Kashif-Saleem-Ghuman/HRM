<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="email"
            label="Org email address"
            v-model="email"
            placeholder="Enter your email"
            :disabled="inActive"
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
            :disabled="inActive"
            icon-left="device-mobile"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Extension"
            v-model="mobile"
            placeholder="Enter your extension"
            :disabled="inActive"
            icon-left="file"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Org mobile number"
            v-model="mobile"
            placeholder="Enter your phone"
            :disabled="inActive"
            icon-left="device-mobile"
          ></bib-input>
        </div>
          </div>
    </div>
  </template>
  <script>
  export default {
    name: "ContactInfromation",
    props: {
      email: {
        type: String,
      },
      mobile: {
        type: String,
      },
      inActive: {
        type:String
      }
    },
  };
  </script>
  