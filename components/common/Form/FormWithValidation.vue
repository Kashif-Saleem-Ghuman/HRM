<template>
  <form @submit.prevent="handleSubmit">
    <slot></slot>
    <div id="action-button">
      <div class="row mx-0 pl-1 pb-2 pt-1">
        <div class="col-6 row-custom">
          <div
            class="d-flex justify-between align-center button-custom-wrapper"
          >
            <bib-button
              label="Cancel"
              variant="gray"
              size="lg"
              class="mr-1"
              style="width: 50%; display: flex; justify-content: center"
            ></bib-button>
            <bib-button
              label="Save"
              variant="success"
              size="lg"
              @click="handleSubmit"
              style="width: 50%; display: flex; justify-content: center"
            ></bib-button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>


<script>
import { validateFormField } from "@/utils/form-validations/validate-form-field";
import { forOwn, get, set } from "lodash";
export default {
  props: {
    fields: {
      type: Object,
    },
    form: {
      type: Object,
    },
  },

  methods: {
    handleSubmit() {
      if (!Object.keys(this.form).length) return;

      if (this.isFormValid(this.form)) {
        this.$emit("on-submit-valid", true);
      }
    },

    validateObject(object, key) {
      const errors = {};
      const objectKeys = Object.keys(object).map((k) => `${key}.${k}`);

      objectKeys.forEach((objectKey) => {
        const objectValidations = get(this.fields, `${objectKey}.validations`);

        if (objectValidations) {
          const validate = validateFormField(
            get(this.form, `${objectKey}`),
            objectValidations
          );
          if (validate !== true) {
            set(errors, objectKey, validate);
          }
        }
      });

      return errors;
    },

    isFormValid(data) {
      let errors = {};

      forOwn(data, (value, key) => {
        if (typeof data[key] == "object") {
          const objectErrors = this.validateObject(data[key], key);
          if (Object.keys(objectErrors).length) {
            errors = { ...errors, ...objectErrors };
          }
        } else {
          if (get(this.fields, `${key}.validations`)) {
            const validate = validateFormField(
              value,
              this.fields[key].validations
            );
            if (validate !== true) {
              errors[key] = validate;
            }
          }
        }
      });

      if (Object.keys(errors).length) {
        console.log("Form is not valid", errors);
        this.$emit("errors", errors);
        return false;
      }

      return true;
    },
  },
};
</script>

<style>
</style>