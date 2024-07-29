<template>
  <div>
    <loader :loading="loading"></loader>
    <form-with-validations
      :fields="fields"
      :form="form"
      :is-create-form="!form?.id"
      :submit-fn="submitToApi"
      :update-form.sync="updateForm"
      v-show="form.id"
    >
      <div id="employee-information-wrapper">
        <div id="scroll-wrapper" class="scroll-wrapper">
          <div class="py-cus px-1 d-flex align-center">
            <drop-zone
              :src="form?.photo"
              @vfileAdded="vfileAdded"
              @vfileRemove="removeImage('photo')"
              :confirmastionMessageModal="confirmastionMessageModal"
            ></drop-zone>
            <div class="ml-1">
              <aside style="text-transform: capitalize; font-weight: bold; font-size: 18px">
                {{ $getEmployeeFullName(form) }}
              </aside>
              <aside style="font-weight: 400; font-size: 14px">
                {{ form.jobTitle }}
              </aside>
            </div>
          </div>
          <div class="d-flex px-1" style="margin-top: 16px" v-if="show">
            <bib-button
              label="Send Message"
              :variant="isLightThemeCheck ? 'light' : 'dark'"
              icon="chat"
              class="mr-05"
              @click="sendMessage(form.userId)"
            ></bib-button>
            <bib-button
              label="Make a Call"
              :variant="isLightThemeCheck ? 'light' : 'dark'"
              icon="phone"
              @click="makeCall(getUser.userId, getUser.userId)"
            ></bib-button>
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
                <div id="my-profile-wrapper" class="my-profile-wrapper">
                  <div class="py-cus row-custom">
                    <div>
                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="First Name"
                            field-key="firstName"
                            :value="form?.firstName"
                            placeholder=""
                          ></form-input>
                        </div>
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Last Name"
                            field-key="lastName"
                            :value="form?.lastName"
                            placeholder="my place holder"
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
                            placeholder=""
                          ></form-input>
                        </div>
                        <div class="col-6">
                          <form-input
                            type="select"
                            label="Gender"
                            field-key="gender"
                            :value="form?.gender"
                            :options="genderOptions"
                            placeholder=""
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
                            :options="maritalOptions"
                            placeholder="Please select employee status"
                          ></form-input>
                        </div>
                        <div class="col-6" v-if="$isAccountAdmin()">
                          <form-input
                            type="select"
                            label="HRM Role"
                            field-key="hrmRole"
                            :value="form.hrmRole"
                            :options="hrmRoleOptions"
                            placeholder=""
                          ></form-input>
                        </div>
                      </div>

                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="select"
                            label="Timezone"
                            field-key="timezone"
                            :value="form?.timezone"
                            :options="timezones"
                            placeholder="Please select employee timezone"
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
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="email"
                          label="Secondary email"
                          field-key="secondaryEmail"
                          :value="form.secondaryEmail"
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
                        ></form-input>
                      </div>
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="Cell phone"
                          field-key="cellPhone"
                          :value="form.cellPhone"
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
                            indicator
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
                            placeholder=""
                          ></form-input>
                        </div>
                        <div class="col-4">
                          <form-input
                            type="select"
                            label="Province/State"
                            field-key="address.state"
                            :options="regions"
                            :value="form.address?.state"
                            placeholder="Please select state"
                            v-show="regions && !otherCountry"
                          ></form-input>
                          <form-input
                            type="text"
                            label="Province/State"
                            field-key="address.state"
                            :value="originalStateProvince"
                            placeholder=""
                            v-show="otherCountry"
                          ></form-input>
                        </div>

                        <div class="col-4">
                          <form-input
                            type="text"
                            label="City"
                            field-key="address.city"
                            :value="originalCity"
                            placeholder=""
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
                            placeholder=""
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
                          ></form-input>
                        </div>
                      </div>

                      <div class="row mx-0">
                        <div class="col-4">
                          <form-input
                            type="text"
                            label="Relationship"
                            field-key="emergencyContact.relationship"
                            :value="form.emergencyContact?.relationship"
                          ></form-input>
                        </div>
                        <div class="col-4">
                          <form-input
                            type="text"
                            label="Telephone"
                            field-key="emergencyContact.phone"
                            :value="form.emergencyContact?.phone"
                          ></form-input>
                        </div>
                        <div class="col-4">
                          <form-input
                            type="email"
                            label="Email"
                            field-key="emergencyContact.email"
                            :value="form.emergencyContact?.email"
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
    </form-with-validations>
  </div>
</template>

