import { get, set } from "lodash";

export default {
  data() {
    return {
      form: {},
      updateForm: {},
      errors: {},
    };
  },

  methods: {
    handleInput(event) {
      const { value, fieldKey } = event;
      this.resetFieldError(fieldKey);

      set(this.updateForm, fieldKey, value);

      //force update
      this.updateForm = { ...this.updateForm };
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
      // component that implements this mixin can add custom validations
      if (this.customValidation) {
        const valid = this.customValidation();
        if (!valid) return;
      }

      // this function needs to be implemented in component that implements this mixin
      await this.submitToApi();

      this.updateForm = {};
    },
  },
};
