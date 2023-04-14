<template>
  <div>
    <div class="row mx-0">
      <div class="col-4">
        <bib-input
          type="text"
          label="First Name"
          v-model="firstname"
          placeholder="Type your name"
          @change="$emit('input', $event, 'firstName')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Middle Name"
          v-model="midname"
          placeholder="Type your middle name"
          @change="$emit('input', $event, 'middleName')"
        ></bib-input>
      </div>
      <div class="col-4">
        <bib-input
          type="text"
          label="Last Name"
          v-model="lastname"
          placeholder="Type your last name"
          @change="$emit('input', $event, 'lastName')"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <label class="text-gray6 d-flex align-center"
          >Personal email address <span class="text-danger">*</span></label
        >
        <bib-input
          type="email"
          v-model="email"
          placeholder="Enter your email"
          @change="$emit('input', $event, 'email')"
          :variant="emailValidation"
        ></bib-input>
        <div v-if="ValidateEmail" class="text-danger validation-text">
          {{ ValidateEmail }}
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6 validation-mark">
        <label class="text-gray6 d-flex align-center"
          >Personal mobile number <span class="text-danger">*</span></label
        >
        <bib-input
          type="text"
          v-model="mobile"
          placeholder="Enter mobile number"
          @change="$emit('input', $event, 'phone')"
          :variant="phoneValidation"
        ></bib-input>
        <div v-if="ValidatePhone" class="text-danger validation-text">
          {{ ValidatePhone }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validate } from "json-schema";
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
    input: {
      type: Function,
    },
    ValidateEmail: {
      type: Array,
    },
    ValidatePhone: {
      type: Array,
    },
    phoneValidation: {
      type: String,
    },
    emailValidation: {
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
