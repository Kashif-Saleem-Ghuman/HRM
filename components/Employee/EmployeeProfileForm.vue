<template>
  <form-with-validation
    :fields="fields"
    :form="updateForm"
    @errors="setErrors"
    @on-submit-valid="submit"
  >
    <div id="employee-information-wrapper">
      <div id="scroll-wrapper" class="scroll-wrapper">
        <div class="py-cus px-1 d-flex align-center">
          <drop-zone
            :src="form.photo"
            :className="form.photo != null ? 'hide' : ''"
            :customRemove="form.photo == null ? 'hide' : 'hide'"
            @vfileAdded="vfileAdded"
          ></drop-zone>
          <div v-show="form.photo == null ? false : true">
            <aside style="font-weight: bold; font-size: 18px">
              {{ form.firstName }} {{ form.lastName }}
            </aside>
            <aside style="font-weight: 400; font-size: 14px">
              {{ form.jobTitle }}
            </aside>
          </div>
        </div>
        <div class="d-flex px-1" style="margin-top: -10px">
          <button-gray
            @on-click="sendMessage(form.userId)"
            icon="mail-new"
            variant="gray1"
            class="mr-05"
            :scale="0.8"
            title="Send Message"
            titleClass="button-title"
          ></button-gray>
          <button-gray
            @on-click="sendMeet(form.userId)"
            icon="device-mobile"
            variant="gray1"
            :scale="0.8"
            title="Make a call"
            titleClass="button-title"
          ></button-gray>
        </div>

        <div class="px-1">
          <div class="row">
            <div class="col-6">
              <!-- 
              FIRST NAME
              LAST NAME
              DATE OF BIRTH
              GENDER
              MARITAL STATUS
          -->
              <div id="my-profile-wrapper">
                <div class="py-cus row-custom">
                  <div>
                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="First Name"
                          field-key="firstName"
                          :value="form.firstName"
                          :error="errors.firstName"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="Last Name"
                          field-key="lastName"
                          :value="form?.lastName"
                          :error="errors?.lastName"
                          placeholder="my place holder"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>

                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="date"
                          label="Date of birth"
                          field-key="dateOfBirth"
                          :value="form.dateOfBirth"
                          :error="errors.dateOfBirth"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="select"
                          label="Gender"
                          field-key="gender"
                          :value="form?.gender"
                          :error="errors?.gender"
                          :options="genderOptions"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>

                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="select"
                          label="Marital Status"
                          field-key="maritalStatus"
                          :value="form?.maritalStatus"
                          :error="errors?.maritalStatus"
                          :options="maritalOptions"
                          placeholder="Please select employee status"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Info Wrapper Start Here  -->
              <div
                id="contact-info-wrapper"
                class="info-wrapper border-wrapper"
              >
                <div class="col-6">
                  <tabs-title
                    title="Contact"
                    variant="gray"
                    :scale="0.9"
                    class="py-1"
                  ></tabs-title>
                </div>

                <div>
                  <div class="row mx-0">
                    <div class="col-6">
                      <form-input
                        type="email"
                        label="Primary email"
                        field-key="primaryEmail"
                        :value="form.primaryEmail"
                        :error="errors.primaryEmail"
                        @input="handleInput"
                      ></form-input>
                    </div>
                    <div class="col-6">
                      <form-input
                        type="email"
                        label="Secondary email"
                        field-key="secondaryEmail"
                        :value="form.secondaryEmail"
                        :error="errors.secondaryEmail"
                        @input="handleInput"
                      ></form-input>
                    </div>
                  </div>
                  <div class="row mx-0">
                    <div class="col-6">
                      <form-input
                        type="text"
                        label="Home phone"
                        field-key="homePhone"
                        :value="form.homePhone"
                        :error="errors?.homePhone"
                        @input="handleInput"
                      ></form-input>
                    </div>
                    <div class="col-6">
                      <form-input
                        type="text"
                        label="Cell phone"
                        field-key="cellPhone"
                        :value="form.cellPhone"
                        :error="errors.cellPhone"
                        @input="handleInput"
                      ></form-input>
                    </div>
                  </div>
                </div>
              </div>
              <!-- address Info Wrapper Start Here  -->
              <div id="address-wrapper" class="border-wrapper">
                <div class="col-6">
                  <tabs-title
                    title="Address"
                    variant="gray"
                    :scale="0.9"
                    class="py-1"
                  ></tabs-title>
                </div>
                <div>
                  <div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Street number and name"
                          field-key="address.addressLine1"
                          :value="form.address?.addressLine1"
                          :error="errors.address?.addressLine1"
                          indicator
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Suite/Apartment"
                          field-key="address.addressLine2"
                          :value="form.address?.addressLine2"
                          :error="errors.address?.addressLine2"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>

                    <!-- address  -->
                    <div class="row mx-0">
                      <div class="col-4">
                        <form-input
                          type="select"
                          label="Country"
                          field-key="address.country"
                          :options="countries"
                          :value="form.address?.country"
                          :error="errors.address?.country"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-4">
                        <form-input
                          type="select"
                          label="Province/State"
                          field-key="address.state"
                          :options="states"
                          :value="form.address?.state"
                          :error="errors.address?.state"
                          placeholder="Please select state"
                          @input="handleInput"
                        ></form-input>
                      </div>

                      <div class="col-4">
                        <form-input
                          type="text"
                          label="City"
                          field-key="address.city"
                          :value="form.address?.city"
                          :error="errors.address?.city"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Postal Code"
                          field-key="address.postalCode"
                          :value="form.address?.postalCode"
                          :error="errors?.address?.postalCode"
                          placeholder=""
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- emergency detail Info Wrapper Start Here  -->
              <div class="address-info-wrapper border-wrapper">
                <div class="col-6">
                  <tabs-title
                    title="Emergency Contact"
                    variant="gray"
                    :scale="0.9"
                    class="py-1"
                  ></tabs-title>
                </div>
                <div>
                  <div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Contact name"
                          field-key="emergencyContact.name"
                          :value="form.emergencyContact?.name"
                          :error="errors.emergencyContact?.name"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>

                    <div class="row mx-0">
                      <div class="col-4">
                        <form-input
                          type="text"
                          label="Releationship"
                          field-key="emergencyContact.relationship"
                          :value="form.emergencyContact?.relationship"
                          :error="errors.emergencyContact?.relationship"
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-4">
                        <form-input
                          type="text"
                          label="Telephone"
                          field-key="emergencyContact.phone"
                          :value="form.emergencyContact?.phone"
                          :error="errors.emergencyContact?.phone"
                          @input="handleInput"
                        ></form-input>
                      </div>
                      <div class="col-4">
                        <form-input
                          type="email"
                          label="Email"
                          field-key="emergencyContact.email"
                          :value="form.emergencyContact?.email"
                          :error="errors.emergencyContact?.email"
                          @input="handleInput"
                        ></form-input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </form-with-validation>
