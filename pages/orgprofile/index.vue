<template>
  <form-with-validation
    :fields="fields"
    :form="updateForm"
    :is-create-form="!org?.id"
    :submit-fn="submitToApi"
  >
    <div class="employee_wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper py-075 px-025 bottom_border_wrapper"
      >
        <section-header-left
          title="Org Profile"
          headerRight="headerRight"
        ></section-header-left>
      </div>
      <div>
        <div class="px-1">
          <div id="info-wrapper">
            <div class="row mx-0 pt-2">
              <div class="col-6">
                <tabs-title
                  title="Employee Detail"
                  variant="gray"
                  icon="info"
                  :scale="0.9"
                ></tabs-title>
              </div>
            </div>
            <div class="py-cus px-05">
              <div class="company-info">
                <div class="company-logo">
                  <bib-icon icon="bib-logo" :scale="5"></bib-icon>
                </div>
                <div class="company-items">
                  <label>{{ org.CompanyName }}</label>
                  <span>{{ org.BizStage }}</span>
                </div>
              </div>
            </div>
            <div class="main-wrapper custom-input">
              <div class="row mx-0">
                <div class="col-6 row-custom">
                  <div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Organization Name"
                          field-key="CompanyName"
                          :value="org.CompanyName"
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
                          form-field="Industry"
                          :value="org.Industry"
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
            <div class="main-wrapper custom-input pt-1">
              <div class="row mx-0">
                <div class="col-6 row-custom">
                  <div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Website"
                          field-key="Website"
                          :value="org.Website"
                        ></form-input>
                        <form-input
                          type="email"
                          label="Email address"
                          field-key="ContactEmail"
                          :value="org.ContactEmail"
                        ></form-input>
                        <form-input
                          type="text"
                          label="Telephone"
                          field-key="ContactPhone"
                          :value="org.ContactPhone"
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
            <div class="main-wrapper custom-input pt-1">
              <div class="row mx-0">
                <div class="col-6 row-custom">
                  <div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Address 1"
                          :value="org.AddressL1"
                          
                          field-key="AddressL1"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-12">
                        <form-input
                          type="text"
                          label="Address 2"
                          field-key="AddressL2"
                          :value="org.AddressL2"
                          
                          placeholder="Address 2"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-4">
                        <form-input
                          type="select"
                          label="Country"
                          field-key="Country"
                          :options="countries"
                          :value="org.Country"
                          
                          placeholder="Please select country"
                        ></form-input>
                      </div>
                      <div class="col-4" v-show="regions">
                        <form-input
                          type="select"
                          label="Province/State"
                          :options="regions"
                          :value="org.State"
                          
                          field-key="State"
                          placeholder="Please select state"
                        ></form-input>
                      </div>
                      <div class="col-4">
                        <form-input
                          type="text"
                          label="City"
                          :value="org.City"
                          
                          field-key="City"
                          placeholder="Enter your city"
                        ></form-input>
                      </div>
                    </div>
                    <div class="row mx-0">
                      <div class="col-6">
                        <form-input
                          type="text"
                          label="Postal Code"
                          field-key="PostalCode"
                          :value="org.PostalCode"
                          
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
      <bib-notification :popupMessages="popupMessages"></bib-notification>
      <loader v-bind:showloader="loading"></loader>
    </div>
  </form-with-validation>
</template>
<script>
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { mapGetters } from "vuex";
import {
  vfileAdded,
  getBusinessId,
} from "../../utils/functions/functions_lib.js";
import organizationFields from "./organization-fields";
import countries from "../../utils/constant/countries";
import regions from "../../utils/constant/regions";
import { updateOrganization } from "@/utils/functions/api_call/business.js";
export default {

  data() {
    return {
      fields: { ...organizationFields },
      countries,
      id: this.$route.params.id,
      popupMessages: [],
      org: {},
      updateForm: {},
      errors: {},
      loading: false,
    };
  },
  created() {},
  computed: {
    regions() {
      const country = this.updateForm.Country ?? this.org.Country;
      return regions[country];
    },
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
    }),
  },
  async mounted() {
    this.getBusinessId();
  },
  methods: {
    getBusinessId,
    vfileAdded,
    async submitToApi() {
      const payload = {
        id: this.org.Id,
        organization: { ...this.org, ...this.updateForm },
      };
      await updateOrganization(payload);
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
      color: #000;
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
