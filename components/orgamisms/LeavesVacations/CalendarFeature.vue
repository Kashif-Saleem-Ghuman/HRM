<template>
  <div>
    <div class="custom-header px-1 py-05">
      <div class="ltr-wrapper">
        <div class="ltr-wrapper-items">
          <div class="d-flex pr-05">
            <div class="d-flex align-center">
              <bib-button
                icon="add"
                variant="success"
                :scale="1"
                label="Add Leave"
                class="mr-05"
                @click="actionBY('leaveAdmin')"
              ></bib-button>
              <!-- <bib-button
                icon="add"
                variant="success--outline"
                :scale="1"
                label="Add vacation"
                class="mr-05"
                @click="actionBY('vacationAdmin')"
              ></bib-button> -->
            </div>
            <dropdown-menu-calendar
              :items="dropMenu"
              :label="ViewTitle"
              :buttonIconShow="true"
              icon="close"
              @on-click="monthView($event)"
              class="mr-05"
              className="button-wrapper__bgblack"
            ></dropdown-menu-calendar>
            <dropdown-menu-calendar
              :items="dropMenuMonth"
              :label="selectedMonth"
              icon="arrowhead-down"
              @on-click="changeMonthView($event)"
              class="mr-05"
              className="button-wrapper__bgblack"
            ></dropdown-menu-calendar>
            <dropdown-menu-calendar
              :items="dropMenuYear"
              :label="selectedYear"
              icon="arrowhead-down"
              @on-click="changeYearView($event)"
              class="mr-05"
              className="button-wrapper__bgblack"
            ></dropdown-menu-calendar>
          </div>
        </div>
      </div>
      <div class="rtl-wrapper d-flex align-center">
        <div class="serach-item pr-05">
          <!-- <label>Search:</label> -->
          <template>
            <search-input :on-change-fn="onSearchChange" :debounce-ms="300"></search-input>

            <!-- <input type="text" name="name" @change="searchLeavesType($event)" @focusout="searchLeavesType($event)" /> -->
          </template>
        </div>
        <bib-button
          variant="light"
          :scale="1"
          :label="weekendsButtonView"
          @click="weekData()"
          style="height: 2rem"
        ></bib-button>
      </div>
    </div>
    <div
      class="d-flex px-1 py-05 align-center bottom_top_wrapper"
      v-show="nextPrev"
    >
      <bib-button
        variant="secondary--outline"
        :scale="1"
        label="Prev"
        class="mr-05"
        @click="prevWeek()"
      ></bib-button>
      <bib-button
        variant="secondary--outline"
        :scale="1"
        label="Next"
        class="mr-05"
        @click="nextWeek()"
      ></bib-button>
    </div>
    <div class="">
      <FullCalendar
        :options="calendarOptions"
        ref="fullCalendar"
        id="fullCalendar"
        :key="reloadData"
      >
        <template v-slot:eventContent="arg">
          <a
            class="author-display d-flex"
            :class="[
              arg.event.extendedProps.type === 'vacation'
                ? 'event_wrapper__bgvacations'
                : '',
              arg.event.extendedProps.type === 'leave'
                ? 'event_wrapper__bgonleave'
                : '',
              arg.event.extendedProps.type == 'Absent'
                ? 'event_wrapper__bgabsent'
                : '',
              arg.event.extendedProps.type == 'medical'
                ? 'event_wrapper__bgabsent'
                : '',
            ]"
            style="cursor: pointer; margin-bottom: 3px"
          >
            <div>
              <bib-avatar
                :src="arg.event.extendedProps.employee.photo"
                size="2rem"
              ></bib-avatar>
            </div>
            <div class="pl-05">
              <label>{{
                arg.event.extendedProps.employee.firstName +
                " " +
                arg.event.extendedProps.employee.lastName
              }}</label>
              <span>{{ arg.event.extendedProps.type == 'leave' ? 'Personal Leave' : arg.event.extendedProps.type + ' ' + "Leave" }}</span>
            </div>
          </a>
        </template>
      </FullCalendar>
    </div>
    <action-sidebar
      @close="closeSidebar"
      :className="slideClass"
      heading="Leave details"
      v-show="openSidebar"
    >
      <template v-slot:sidebar-body>
        <add-leave
          :request="form"
          :leaveTypeOptions="leaveTypeOptions"
          @input="addHandleInput"
          @change="addHandleInput"
          style="z-index: 100000"
          :allowanceDays="allowanceData"
          :usedDays="useDaysDataValue"
          :employeesOptions="employeesOptions"
          :employeeNameSelectShow="employeeNameSelectShow"
          :key="addLeaveKey"
          :errorMsgSelect="errorMsgSelect"
          :errorMsgStartDate="errorMsgStartDate"
          :errorMsgEndDate="errorMsgEndDate"
          inActive="disabled"
        ></add-leave>
        <div class="row">
          <div class="col-12">
            <div>
              <info-card-success
                :label="
                  leaveStatus == 'approved'
                    ? 'Approved'
                    : '' || leaveStatus == 'pending'
                    ? 'Pending'
                    : '' || leaveStatus == 'rejected'
                    ? 'Rejected'
                    : ''
                "
                :message="
                  leaveStatus == 'approved'
                    ? 'Approved'
                    : '' || leaveStatus == 'pending'
                    ? 'Pending'
                    : '' || leaveStatus == 'rejected'
                    ? 'Rejected'
                    : ''
                "
                :icon="
                  leaveStatus == 'approved'
                    ? 'tick'
                    : '' || leaveStatus == 'pending'
                    ? 'pencil'
                    : '' || leaveStatus == 'rejected'
                    ? 'file'
                    : ''
                "
                :variant="
                  leaveStatus == 'approved'
                    ? 'success'
                    : '' || leaveStatus == 'pending'
                    ? 'gray3'
                    : '' || leaveStatus == 'rejected'
                    ? 'white'
                    : ''
                "
                :className="[
                  leaveStatus == 'approved'
                    ? 'text-success bg-success-sub6 bg-hover-success-sub3'
                    : '',
                  leaveStatus == 'pending'
                    ? 'text-warning bg-warning bg-hover-warning-sub3'
                    : '',
                  leaveStatus == 'rejected'
                    ? 'text-danger bg-danger bg-hover-danger-sub3'
                    : '',
                ]"
                :classNameWrapper="[
                  leaveStatus == 'approved' ? 'text-success' : '',
                  leaveStatus == 'pending' ? 'text-warning' : '',
                  leaveStatus == 'rejected' ? 'text-danger' : '',
                ]"
              ></info-card-success>
            </div>
          </div>
        </div>
      </template>
    </action-sidebar>
  </div>
