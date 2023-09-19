<template>
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
        @on-click="sendMessage()"
        icon="mail-new"
        variant="gray1"
        class="mr-05"
        :scale="0.8"
        title="Send Message"
        titleClass="button-title"
      ></button-gray>
      <button-gray
        @on-click="sendMeet()"
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
          <!-- my profile Info Wrapper Start Here  -->
          <div id="my-profile-wrapper">
            <div class="py-cus row-custom">
              <employee-profile
                :firstName="form.firstName"
                :lastName="form.lastName"
                :maritalStatus="form.marital"
                :maritalOptions="maritalOptions"
                :genderOptions="genderOptions"
                :gender="form.gender"
                :dob="form.dateOfBirth"
                @input="handleInput"
              ></employee-profile>
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
            <contact-info
              :primaryEmail="form?.email"
              :seondaryEmail="form?.seondaryEmail"
              :homePhone="form?.homePhone"
              :cellPhone="form?.phone"
              :errorMsgPrimaryEmail="errorMsgPrimaryEmail"
              @input="handleInput"
            >
            </contact-info>
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
            <address-detail
              :street="form?.address?.addressLine1"
              :suitApartment="form?.address?.addressLine2"
              :country="form?.address?.country"
              :countryOptions="countries"
              :state="form?.address?.state"
              :city="form?.address?.city"
              :stateOptions="currentState"
              :stateVisible="stateVisible"
              :postalCode="form?.address?.postalCode"
              :errorMsgStreet="errorMsgStreet"
              :errorMsgSuit="errorMsgSuit"
              :errorMsgCountry="errorMsgCountry"
              :errorMsgState="errorMsgState"
              :otherStateShow="otherStateVisible"
              :errorMsgPostalCode="errorMsgPostalCode"
              @input="handleInput"
            ></address-detail>
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
              <emergency-conta
                :fullName="form?.emergencyContact?.name"
                :releationships="
                    form?.emergencyContact?.relationship
                "
                :telephone="form?.emergencyContact?.phone"
                :email="form?.emergencyContact?.email"
                @input="handleInputObject"
              ></emergency-conta>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="action-button">
    <div class="row mx-0 pl-1 pb-2 pt-1">
      <div class="col-6 row-custom">
        <div class="d-flex justify-between align-center button-custom-wrapper">
          <bib-button
            label="Cancle"
            variant="gray"
            size="lg"
            class="mr-1"
            style="
              width: 50%;
              display: flex;
              justify-content: center;
            "
          ></bib-button>
          <bib-button
            label="Save"
            variant="success"
            size="lg"
            @click="updateAllData"
            style="
              width: 50%;
              display: flex;
              justify-content: center;
            "
          ></bib-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { COUNTRIES, SELECT_OPTIONS, STATES } from '../../../utils/constant/Constant';
import { 
  vfileAdded,
  handleInput,
  handleInputObject,
  updateAllData,
} from '../../../utils/functions/functions_lib';

export default {
  data() {
    return {
      maritalOptions: SELECT_OPTIONS.maritalStatusOptions,
      genderOptions: SELECT_OPTIONS.genderOptions,
      errorMsgPrimaryEmail: false,
      countries: COUNTRIES,
      currentState: STATES,
      stateVisible: true,
      errorMsgStreet: false,
      errorMsgSuit: false,
      errorMsgCountry: false,
      errorMsgState: false,
      otherStateVisible: false,
      errorMsgPostalCode: false,
      id: '',
      form: {},
      updateForm:{},
    };
  },
  methods: {
    vfileAdded,
    handleInput,
    handleInputObject,
    updateAllData,
    sendMeet(){
      var genratedId = this.form.userId;
      var meetId = genratedId.toUpperCase();
      var id = meetId.match(/.{1,6}/g);
     var newValue =  id.join("-");
      window.open('https://dev-connect.business-in-a-box.com/' + newValue + '?webcam=inactive', "_blank")
    },
    sendMessage(){
      window.open('https://dev-chat.business-in-a-box.com/directs/'+ this.form.userId, "_blank")
    },
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
    })
  },
  async created() {
    this.id = this.$route.params.id;
    await this.$store.dispatch("employee/setUser", this.id);
    this.form = this.getUser;
  }
}
</script>