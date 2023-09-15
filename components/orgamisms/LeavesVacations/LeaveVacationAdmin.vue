<template>
  <div>
    <div id="people-action-wrapper">
      <div class="d-flex justify-between align-center bottom_border_wrapper">
        <section-header-left
          title="Leave & Vacations"
          headerRight="headerRight"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div class="bottom_border_wrapper">
          <div class="px-1">
            <bib-tabs
              :tabs="leaveVacation"
              :value="activeTab"
              @change="handleChange_Tabs"
            ></bib-tabs>
          </div>
        </div>

        <div id="dashboard-wrapper">
          <div class="" id="dashboard_info_wrapper">
            <div v-if="activeTab == leaveVacation[0].value">
              <div class="scroll_wrapper">
                <div>
                  <calendar-feature :key="componentKey"></calendar-feature>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="pending-request-wrapper">
          <div class="" id="pending_request_wrapper">
            <div v-if="activeTab == leaveVacation[1].value">
              <div
                class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"  v-show="requestListData.length ? true : false"
              >
                <div class="d-flex align-center">
                  <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Approved"
                    class="mr-05"
                    className="button button-custom--lightsuccess"
                    :disabled="disabled"
                    @on-click="pendingApproveRequest('approve')"
                  ></button-green>
                  <button-green
                    icon="add"
                    variant="danger"
                    :scale="1"
                    title="Reject"
                    className="button-custom--pending"
                    disabled
                    @on-click="pendingApproveRequest('approve')"
                  ></button-green>
                  <!-- <button-green
                    icon="add"
                    variant="warning"
                    :scale="1"
                    title="Reject"
                    @on-click="pendingApproveRequest('approve')"
                  ></button-green>
                  <button-warning
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Pending"
                    @on-click="pendingApproveRequest('pending')"
                  ></button-warning> -->
                </div>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <list-pending
                    :listPending="requestListData"
                    @input="getIdValue($event)"
                    @selectAllItems="selectAllItems()"
                    :key="pendingList"
                    :checked="checked"
                    :checkedAll="checkedAll"
                    @reject-item="rejectItem($event)"
                    @approve-item="approveItem($event)"
                    v-show="requestListData.length ? true : ''"
                  ></list-pending>
                </div>
                <div>
                  <no-record
                    v-show="requestListData.length ? '' : true"
                  ></no-record>
                </div>
                <bib-notification
                  :popupMessages="popupMessages"
                ></bib-notification>
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
import { LEAVEVACATION_TAB } from "../../../utils/constant/Constant";
import {
  getPendingLeaveVacationsAdmin,
  getApproveLeaveVacationsAdmin,
  getRejectLeaveVacationsAdmin,
} from "../../../utils/functions/functions_lib_api";
import { popupNotificationMsgs } from "../../../utils/constant/Notifications";
import { openPopupNotification } from "../../../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      componentKey: 0,
      leaveVacation: LEAVEVACATION_TAB,
      activeTab: "Dashboard",
      addLeaveSidebar: false,
      addVacationSidebar: false,
      slideClass: "slide-in",
      leaveVacationAdminData: [],
      pendingLeaveVacationAdminData: [],
      fromDate: "2023-06-06T01:04:18.528Z",
      toDate: "2023-07-30T10:04:18.528Z",
      getRequest: {},
      requestListData: [],
      addIds: [],
      pendingList: 0,
      requestListApproveData: [],
      checked: false,
      checkedAll: false,
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
      noRecord: false,
      disabled:true,
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getformToDate: "leavevacation/getformToDate",
    }),
  },
  created() {
    this.$root.$on("update-key", () => {
      this.componentKey += 1;
    });
    this.$root.$on("pending-key", () => {
      this.pendingList += 1;
    });
    this.addIds = [];
  },
  mounted() {
    localStorage.removeItem("clickedUserId");
    this.$nuxt.$emit("add-leave");
    // this.getPendingLeaveVacationsAdmin();
    if (this.requestListData.lenghth <= 0) {
      this.noRecord = true;
    } else {
      this.noRecord = false;
    }
  },
  methods: {
    getPendingLeaveVacationsAdmin,
    getApproveLeaveVacationsAdmin,
    getRejectLeaveVacationsAdmin,
    openPopupNotification,
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
      if (tab.value == "Pending Requests") {
        this.getPendingLeaveVacationsAdmin();
      }
    },
    async rejectItem(event) {
      this.addIds.push(event + "");
      console.log(this.addIds, "item");
      await this.getRejectLeaveVacationsAdmin().then(() => {
        this.$nuxt.$emit("pendingList");
      });
      this.getPendingLeaveVacationsAdmin();
    },
    async approveItem(event) {
      this.addIds.push(event + "");
      console.log(this.addIds, "item");
      await this.getApproveLeaveVacationsAdmin().then(() => {
        this.$nuxt.$emit("pendingList");
      });
      this.getPendingLeaveVacationsAdmin();
    },
    async getIdValue(event) {
      this.checkedAll = false;
      if (this.addIds.includes(event + "")) {
        for (var i = 0; i < this.addIds.length; i++) {
          if (this.addIds[i] === event + "") {
            this.addIds.splice(i, 1);
            console.log(this.addIds, "item");
          }
        }
       
      } else {
        this.checkedAll = false;
        this.addIds.push(event + "");
        console.log(this.addIds, "item");
      }
      if(this.addIds != ''){
        this.disabled = false
      }else{
        this.disabled = true
      }
    },
    selectAllItems() {
      if (this.addIds.length) {
        this.addIds = [];
        this.checked = false;
        console.log(this.addIds, "item");
      } else {
        this.requestListData.map((item, index) => {
          this.addIds.push(item.id + "");
          console.log(this.addIds, "item");
          this.checkedAll = true;
          this.checked = true;
        });
      }
      if(this.addIds != ''){
        this.disabled = false
      }else{
        this.disabled = true
      }
    },

    async pendingApproveRequest(event) {
      if (event == "approve") {
        await this.getApproveLeaveVacationsAdmin();
        await this.getPendingLeaveVacationsAdmin();
      } else if (event == "pending") {
        this.getPendingLeaveVacationsAdmin();
      }
    },
  },
};
</script>

