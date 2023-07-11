<template>
  <div class="py-1">
    <div id="people-action-wrapper">
      <div
        class="d-flex justify-between align-center nav_wrapper py-075 pl-025 pr-075 bottom_border_wrapper"
      >
        <section-header-left
          title="Leaves and Vacation"
          headerRight="headerRight"
        ></section-header-left>
      </div>
      <div class="tab-wrapper">
        <div class="row mx-0 bottom_border_wrapper">
          <div class="col-12 px-1">
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
              <div
                class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Add leave"
                    @on-click="actionBY('leave')"
                  ></button-green>
                  <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Add vacation"
                    @on-click="actionBY('vacation')"
                  ></button-green>
                </div>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <client-only>
                    <leaves-vacations></leaves-vacations>
                  </client-only>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="pending-request-wrapper">
          <div class="" id="pending_request_wrapper">
            <div v-if="activeTab == leaveVacation[1].value">
              <div
                class="d-flex justify-between align-center nav_wrapper px-075 bottom_border_wrapper"
              >
                <div class="d-flex align-center">
                  <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Add leave"
                    @on-click="actionBY()"
                  ></button-green>
                  <button-green
                    icon="add"
                    variant="success"
                    :scale="1"
                    title="Add vacation"
                    @on-click="actionBY()"
                  ></button-green>
                </div>
              </div>
              <div class="scroll_wrapper">
                <div>
                  <h1>Heloo World</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template>
      <action-sidebar
        @close-sidebar="closeSidebar"
        @close="closeSidebar"
        :className="slideClass"
        heading="Schedule event"
        v-show="addLeaveSidebar"
      >
        <template v-slot:sidebar-body>
          <add-leave
          :employeeName="employeeName"
          :leaveTypeOptions="leaveTypeOptions"
          @input="handleInput"
          @change="handleInput"
          style="z-index: 100000;"
          ></add-leave>
        </template>
      </action-sidebar>
    </template>
    <template>
      <action-sidebar
        @close-sidebar="closeSidebar"
        @close="closeSidebar"
        :className="slideClass"
        heading="Schedule vacation"
        v-show="addVacationSidebar"
      >
        <template v-slot:sidebar-body>
          <add-leave
          :employeeName="employeeName"
          :leaveTypeOptions="leaveTypeOptions"
          ></add-leave>
        </template>
      </action-sidebar>
    </template>
    </div>
  </div>
</template>
<script>
import {
  handleInput,
  handleInputObject,
} from "../../utils/functions/functions_lib.js";
import { mapGetters } from 'vuex'
import {getLeaveVacations} from '../../utils/functions/api_call/leavesvacations/requestuser'
import { LEAVEVACATION_TAB, SELECT_OPTIONS } from "../../utils/constant/Constant";
export default {
  data() {
    return {
      leaveVacation: LEAVEVACATION_TAB,
      activeTab: "Dashboard",
      addLeaveSidebar: false,
      addVacationSidebar: false,
      slideClass: "slide-in",
      leaveTypeOptions:SELECT_OPTIONS.leaveType,
      updateForm:{},
      leaveVacationAdminData:[],
      pendingLeaveVacationAdminData:[],
      fromDate:"2023-06-06T01:04:18.528Z",
      toDate:"2023-07-08T10:04:18.528Z",
      getRequest:{},
      employeeName:'',
    };
  },
  computed:{
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getUser: "employee/GET_USER",

    })
  },
  async created() {
    await this.$store.dispatch("employee/setActiveUser");
    var users = this.getUser;
    this.employeeName = users.firstName + " " + users.lastName;
  },
mounted(){
  this.getRequest = this.fromDate + this.toDate;
  console.log(this.getRequest, "2023-07-08T10:04:18.528Z")
  this.getLeaveVacations();
  console.log(this.leaveTypeOptions, "leaveTypeOptions")
},
  methods: {
    async handleChange_Tabs(tab) {
      this.activeTab = tab.value;
    },
    getLeaveVacations,
    handleInput,
    actionBY(event) {
      if(event=='leave'){
        if (this.addLeaveSidebar == true) {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.addLeaveSidebar = false;
        }, 700);
      } else {
        this.addVacationSidebar = false;
        this.addLeaveSidebar = true;
        this.slideClass = "slide-in";
      }
      }else if(event=='vacation'){
        if (this.addVacationSidebar == true) {
        this.slideClass = "slide-out";
        setTimeout(() => {
          this.addVacationSidebar = false;
        }, 700);
      } else {
        this.addLeaveSidebar = false;
        this.addVacationSidebar = true;
        this.slideClass = "slide-in";
      }
      }
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.addLeaveSidebar = false;
        this.addVacationSidebar = false;
      }, 700);
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
  padding: 0 10px !important;
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