</template>

<script>
import FullCalendar from "../../../modules/@fullcalendar/vue";
import dayGridPlugin from "../../../modules/@fullcalendar/daygrid";
import { DropdownMenu } from "../../../utils/constant/DropdownMenu";

import {
  MONTH_LIST,
  YEAR_LIST,
} from "../../../utils/constant/Calander";
import {
  addHandleInput,
  getCurrentDateMonth,
  getCurrentYear,
} from "../../../utils/functions/functions_lib";

import {
  addLeaveVacations,
  getAllowanceDays,
  getUserLeavesDetail,
} from "../../../utils/functions/functions_lib_api";
import { SELECT_OPTIONS } from "../../../utils/constant/Constant";

import fecha, { format } from "fecha";
import { mapGetters } from "vuex";
export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      show: false,
      reloadData: 1,
      openSidebar: false,
      leaveTypeOptions: SELECT_OPTIONS.leaveType,
      errorMsgSelect: false,
      errorMsgStartDate: false,
      errorMsgEndDate: false,
      employeeNameSelect: "",
      employeeName: "",
      employeesOptions: [],
      allowanceData: "",
      startDate: "",
      endDate: "",
      form: {},
      vacationType: "vacation",
      addLeaveKey: 0,
      ViewTitle: "Month",
      getSearchKey: "",
      addForm: {
        type: "",
        start: "",
        end: "",
      },
      calendarOptions: {
        plugins: [dayGridPlugin],
        customButtons: {
          myLink: {
            text: "+ Add",
            click: () => this.fullcalendar.today(), // assuming you use Vue Router
          },
          weekData: {
            text: "Weekends",
            click: () => this.weekData(), // assuming you use Vue Router
          },
          nextButton: {
            // this overrides the next button
            text: "hello",
            type: "HTML",
            click: () => {
              let calendarApi = this.$refs.fullCalendar.getApi();
              calendarApi.next();
            },
          },
        },
        headerToolbar: false,
        initialView: "dayGridMonth",
        windowResizeDelay: 200,
        events: [],
        editable: false,
        selectable: false,
        selectMirror: SVGComponentTransferFunctionElement,
        selectHelper: false,
        dayMaxEvents: 1,
        weekends: true,
        contentHeight: "auto",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,

        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove,
      },
      currentDate: fecha.format(new Date(), "DD"),
      currentMonth: fecha.format(new Date(), "MMM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      todayDate:
        "Today," + " " + fecha.format(new Date(), "dddd, MMMM MM, YYYY"),
      fromDate: "",
      toDate: "",
      slideClass: "slide-in",
      form: "",
      leaveStatus: "",
      flag: false,
      nextPrev: false,
      allowanceLeavesDetailedData: [],
      useDaysData: "",
      employeeNameSelectShow: false,
      weekendsButtonView: "Show Weekdays",
      dropMenu: DropdownMenu.calendarViewType,
      dropMenuMonth: MONTH_LIST,
      dropMenuYear: YEAR_LIST,
      selectedMonth: "",
      selectedYear: "2023",
      yearTitle: "2023",
      ViewTitle: "Month",
      searchString: null
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getLeaveVacation: "leavevacation/getLeaveVacation",
      getformToDate: "leavevacation/getformToDate",
      getReportList: "employee/GET_REPORTS_LIST",
    }),
    useDaysDataValue() {
      return this.useDaysData;
    },
    employeeNameSlectedValue() {
      return this.employeeNameSelect;
    },
  },

  mounted() {
    this.selectedMonth = this.currentMonth;
    
    this.getCurrentDateMonth();
    this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    this.$store
      .dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        status: 'approved'
      })
      .then((result) => {
        this.calendarOptions.events = result;
      });
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = [{label: "", value: ""}, ...reportTo];
      this.employeeNameSelectShow = true;
    });
  },
  methods: {
    addHandleInput,
    getAllowanceDays,
    addLeaveVacations,
    getCurrentDateMonth,
    getCurrentYear,
    getUserLeavesDetail,
    onSearchChange(value) {
      this.searchString = value
      if(this.searchString == ''){
        this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.searchString,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
      }else{
        this.searchString = value
      }
    },
    scrolltoId() {
      var access = document.getElementById("currentDay");
      access.scrollIntoView();
    },
    fullData() {
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    },
    actionBY($event) {
      this.$nuxt.$emit("open-sidebar-admin", $event);
      this.$nuxt.$emit("add-leave");
    },
    changeMonthView(e) {
      var year;
      this.selectedMonth = e.label;
      if (this.selectedYear === "") {
        year = this.currentYear;
      } else {
        year = this.selectedYear;
      }
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          year + e.key + this.currentDate
        );
      this.getCurrentDateMonth();
      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.searchString,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    },
    changeYearView(e) {
      var month;
      this.selectedYear = e.label;
      if (this.selectedMonth === "") {
        month = this.currentMonth;
      } else {
        month = this.selectedMonth;
      }
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          e.key + month + this.currentDate
        );
      this.getCurrentDateMonth();
      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.searchString,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    },
    monthView(e) {
      if (e.key == "month") {
        this.ViewTitle = "Month";
        this.nextPrev = false;
        this.calendarOptions.initialView = "dayGridMonth";
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.changeView("dayGridMonth");
      }
      if (e.key == "week") {
        this.nextPrev = true;
        this.ViewTitle = "Week";
        this.calendarOptions.initialView = "dayGridWeek";
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.changeView("dayGridWeek");
      }
    },
    async prevWeek() {
      if (this.flag == false) {
        this.flag == true;
        this.getCurrentYear();
        await this.$store.dispatch("leavevacation/setActiveFromToDate", {
          from: this.fromDate,
          to: this.toDate,
        });
        this.$store
          .dispatch("leavevacation/setLeaveVacations", {
            from: this.getformToDate.from,
            to: this.getformToDate.to,
            search: this.searchString,
          })
          .then((result) => {
            this.calendarOptions.events = result;
          });
      }
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.prev();
    },
    async nextWeek() {
      if (this.flag == false) {
        this.flag = true;
        this.getCurrentYear();
        await this.$store.dispatch("leavevacation/setActiveFromToDate", {
          from: this.fromDate,
          to: this.toDate,
        });
        this.$store
          .dispatch("leavevacation/setLeaveVacations", {
            from: this.getformToDate.from,
            to: this.getformToDate.to,
            search: this.searchString,
          })
          .then((result) => {
            this.calendarOptions.events = result;
          });
      }
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.next();
    },
    clickOutside() {
      this.show = false;
    },
    clickOn() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.next();
    },
    async handleEventClick(clickInfo) {
      this.slideClass = "slide-in";
      this.employeeNameSelectShow = true;
      this.addLeaveKey += 1;
      this.calendarOptions.events.filter((item, index) => {
        if (item.id == clickInfo.event._def.publicId) {
          this.getUserLeavesDetail(item.employee.id).then((result) => {
            this.allowanceLeavesDetailedData = result;
          });
          console.log(item.employee.id, "allowanceLeavesDetailedData");
          this.leaveStatus = item.status;
          this.form = item;
          this.employeeNameSelect = item.employee.id;

          this.employeeName =
            item.employee.firstName + " " + item.employee.lastName;
          setTimeout(() => {
            if (item.type == "vacation") {
              this.allowanceData = this.allowanceLeavesDetailedData.vacationsAllowance;
              this.useDaysData = this.allowanceLeavesDetailedData.vacationsUsed;
            }
            if (item.type == "leave") {
              this.allowanceData = this.allowanceLeavesDetailedData.otherLeavesAllowance;
              this.useDaysData =
                this.allowanceLeavesDetailedData.vacationsUsed;
            }
            if (item.type == "medical") {
              this.allowanceData = this.allowanceLeavesDetailedData.medicalLeavesAllowance;
              this.useDaysData =
                this.allowanceLeavesDetailedData.medicalLeavesUsed;
            }
          }, 1000);
          // console.log(this.allowanceLeavesDetailedData, "allowanceLeavesDetailedDataallowanceLeavesDetailedDataallowanceLeavesDetailedData")
          this.startDate = fecha.format(
            new Date(this.form.start),
            "YYYY-MM-DD"
          );
          this.endDate = fecha.format(new Date(this.form.end), "YYYY-MM-DD");
          // console.log(this.form, "clickInfo.event._def.publicId");
          return item;
        }
      });
      this.openSidebar = true;
    },
    closeSidebar() {
      this.slideClass = "slide-out";
      setTimeout(() => {
        this.openSidebar = false;
      }, 700);
    },
    weekData() {
      if (this.weekendsButtonView == "Show Weekdays") {
        this.weekendsButtonView = "Show Weekends";
      } else {
        this.weekendsButtonView = "Show Weekdays";
      }

      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
  },
  watch: {
    searchString(value) {
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.searchString,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    }
  },
};
</script>

