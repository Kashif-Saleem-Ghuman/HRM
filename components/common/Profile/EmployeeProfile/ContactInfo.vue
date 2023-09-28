<template>
  <div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="email"
          label="Primary email"
          :value="ContactConfig.primaryEmail"
          placeholder=""
          :disabled="inActive"
          @input="$emit('input', $event, 'primaryEmail')"
        ></bib-input>
        <small
            class="text-danger"
            style="margin-top: -0.5rem; margin-bottom: 0.5rem; display: block"
            v-show="errorMsgPrimaryEmail"
            >Please enter valid email address</small
          >
      </div>
      <div class="col-6">
        <bib-input
          type="email"
          label="Secondary email"
          :value="ContactConfig.seondaryEmail"
          placeholder=""
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
          :value="ContactConfig.homePhone"
          placeholder=""
          :disabled="inActive"
          @change="$emit('input', $event, 'homePhone')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Cell phone"
          :value="ContactConfig.cellPhone"
          placeholder=""
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
    /**
     * An object containing profile config
     * @typedef {Object} ContactConfig
     * @property {string} primaryEmail
     * @property {string} seondaryEmail
     * @property {string} homePhone
     * @property {string} cellPhone
     */
     ContactConfig: {
      type: Object,
    },
    inActive: {
      type: String,
    },
    errorMsgPrimaryEmail:{
      type:[String, Boolean]
    }
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
