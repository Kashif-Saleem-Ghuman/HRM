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
          <div class="py-cus">
            <drop-zone
              :src="org.Website"
              :className="org.Website != null ? 'hide' : ''"
              :customRemove="org.Website == null ? 'hide' : 'hide'"
              @vfileAdded="vfileAdded"
              style="pointer-events: none; cursor: default"
            ></drop-zone>
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
                  :inActive="inActive"
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
                  :inActive="inActive"
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
                  :inActive="inActive"
                ></org-address>
              </div>
            </div>
            <div class="row mx-0 pb-2 pt-05 pl-05">
              <div class="d-flex">
                      <bib-button
                        label="Cancle"
                        size="xl"
                        variant="light"
                        class="mr-05"
                        @click="updateAllData()"
                      ></bib-button>
                      <bib-button
                        label="Save"
                        size="xl"
                        variant="success"
                        @click="updateAllData()"
                      ></bib-button>
                    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <loader v-bind:showloader="loading" :text="loaderMessage"></loader>
  </div>
</template>
<script>
import getJson from "../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
import { mapGetters } from "vuex";
import {
  openPopupNotification,
  vfileAdded,
  getBusinessId,
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
      infoUpdateOrgProfile: true,
      inActive: "disabled",
      infoUpdateOrgProfile: true,
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
    openPopupNotification,
    chnage(event, name) {
      this.updateForm[name] = event;
    },
  },
};
</script>
<style lang="scss"></style>