<style lang="scss">
@media (min-width: 500px) {
  body {
    font-size: 10px;
  }
}
@media (min-width: 768px) {
  body {
    font-size: 11px;
  }
}
@media (min-width: 1200px) {
  body {
    font-size: 12px;
    span {
      font-size: 12px;
    }
  }
}

@media (min-width: 1400px) {
  body {
    font-size: 14px;
  }
}
.custom-header {
  display: flex;
  justify-content: space-between;
  z-index: 900;
  // background-color: #cdf784;
  position: relative;
  .ltr-wrapper {
    .ltr-wrapper-items {
      position: absolute;
      display: flex;
    }
    select {
      font-size: 14px;
      width: 100%;
      // border: 1px solid var(--bib-gray4);
      color: var(--bib-dark);
      background-color: #000;
      color: #fff;
      padding: 0 10px;
      border-radius: 6px;
      // border-right: 10px solid transparent;
      option {
        background-color: #fff;
        color: #000;
      }
    }
  }
}
.rtl-wrapper {
  .serach-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      margin: 0px !important;
      border-radius: 6px !important;
      padding: 0px 5px !important;
      height: 32px;
      border: 1px solid #e2e2e3;
      font-size: 14px;
    }
    label {
      padding-right: 5px;
      font-size: 13px;
    }
  }
}

