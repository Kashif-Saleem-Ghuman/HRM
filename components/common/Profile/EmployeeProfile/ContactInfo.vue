<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="email"
          label="Primary email"
          :value="primaryEmail"
          placeholder="Enter your primary email"
          :disabled="inActive"
          @change="$emit('input', $event, 'primaryEmail')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="email"
          label="Secondary email"
          :value="seondaryEmail"
          placeholder="Enter your secondary mail"
          :disabled="inActive"
          @change="$emit('input', $event, 'seondaryEmail')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Home phone"
          :value="homePhone"
          placeholder="Enter your home phone"
          :disabled="inActive"
          @change="$emit('input', $event, 'homePhone')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Cell phone"
          :value="cellPhone"
          placeholder="Enter your phone"
          :disabled="inActive"
          @change="$emit('input', $event, 'cellPhone')"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ContactInformation",
  props: {
    inActive: {
      type: String,
    },
    primaryEmail:{
      type:String
    },
    seondaryEmail:{
      type:String
    },
    homePhone:{
      type:String
    },
    cellPhone:{
      type:String
    },
  },
  data() {
    return {
      // primaryEmailState:this.primaryEmail,
      // seondaryEmailState:this.seondaryEmail,
      // homePhoneState:this.homePhone,
      // cellPhoneState:this.cellPhone,
    };
  },
};
</script>
