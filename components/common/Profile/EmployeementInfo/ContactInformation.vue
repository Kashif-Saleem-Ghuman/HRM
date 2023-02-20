<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="email"
            label="Org email address"
            v-model="email"
            placeholder="Enter your Org email"
            :disabled="inActive"
            icon-left="mail"
            @input="$emit('input', $event, 'email')"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Phone number"
            v-model="personalPhone"
            placeholder="Enter your phone"
            :disabled="inActive"
            icon-left="device-mobile"
            @input="$emit('input', $event, 'personalPhone')"
          ></bib-input>
        </div>
        <div class="col-6">
          <bib-input
            type="text"
            label="Extension"
            v-model="ext"
            placeholder="Enter your extension"
            :disabled="inActive"
            icon-left="file"
            @input="$emit('input', $event, 'ext')"
          ></bib-input>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="text"
            label="Org mobile number"
            v-model="phone"
            placeholder="Enter your phone"
            :disabled="inActive"
            icon-left="device-mobile"
            @input="$emit('input', $event, 'phone')"
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
      personalPhone: {
        type: String,
      },
      phone: {
        type: String,
      },
      ext: {
        type: String,
      },
      inActive: {
        type:String
      }
    },
  };
  </script>
  