.author-display {
  border-radius: 0.5rem;
  // background-color: #cdf784;
  color: black;
  padding: 0.5rem;
  // padding-bottom: 120px;
  opacity: 10 !important;
  z-index: 10000;
  display: flex;
  width: 100%;

  label {
    font-weight: 600;
    display: block;
    font-size: 12px;
  }
  span {
    font-size: 12px;
  }
  .fc-daygrid-event {
    border-radius: 13px !important;
    position: relative;
    white-space: unset !important;
    word-wrap: break-word !important;
    background-color: #000;
  }
}

.fc-daygrid-event {
  white-space: unset !important;
  word-wrap: break-word !important;
}
.fc-header-toolbar {
  padding: 0 10px !important;
}
.fc-scrollgrid {
  // border-left: none !important;
}
.fc-scrollgrid-section-liquid {
  background-color: #f8f8f9;
}
.fc-theme-standard {
  background-color: #f8f8f9;
  font-size: 14px;
  th {
    // padding: 5px 0;
    // border-right: 0px;
    // border-left: 0px;
    .fc-scrollgrid-sync-inner {
      padding: 0.5rem !important;
      font-weight: 400;
      font-size: 14px !important;
      color: #1d1d20;
      border-right: 1px solid #f2f2f5;
      border-left: 1px solid #f2f2f5;
      border-top: 0px !important;
      // border-bottom: 0px solid #000 !important;
    }
  }
}
.fc-scrollgrid-sync-inner {
  padding: 0 5px !important;
}
.fc-scrollgrid-sync-inner::-webkit-scrollbar {
  width: 6px;
}
.fc-scrollgrid-sync-inner::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(255, 255, 255, 0.3);
  border-radius: 5px;
}
.fc-scrollgrid-sync-inner::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgb(216, 216, 216);
}
.fc-theme-standard td {
  border: 1px solid #f2f2f5 !important;
}
.fc-theme-standard th {
  border-top: 0px solid #000 !important;
  z-index: 9999;
  border-bottom: 0px !important;
}