</template>

<script>
import { COUNTRIES, SELECT_OPTIONS, STATES } from "@/utils/constant/Constant";
import { popupNotificationMsgs } from "@/utils/constant/Notifications";
import {
isValidCanadianPostalCode,
isValidUSZIP,
} from "@/utils/form-validations/string-validations";
import { validateFormField } from "@/utils/form-validations/validate-form-field";
import { updateEmployee } from "@/utils/functions/api_call/employees";
import {
sendMeet,
sendMessage,
vfileAdded,
} from "@/utils/functions/functions_lib";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";
import { set } from "lodash";
import { mapGetters } from "vuex";
import contactFormFieds from "./forms/contact-form-fieds";
import emergencyContactFields from "./forms/emergency-contact-fields";
import employeeAddressFields from "./forms/employee-address-fields";
import employeeProfileFields from "./forms/employee-profile-fields";
import { getEmployee } from "@/utils/functions/api_call/employees.js"
import formWithValidationMixin from "@/mixins/form-with-validation-mixin";
export default {
  mixins: [formWithValidationMixin],

  data() {
    return {
      contactFormFieds,
      employeeProfileFields,
      employeeAddressFields,
      fields: {
        ...contactFormFieds,
        ...employeeProfileFields,
        ...employeeAddressFields,
        ...emergencyContactFields,
      },
      maritalOptions: [
        { label: "", value: "" },
        ...SELECT_OPTIONS.maritalStatusOptions,
      ],
      genderOptions: [
        { label: "", value: "" },
        ...SELECT_OPTIONS.genderOptions,
      ],
      countries: COUNTRIES,
      STATES,
      currentState: STATES,
      id: null,
      form: {},
      updateForm: {},
      errors: {},
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
    };
  },
  methods: {
    vfileAdded,
    openPopupNotification,

    async fetchEmployee() {
      const id = this.$route.params.id ?? this.getUser?.id

      if (id) {
        this.id = id
        const employee = await getEmployee({ id })
        this.form = employee
      }
    },

    customValidation() {
      const isPostalCodeValid = this.validatePostalCode();

      return [isPostalCodeValid].every((validation) => validation == true);
    },

    validatePostalCode() {
      if (this.updateForm?.address?.postalCode) {
        const country =
          this.updateForm?.address?.country ?? this.form?.address?.country;
        const isUsa = country == "USA";
        const isCanada = country == "Canada";
        if (isCanada || isUsa) {
          const validations = [];

          if (isCanada) {
            validations.push(isValidCanadianPostalCode);
          } else if (isUsa) {
            validations.push(isValidUSZIP);
          }
          const valid = validateFormField(
            this.updateForm?.address?.postalCode,
            validations
          );
          if (valid !== true) {
            let errors = { ...this.errors };
            set(errors, "address.postalCode", valid);
            this.setErrors(errors);
            return false;
          }
        }
      }

      return true;
    },

    submitToApi() {
      // this.openPopupNotification(1)
      updateEmployee({ id: this.form.id, employee: this.updateForm }).then(
        (data) => {
          this.openPopupNotification(1);
          this.$nuxt.$emit("top-nav-key");
          this.form = data;
        }
      );
    },

    sendMeet,
    sendMessage,
  },
  computed: {
    states() {
      if (this.updatedCountry) {
        return [
          { label: "", value: "" },
          ...STATES.filter((s) => s.code == this.updatedCountry),
        ];
      }

      return [
        { label: "", value: "" },
        ...STATES.filter((s) => s.code == this.originalCountry),
      ];
    },
    originalCountry() {
      return this.form?.address?.country;
    },
    updatedCountry() {
      return this.updateForm.address?.country;
    },
    ...mapGetters({
      getUser: "employee/GET_USER",
      getActiveUserData: "token/getActiveUserData",
    }),
  },

  mounted() {
    this.fetchEmployee()
  },

  watch: {
    getUser() {
      if (this.id) return
      this.fetchEmployee()
    }
  },
};
</script>
