<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Organization Name"
          v-model="companyName"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'firstName')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label class="text-gray6 d-flex align-center"
          >Email address <span class="text-danger">*</span></label
        >
        <bib-input
          type="email"
          v-model="contactEmail"
          placeholder="Enter your email"
          @change="$emit('input', $event, 'email')"
          :disabled="inActive"
        ></bib-input>
        <div v-if="ValidateEmail" class="text-danger validation-text">
          {{ ValidateEmail }}
        </div>
      </div>
      <div class="col-6 validation-mark">
        <label class="text-gray6 d-flex align-center"
          >Telephone <span class="text-danger">*</span></label
        >
        <bib-input
          type="text"
          v-model="contactPhone"
          placeholder="Enter mobile number"
          @change="$emit('input', $event, 'phone')"
          :disabled="inActive"
        ></bib-input>
        <div v-if="ValidatePhone" class="text-danger validation-text">
          {{ ValidatePhone }}
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Extension"
          v-model="extension"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'firstName')"
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
    companyName: {
      type: String,
    },
    midname: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      type: String,
    },
    extension: {
      type: String,
    },
    input: {
      type: Function,
    },
    inActive: {
      type: String,
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
