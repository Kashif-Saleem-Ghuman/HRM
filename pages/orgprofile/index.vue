<template>
  <div>
    <loader :loading="loading"></loader>
    <form-with-validations
      :fields="fields"
      :form="org"
      :is-create-form="!org?.id"
      :submit-fn="submitToApi"
      :update-form.sync="updateForm"
    >
      <div class="employee_wrapper">
        <div class="nav_wrapper_border_bottom">
          <section-header-left
            title="Organization Profile"
          ></section-header-left>
        </div>
        <div class="scroll-wrapper" style="min-height: 770px">
          <div class="px-1">
            <div id="info-wrapper">
              <div class="py-cus px-05">
                <div class="company-info">
                  <div class="company-logo">
                    <bib-logo :square="true" size="112px" :isLightTheme="isLightThemeCheck"></bib-logo>
                  </div>
                  <div class="company-items">
                    <label>{{ org.companyName }}</label>
                    <span>{{ org.BizStage }}</span>
                  </div>
                </div>
              </div>
              <div class="custom-input">
                <div class="row mx-0">
                  <div class="col-6 row-custom">
                    <div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="text"
                            label="Company Name"
                            field-key="companyName"
                            :value="org.companyName"
                            placeholder="Type your name"
                          ></form-input>
                        </div>
                      </div>

                      <div class="row mx-0"></div>
                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Business category"
                            field-key="industry"
                            :value="org.industry"
                            placeholder=""
                          ></form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="info-wrapper">
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <tabs-title
                    title="Contact"
                    variant="gray"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="custom-input pt-1">
                <div class="row mx-0">
                  <div class="col-6 row-custom">
                    <div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="text"
                            label="Website"
                            field-key="website"
                            :value="org.website"
                          ></form-input>
                          <form-input
                            type="email"
                            label="Email address"
                            field-key="contactEmail"
                            :value="org.contactEmail"
                          ></form-input>
                          <form-input
                            type="text"
                            label="Telephone"
                            field-key="contactPhone"
                            :value="org.contactPhone"
                          ></form-input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="info-wrapper">
              <div class="row mx-0 pt-1">
                <div class="col-6">
                  <tabs-title
                    title="Contact"
                    variant="gray"
                    :scale="0.9"
                  ></tabs-title>
                </div>
              </div>
              <div class="custom-input pt-1">
                <div class="row mx-0">
                  <div class="col-6 row-custom">
                    <div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="text"
                            label="Street number and name"
                            :value="org.addressL1"
                            field-key="addressL1"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-12">
                          <form-input
                            type="text"
                            label="Suite/Appartment"
                            field-key="addressL2"
                            :value="org.addressL2"
                            placeholder="Address 2"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-4">
                          <form-input
                            type="select"
                            label="Country"
                            field-key="country"
                            :options="countries"
                            :value="org.country"
                            placeholder="Please select country"
                          ></form-input>
                        </div>
                        <div class="col-4">
                          <form-input
                            type="select"
                            label="Province/State"
                            :options="regions"
                            :value="org.stateProvince"
                            field-key="stateProvince"
                            placeholder="Please select state"
                            v-show="regions && !otherCountry"
                          ></form-input>
                          <form-input
                            type="text"
                            label="Province/State"
                            :value="originalStateProvince"
                            field-key="stateProvince"
                            placeholder="Please select state"
                            v-show="otherCountry"
                          ></form-input>
                        </div>
                        <div class="col-4">
                          <form-input
                            type="text"
                            label="City"
                            :value="originalCity"
                            field-key="city"
                            placeholder="Enter your city"
                          ></form-input>
                        </div>
                      </div>
                      <div class="row mx-0">
                        <div class="col-6">
                          <form-input
                            type="text"
                            label="Postal Code"
                            field-key="postalCode"
                            :value="org.postalCode"
                            placeholder="Postal Code"
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
import { mapGetters } from "vuex";
import { vfileAdded } from "../../utils/functions/functions_lib.js";
import organizationFields from "./organization-fields";
import countries from "../../utils/constant/countries";
import regions from "../../utils/constant/regions";
import {
  getOrganization,
  updateOrganization,
} from "../../utils/functions/api_call/organizations";

export default {
  data() {
    return {
      fields: { ...organizationFields },
      countries,
      id: this.$route.params.id,
      org: {},
      updateForm: {},
      errors: {},
      loading: false,
      otherCountry: false,
      originalStateProvince: "",
      originalCity: "",
    };
  },
  async mounted() {
    this.fetchOrganization();
  },
  methods: {
    vfileAdded,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },

    async fetchOrganization() {
      this.loading = true;
      try {
        const organizationId = this.organizationId;
        if (!organizationId) return;

        const organization = await getOrganization({ id: organizationId });
        this.org = organization;
        this.originalStateProvince = this.org.stateProvince;
        this.originalCity = this.org.city;
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false;
    },

    async submitToApi(form) {
      const payload = {
        id: this.org.id,
        organization: this.updateForm,
      };
      await updateOrganization(payload).then(() => {
        this.originalStateProvince = this.org.stateProvince;
        this.originalCity = this.org.city;
        this.$openPopupNotification(4);
      });
    },
    updateStateAndCity(newCountry) {
      const newStateProvince = this.updateForm.stateProvince;
      const newCity = this.updateForm.city;
      if (newCountry === this.originalCountry) {
        this.originalStateProvince = this.org.stateProvince;
        this.originalCity = this.org.city;
      } else {
        this.originalStateProvince =
          newStateProvince ?? (this.updateForm["stateProvince"] = "");
        this.originalCity = newCity ?? (this.updateForm["city"] = "");
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
      return this.org?.country;
    },
    updatedCountry() {
      return this.updateForm.country;
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      organizationId: "organizations/organizationId",
    }),
  },
  watch: {
    organizationId(val) {
      if (val && !this.org?.id) {
        this.fetchOrganization();
      }
    },
    "updateForm.country"(newCountry) {
      this.updateStateAndCity(newCountry);
    },
  },
};
</script>
<style lang="scss">
.company-info {
  display: flex;
  align-items: center;
  .company-logo {
    background-color: #f3f4f4;
    padding: 1rem;
    border-radius: 16px;
  }
  .company-items {
    display: block;
    align-items: center;
    padding-left: 1rem;
    label {
      font-size: 18px;
      color: $black;
      display: block;
      font-weight: 600;
    }
    span {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
