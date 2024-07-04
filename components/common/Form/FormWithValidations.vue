<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <slot></slot>

      <slot
        name="form-action-buttons"
        :submit="handleSubmit"
        ref="formActionButtonsSlot"
      ></slot>

      <div v-if="!hasFormActionButtonsSlot" id="action-button-profile">
        <div class="row mx-0 pl-1 pb-1 pt-05">
          <div class="col-6 row-custom">
            <div
              class="d-flex justify-between align-center button-custom-wrapper"
            >
              <bib-button
                label="Cancel"
                :variant="isLightThemeCheck ? 'gray' : 'dark'"
                size="lg"
                class="mr-1 w-100 button-wrapper-align"
                :disabled="buttonDisable"
                @click="handleCancle"
              ></bib-button>
              <bib-button
                label="Save"
                variant="primary-24"
                size="lg"
                @click="handleSubmit"
                class="w-100 button-wrapper-align"
                :disabled="buttonDisable"
              ></bib-button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { forOwn, get, set } from "lodash";
import { validateFormField } from "@/utils/form-validations/validate-form-field";
import { merge } from "lodash";
import { mapGetters } from "vuex";
export default {
  provide() {
    return {
      emitFormInput: this.emitFormInput,
      formErrors: () => this.errors,
    };
  },
  props: {
    fields: {
      type: Object,
    },
    form: {
      type: Object,
    },
    buttonDisable: {
      type: Boolean,
      default: false,
    },
    isCreateForm: {
      type: Boolean,
      default: false,
    },

    submitFn: {
      type: Function,
      required: true,
    },
  },

  computed: {
    hasFormActionButtonsSlot() {
      return (
        !!this.$slots["form-action-buttons"] ||
        !!this.$scopedSlots["form-action-buttons"]
      );
    },
    isDisabled() {
      return this.getUserRole === "ADMIN" ? false : true;
    },
    ...mapGetters({
      getUserRole: "token/getUserRole",
    }),
  },

  data() {
    return {
      errors: {},
    };
  },

  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    emitFormInput(event) {
      const { fieldKey, value } = event;
      this.handleInput(event);
    },
    handleCancle(){
      this.$router.push("/dashboard/");
    },
    handleSubmit() {
      // if (!Object.keys(this.updateForm).length) return;
      let valid = false;
      if (this.isCreateForm) {
        valid = this.handleSubmitCreateForm();
      } else {
        valid = this.handleSubmitEditForm();
      }

      if (valid) {
        this.submit();
      }
    },

    handleSubmitCreateForm() {
      if (this.validateFields()) {
        return true;
      }
      return false;
    },

    handleSubmitEditForm() {
      if (this.isFormValid(this.updateForm)) {
        return true;
      }
      return false;
    },

    validateObject(object, key) {
      const errors = {};
      const objectKeys = Object.keys(object).map((k) => `${key}.${k}`);

      objectKeys.forEach((objectKey) => {
        const objectValidations = get(this.fields, `${objectKey}.validations`);

        if (objectValidations) {
          const validate = validateFormField(
            get(this.updateForm, `${objectKey}`),
            objectValidations,
            merge(this.form, this.updateForm)
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
          if (get(this.fields, `${key}.optional`) && !value) {
            return;
          }

          if (get(this.fields, `${key}.validations`)) {
            const validate = validateFormField(
              value,
              this.fields[key].validations,
              merge(this.form, this.updateForm)
            );

            if (validate !== true) {
              errors[key] = validate;
            }
          }
        }
      });

      if (Object.keys(errors).length) {
        console.log("Form is not valid", errors);
        this.setErrors(errors);
        return false;
      }

      return true;
    },

    validateFields() {
      let errors = {};
      const fields = this.fields;
      forOwn(fields, (value, key) => {
        if (value?.validations?.length) {
          const validate = validateFormField(
            get(this.updateForm, key),
            this.fields[key].validations,
            merge(this.form, this.updateForm)
          );

          if (validate !== true) {
            errors[key] = validate;
          }
        }
      });

      if (Object.keys(errors).length) {
        this.setErrors(errors);
        return false;
      }

      return true;
    },

    handleInput(event) {
      const { value, fieldKey } = event;
      this.resetFieldError(fieldKey);

      set(this.updateForm, fieldKey, value);

      //force update
      this.updateForm = { ...this.updateForm };
      this.$emit("update:update-form", this.updateForm);
    },

    setErrors(errors) {
      this.errors = { ...errors };
    },

    resetFieldError(fieldKey) {
      if (get(this.errors, fieldKey)) {
        set(this.errors, fieldKey, null);
      }
    },

    async submit(e) {
      if (this.submitFn) {
        await this.submitFn(this.updateForm);
      }

      this.updateForm = {};
    },

    setDefaultValuesToCreateForm() {
      if (this.isCreateForm) {
        this.updateForm = { ...this.form, ...this.updateForm };
      }
    },
  },

  mounted() {
    this.setDefaultValuesToCreateForm();
  },
};
</script>

<style></style>