<script>
import { SELECT_OPTIONS, STATES } from "@/utils/constant/Constant";
import countries from "@/utils/constant/countries";
import regions from "../../utils/constant/regions";
import { updateEmployee } from "@/utils/functions/api_call/employees";
import {
  sendMessage,
  vfileAdded,
  meetLink,
  makeCall,
} from "@/utils/functions/functions_lib";
import { mapGetters } from "vuex";
import contactFormFieds from "./forms/contact-form-fieds";
import emergencyContactFields from "./forms/emergency-contact-fields";
import employeeAddressFields from "./forms/employee-address-fields";
import employeeProfileFields from "./forms/employee-profile-fields";
import { getEmployee } from "@/utils/functions/api_call/employees.js";
import { USER_ROLES } from "../../utils/constant/Constant";
import timezones from "../../utils/constant/new_timezones";
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      timezones: [
        ...timezones.map((timezone) => ({
          label: timezone.location,
          value: timezone.name,
        })),
      ],
      contactFormFieds,
      employeeProfileFields,
      employeeAddressFields,
      confirmastionMessageModal: false,
      dropzone: 0,
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

      hrmRoleOptions: [
        { label: "Admin", value: USER_ROLES.ADMIN },
        { label: "User", value: USER_ROLES.USER },
        { label: "HR Manager", value: USER_ROLES.MANAGER },
      ],
      countries,
      STATES,
      currentState: STATES,
      id: null,
      form: {},
      updateForm: {},
      errors: {},
      avatarUrl: "",
      uniqueId: null,
      loading: false,
      otherCountry: false,
      originalStateProvince: "",
      originalCity: "",
    };
  },
  mounted() {
    this.fetchEmployee();
    this.photoUpdateListner();
  },
  methods: {
    vfileAdded,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    meetLink,
    makeCall,
    async fetchEmployee() {
      this.loading = true;
      const id = this.$route.params.id ?? this.getUser?.id;
      if (id) {
        this.id = id;
        const employee = await getEmployee({ id });
        this.form = employee;
        this.originalStateProvince = this.form.address.state;
        this.originalCity = this.form.address.city;
        this.loading = false;
      }
    },
    removeImage(photo) {
      this.updateForm[photo] = "";
      const id = this.$route.params.id ?? this.getUser?.id;
      updateEmployee({ id: this.form.id, employee: this.updateForm }).then(
        (data) => {
          // this.debouncedNotification(PHOTO_DELETE);
          this.$root.$emit("profile-updated");

          this.debouncedNotification(COMMON_MESSAGE);
          this.dropzone += 1;
          this.$nuxt.$emit("top-nav-key", data);
          this.form = data;
          this.$root.$emit("update-header-photo");
          this.avatarUrl = "";
          this.confirmastionMessageModal = false;
          return;
        }
      );
    },
    photoUpdateListner() {
      this.$root.$on("photo-updated", async () => {
        try {
          if (this.avatarUrl) {
            this.form.photo = this.avatarUrl;
            this.updateForm.photo = this.avatarUrl;
            const updatedEmployee = await updateEmployee({
              id: this.form.id,
              employee: this.updateForm,
            });
            this.form = updatedEmployee;
            this.avatarUrl = "";
            this.debouncedNotification(COMMON_MESSAGE);
          }
        } catch (error) {
          console.error("Error updating employee details:", error);
        }
      });
    },
    debouncedNotification(value) {
      if (!this.debounced) {
        this.openPopupNotification(value);
        this.debounced = true;
        setTimeout(() => {
          this.debounced = false;
        }, 3000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)
      }
    },
    removephotoUpdateListener() {
      this.$root.$off("photo-updated", () => {
        this.submitToApi();
      });
    },
    submitToApi(form) {
      if (JSON.stringify(this.updateForm) === "{}") {
        return this.debouncedNotification(6);
      }
      updateEmployee({ id: this.form.id, employee: form }).then((data) => {
        // this.openPopupNotification(1);
        this.$nuxt.$emit("top-nav-key", data);
        this.form = data;
        this.originalStateProvince = this.form.address.state;
        this.originalCity = this.form.address.city;
        this.$root.$emit("profile-updated");
        this.avatarUrl = "";
        this.debouncedNotification(COMMON_MESSAGE);
        this.updateForm = {};
        return;
      });
    },

    sendMessage,
    updateStateAndCity(newCountry) {
      const newStateProvince = this.updateForm.address.state;
      const newCity = this.updateForm.address.city;
      if (!newCountry && !newStateProvince && !newCity) return;
      if (newCountry === this.originalCountry) {
        this.originalStateProvince = this.form.address.state;
        this.originalCity = this.form.address.city;
      } else {
        this.originalStateProvince = newStateProvince ?? (this.updateForm.address["state"] = "");;
        this.originalCity = newCity ?? (this.updateForm.address["city"] = "");
      }
    },
  },
  computed: {
    regions() {
      const country = this.updatedCountry ?? this.originalCountry;
      if (country === "United States" || country === "Canada") {
        this.otherCountry = false;
        return regions[country];
      } else {
        this.otherCountry = true;
      }
    },
    originalCountry() {
      return this.form?.address?.country;
    },
    updatedCountry() {
      return this.updateForm.address?.country;
    },
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
      getUserRole: "token/getUserRole",
    }),
  },

  beforeDestroy() {
    this.removephotoUpdateListener();
  },

  watch: {
    getUser() {
      if (this.id) return;
      this.fetchEmployee();
    },
    "updateForm.address.country"(newCountry) {
      this.updateStateAndCity(newCountry);
    },
  },
};
</script>
<style lang="scss">
.my-profile-wrapper{
  .vdpComponent {
    // width: 100%;
    .vdpComponent__input{
      min-width: 100%;
    }
    label {
      font-weight: bold !important;
      font-size: 14px !important;
    }
  }
}
</style>