<template>
    <div>
      <div class="row mx-0">
        <div class="col-6">
          <bib-input
            type="select"
            label="Select compenstaion package"
            v-model="compenstaionPackage"
            :options="compenstaionPackageOption"
            placeholder="Please select compenstaion package"
            @change="$emit('input', $event, 'compenstaionPackage')"
            :disabled="inActive"
          ></bib-input>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: "CompensationPacakage",
    props: {
        compenstaionPackage: {
        type: String,
      },
      compenstaionPackageOption:{
        type:Array
      },
      inActive:{
        type:String
      }
      
    },
  };
  </script>
  