// .fc-theme-standard th {
//   border: 10px solid #f2f2f5 !important;
// }
.fc-day-today {
  background-color: #fff !important;
  font-weight: bold;
}

.fc-daygrid-event-harness {
  a {
    border: none !important;
  }
}

.fc-icon-x::before {
  font-family: "fcicons" !important;
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
.fc-daygrid-event-harness-abs {
  // right: 0 !important;
}
.event_wrapper {
  border-radius: 6px;
  border: none;
  display: flex;
  // background-color: #fff !important;
  align-items: center;

  &__bgevent {
    background-color: #d5e8d4;
  }
  &__bgonleave {
    background-color: #f7e9ce !important;
    color: #ffab00;
    label {
      color: #ffab00;
    }
    span {
      color: #ffab00;
      text-transform: capitalize;
    }
  }

  &__bghoilday {
    background-color: #1f42a2 !important;
    color: #fff;
  }
  &__bgvacations {
    background-color: #d5e8d4;
    color: #2ba026;
    label {
      color: #2ba026;
    }
    span {
      color: #2ba026;
      text-transform: capitalize;
    }
  }
  &__bgabsent {
    background-color: #f5d0d3;
    color: #e6000e;
    text-transform: capitalize;
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
}
.fc-h-event {
  background-color: #fff !important;
  border: none !important;
}
.fc-event:focus::after {
  background-color: none !important;
}
.fc-event-main {
  background-color: #f2f2f5 !important;
}
.fc-event:focus {
  box-shadow: none !important;
}
.fc-daygrid-dot-event:hover {
  background-color: transparent !important;
}
</style>