<style lang="scss">
.author-display {
  border-radius: 0.5rem;
  // background-color: #cdf784;
  color: black;
  padding: 0.5rem;
  margin-bottom: 10px;
  opacity: 10 !important;
  z-index: 10000;
  label {
    font-weight: bold;
    display: block;
  }
}
.fc-header-toolbar {
  padding: 0 20px !important;
}
.fc-scrollgrid {
  border-left: none !important;
}
.fc-scrollgrid-section-liquid {
  background-color: #f8f8f9;
}
.fc-theme-standard {
  th {
    background-color: #fff !important;
    // padding: 5px 0;
    border-right: 0px;
    border-left: 0px;
    .fc-scrollgrid-sync-inner {
      padding: 0.5rem;
    }
  }
}
.fc-theme-standard td {
  border: 1px solid #eee !important;
}
.fc-day-today {
  background-color: #fff !important;
}
.fc-daygrid-event-harness {
  a {
    border: none !important;
  }
}
.fc-button-primary {
  color: #ffffff;
  background-color: #000 !important;
  border-color: #ffffff !important;
  border-radius: 6px;
  padding-right: 10px;
}
.fc .fc-button-primary:not(:disabled).fc-button-active:focus,
.fc .fc-button-primary:not(:disabled):active:focus {
  box-shadow: none !important;
}
.fc .fc-button-primary:focus {
  box-shadow: none !important;
}
.fc-button-group {
  .fc-button {
    border-radius: 10px !important;
  }
  .fc-button:not(:last-child) {
    border-bottom-right-radius: 10px !important;
    border-top-right-radius: 10px !important;
  }
  .fc-button:not(:first-child) {
    border-bottom-left-radius: 10px !important;
    border-top-left-radius: 10px !important;
    margin-left: 5px !important;
  }
}
.fc-icon-chevrons-left {
  margin-top: -10px;
}
.fc-icon-chevrons-right {
  margin-top: -10px;
}
.fc-icon-chevron-left {
  margin-top: -10px;
}
.fc-icon-chevron-right {
  margin-top: -10px;
}
.fc-icon-chevrons-left::before {
  font-family: "fcicons" !important;
}

.fc-icon-chevrons-right::before {
  font-family: "fcicons" !important;
}
.fc-icon-chevron-left::before {
  font-family: "fcicons" !important;
}

.fc-icon-chevron-right::before {
  font-family: "fcicons" !important;
}
.event_wrapper {
  border-radius: 6px;
  padding: 4px 8px;
  border: none;
  margin-right: 10px;
  display: flex;
  height: 3rem;
  // justify-content: center;
  align-items: center;
  // background-color: #f2f2f5;

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 50%;
  }
  &__shape-round {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 1px;
  }
  &__bgevent {
    background-color: #d5e8d4;
  }
  &__bgonleave {
    background-color: #f7e9ce;
  }

  &__bghoilday {
    background-color: #1f42a2;
    color: #fff;
  }
  &__bgvacation {
    background-color: #f2f2f2;
  }
  &__bgabsent {
    background-color: #f5d0d3;
    color: #e6000e;
  }
  &__bgpending {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgdefault {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bggray {
    background-color: #f2f2f5;
    border-radius: 0.5rem;
    svg {
      fill: #000 !important;
    }
    span {
      color: #000;
      font-weight: 600;
      font-size: 14px;
    }
    span:first-letter {
      text-transform: uppercase;
    }
  }
  &__bgwhite {
    background-color: #fff;
    border-radius: 0.5rem;
    color: #eee;
    span {
      color: #e2e2e3;
      font-weight: 600;
      font-size: 14px;
    }
    // span:first-letter{
    //   text-transform: uppercase
    // }
  }
}
</style>
