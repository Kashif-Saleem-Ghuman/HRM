<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="text"
          label="Organization Name"
          :value="companyName"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'CompanyName')"
        ></bib-input>
      </div>
    </div>
    <!-- <div class="row mx-0">
      <div class="col-6">
        <label class="text-gray6 d-flex align-center"
          >Email address <span class="text-danger">*</span></label
        >
        <bib-input
          type="email"
          :value="contactEmail"
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
          :value="contactPhone"
          placeholder="Enter mobile number"
          @change="$emit('input', $event, 'phone')"
          :disabled="inActive"
        ></bib-input>
        <div v-if="ValidatePhone" class="text-danger validation-text">
          {{ ValidatePhone }}
        </div>
      </div>
    </div> -->
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Organization type"
          :value="orgType"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'BizStage')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Establishment date"
          :value="estDate"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'firstName')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Business category"
          :value="businessCategory"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'businessCategory')"
        ></bib-input>
      </div>
      <div class="col-6">
        <bib-input
          type="text"
          label="Location"
          :value="location"
          placeholder="Type your name"
          :disabled="inActive"
          @change="$emit('input', $event, 'location')"
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
    businessCategory: {
      type: String,
    },
    location: {
      type: String,
    },
    orgType: {
      type: String,
    },
    estDate: {
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
