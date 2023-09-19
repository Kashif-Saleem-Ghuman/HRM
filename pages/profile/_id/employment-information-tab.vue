<template>
<div id="employee-information-wrapper">
  <div id="scroll-wrapper" class="scroll-wrapper">
    <div class="px-1">
      <div class="row">
        <div class="col-6">
          <!-- my profile Info Wrapper Start Here  -->
          <div id="my-profile-wrapper">
            <div class="py-cus row-custom">
              <add-employement-info
                :employeeStatus="form?.employeeStatus"
                :esstatusOptions="statusOptions"
                :employeeNumber="form?.employeeNo"
                :socialInsuranceNumber="form?.sin"
                :hireDate="form?.hireDate"
                :employeeType="form?.sin"
                @input="handleInput"
              ></add-employement-info>
            </div>
          </div>

          <!-- Contact Info Wrapper Start Here  -->
          <div class="border-wrapper">
            <div class="contact-info-wrapper">
              <div class="row mx-0">
                <div class="col-6">
                  <tabs-title
                    title="Placement"
                    variant="gray"
                    :scale="0.9"
                    class="py-1"
                  ></tabs-title>
                </div>
              </div>
              <div>
                <placement
                  :workTitle="form?.jobTitle"
                  :department="form?.department"
                  :reportsTo="form?.managerId"
                  :reportOptions="reportOptions"
                  :workEmail="form?.email"
                  :workTelephone="form?.phone"
                  :workExt="form?.workExt"
                  @input="handleInput"
                ></placement>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import { mapGetters } from "vuex";
import { SELECT_OPTIONS } from '../../../utils/constant/Constant';
import { handleInput, updateAllData, } from '../../../utils/functions/functions_lib'

export default {
  data() {
    return {
      statusOptions: SELECT_OPTIONS.esstatusOptions,
      reportOptions: [],
      form: {},
      id: '',
    };
  },
  methods: {
    handleInput,
    updateAllData,
  },
  async created() {
    this.id = this.$route.params.id;
    await this.$store.dispatch("employee/setUser", this.id);
    this.form = this.getUser;
    await this.$store.dispatch("employee/setReportsToList").then((result) => {
      this.reportOptions = result;
    });
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
    })
  }
}
</script>