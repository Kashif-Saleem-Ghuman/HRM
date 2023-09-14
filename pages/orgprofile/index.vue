<template>
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
            <!-- <drop-zone
              :src="org.Website"
              :className="org.Website != null ? 'hide' : ''"
              :customRemove="org.Website == null ? 'hide' : 'hide'"
              @vfileAdded="vfileAdded"
              style="pointer-events: none; cursor: default"
            ></drop-zone> -->
          </div>
          <div class="main-wrapper custom-input">
            <div class="row mx-0">
              <div class="col-6 row-custom">
                <org-info
                  :companyName="org.CompanyName"
                  :orgType="org.BizStage"
                  :estDate="org.SourceQParam"
                  :businessCategory="org.BizStage"
                  :location="org.City"
                  :inActive="inActiveCommon"
                  @input="handleOrgProfile"
                ></org-info>
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
                <company-contact-info
                  :website="org.Website"
                  :contactEmail="org.ContactEmail"
                  :contactPhone="org.ContactPhone"
                  @input="handleOrgProfile"
                  :inActive="inActiveCommon"
                ></company-contact-info>
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
                <org-address
                  :address1="org.AddressL1"
                  :address2="org.AddressL2 == null ? 'Null' : org.AddressL2"
                  :country="org.Country"
                  :state="org.StateProvince"
                  :city="org.City"
                  :postalCode="org.PostalCode"
                  :countryOptions="countries"
                  :stateOptions="cureentState"
                  :stateVisible="stateVisible"
                  :inActive="inActiveCommon"
                  @input="handleOrgProfile"
                ></org-address>
              </div>
            </div>
            <!-- <div class="row mx-0 pb-2 pt-05 pl-05">
              <div class="d-flex">
                <bib-button
                  label="Cancel"
                  size="xl"
                  variant="light"
                  class="mr-05"
                  @click="updateBusinessId"
                ></bib-button>
                <bib-button
                  label="Save"
                  size="xl"
                  variant="success"
                  @click="updateBusinessId"
                ></bib-button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <loader v-bind:showloader="loading"></loader>
  </div>
</template>
<script>
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { COUNTRIES, STATES } from "../../utils/constant/Constant.js";
import { mapGetters } from "vuex";
import {
  openPopupNotification,
  vfileAdded,
  getBusinessId,
  updateBusinessId,
  handleOrgProfile,
} from "../../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      id: this.$route.params.id,
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      org: {},
      msg: [],
      avatarUrl: "",
      updateForm: {},
      isFlag: false,
      infoUpdateOrgProfile: false,
      inActive: "enabled",
      loading: false,
      countries: COUNTRIES,
      states: STATES,
      cureentState: STATES,
      stateVisible: true,
      inActiveCommon:"disabled"
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
    }),
  },
  async mounted() {
    this.getBusinessId();
    console.log(this.org, "this.businessData");
  },
  methods: {
    getBusinessId,
    vfileAdded,
    updateBusinessId,
    handleOrgProfile,
    openPopupNotification,
    chnage(event, name) {
      this.updateForm[name] = event;
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
