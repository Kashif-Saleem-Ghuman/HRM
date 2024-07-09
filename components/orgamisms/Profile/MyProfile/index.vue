<template>
  <div class="my-profile-wrapper">
      <section-header-left
        :title="
          getEmployeeFullName(form) != 'undefined undefined'
            ? getEmployeeFullName(form)
            : '---'
        "
        :key="topNav"
      ></section-header-left>
    <div class="section-wrapper custom-input">
      <div class="tab-wrapper">
        <div class="px-1 bottom_border_wrapper">
          <div class="">
            <bib-tabs
              :tabs="personalTabItem"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>
        <div class="main-wrapper">
          <!-- Employe Profile Wrapper Start Here  -->
          <div id="employee-profile-wrapper">
            <div v-if="activeTab == personalTabItem[0].value">
              <employee-profile-form :show="false"></employee-profile-form>
            </div>
          </div>
          <div id="employee-information-wrapper">
            <div v-if="activeTab == personalTabItem[1].value">
              <employment-info-form
                :buttonDisable="true"
              ></employment-info-form>
            </div>
          </div>
          <div id="files-information-wrapper">
            <div v-if="activeTab == personalTabItem[2].value">
              <div id="scroll-wrapper" class="scroll-wrapper">
                <files-form></files-form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { EMPLOYEE_PROFILE_TAB } from "../../../../utils/constant/Constant.js";

import { vfileAdded } from "../../../../utils/functions/functions_lib.js";
import {
  getEmployeeFullName,
  getEmployeeInitials,
} from "@/utils/functions/common_functions";

import fecha from "fecha";
import getJson from "../../../../utils/dataJson/app_wrap_data";
const appWrapItems = getJson();
export default {
  data() {
    return {
      id: "",
      loading: false,
      personalTabItem: EMPLOYEE_PROFILE_TAB,
      activeTab: "Employee Profile",
      dropzoneDisable: "pointer-events: none; cursor: default; opacity:0.5",
      inactiveCommon: "disabled",
      form: {},
      formOptions: {},
      updateForm: {},
      confirmastionMessageModal: false,

      errorMsgPrimaryEmail: false,
      topNav: 0,
      name: {},
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
    }),
  },
mounted(){
  this.profileUpdateListener();
},
  async created() {
    this.id = this.getUser.id;
    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.form = users;
  },
  methods: {
    getEmployeeFullName,
    getEmployeeInitials,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    profileUpdateListener() {
      this.$root.$on("profile-updated", async () => {
        await this.$store.dispatch("employee/setActiveUser");
        var users = this.getUser;
        this.form = users;
        this.topNav += 1;
      });
    },
    removeProfileUpdateListener() {
      this.$root.$off("profile-updated");
    },
    vfileAdded,
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    parseDate(dateString, format) {
      return fecha.parse(dateString, format);
    },
    formatDate(dateObj, format) {
      return fecha.format(dateObj, format);
    },
    dateSlection(event) {
      var date = fecha.format(new Date(event), "YYYY-MM-DD");
      this.todayDate = date;
      this.getTimeAttendanceDaily(date);
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    deleteItemConfirmation(event) {
      this.confirmastionMessageModal = true;
      this.deleteItemId = event;
    },
    async deleteItem() {
      await this.deleteLevaeVacation(this.deleteItemId);
      await this.getCurrentYear();
      this.$store
        .dispatch("leavevacation/setLeaveVacationsUser", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        })
        .then(() => {
          this.$nuxt.$emit("leaves-list");
        });
    },
  },
  beforeDestroy() {
    this.removeProfileUpdateListener();
  },
};
</script>
<style lang="scss">
.custom-dropzone {
  .input--file {
    background: $white;
    margin: 0 10px;
    border-radius: 6px;
    div {
      background-color: $white;
      border-radius: 10px;
      max-height: 150px !important;
      div:nth-child(1) {
        align-items: center;
        display: flex;
      }
    }
  }
  .border-gray4 {
    border: none !important;
    margin-left: -15px;
  }
}
.section-wrapper {
  width: 100%;

  .section-left {
    width: 50%;
    height: 100%;
  }

  .section-mid {
    border-left: 1px solid $secondary-sub3;
  }

  .section-right {
    width: 50%;
  }
}
.dropdown {
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  select {
    margin-bottom: 12px !important;
    border-radius: 4px;
    padding: 8px;
  }
}
.dropdown span {
  display: inline-block;
  width: 80px;
}
.border-wrapper {
  border: solid 1px $light;
  border-radius: 5px;
  padding: 0px 10px 1rem 10px;
  margin-bottom: 16px;
  margin-right: -5px;
}
.time-attendance-wrapper {
  .button-items {
    display: flex;
    align-items: center;

    label {
      padding-right: 5px;
      font-size: 14px;
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid $secondary-sub3;
      border-radius: 0.2rem;
      background-color: $secondary-sub3;
      color: #6d7278;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
      option {
        background-color: $white;
        color: #6d7278;
      }
    }
  }
  .menu-items {
    background-color: $white;
    width: 97px;
    box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
    border-radius: 10px;
    position: absolute;
    left: 0px;
    top: 0px;
    ul {
      margin: 0;
      padding: 0;
      border: var(--bib-gray3) solid 1px;
      border-radius: 0.5rem;
      box-shadow: 0 0 0.4rem 0.1rem rgba(var(--bib-gray2), 0.7);
      background: var(--bib-white);
      li {
        padding: 5px 0;
      }
    }
  }
}
.button-custom-wrapper {
  .button {
    text-align: center;
    display: flex;
    justify-content: center;
    a {
      display: flex;
      justify-content: center;
    }
    div {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
