<template>
  <div>
    <div class="custom-header px-1 py-05" style="z-index: 9;">
      <div class="ltr-wrapper">
        <div class="ltr-wrapper-items">
          <div class="d-flex pr-05">
            <div class="d-flex align-center">
              <bib-button
                :icon="$button.approved.icon"
                :variant="$button.approved.variant"
                :scale="1"
                label="Add Leave"
                class="mr-05"
                @click.native.stop="actionBY('leave', 'employeeDropdownKey')"
              ></bib-button>
            </div>
            <!-- <dropdown-menu-calendar
              :items="dropMenu"
              :label="ViewTitle"
              :buttonIconShow="true"
              icon="close"
              @on-click="monthView($event)"
              class="mr-05"
              className="button-wrapper__bgblack"
            ></dropdown-menu-calendar> -->
            <dropdown-menu-calendar
              :items="dropMenuMonth"
              :label="monthLabel"
              @on-click="changeMonthView($event)"
              class="mr-05"
            ></dropdown-menu-calendar>
            <dropdown-menu-calendar
              :items="dropMenuYear"
              :label="selectedYear.toString()"
              @on-click="changeYearView($event)"
              class="mr-05"
              style="z-index: 99 !important;"
            ></dropdown-menu-calendar>
          </div>
        </div>
      </div>
      <div class="rtl-wrapper d-flex align-center" style="justify-content: end">
        <div class="serach-item">
          <template>
            <search-input
              :on-change-fn="onSearchChange"
              :debounce-ms="300"
            ></search-input>
          </template>
        </div>
        <bib-button
          :variant="themeButtonVariant"
          :scale="1"
          :label="weekendsButtonView"
          @click="weekData()"
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
    <div :class="themeClassWrapper">
      <FullCalendar
        :options="calendarOptions"
        ref="fullCalendar"
        id="fullCalendar"
        :key="reloadData"
      >
      
        <template v-slot:eventContent="arg">
          <div
            class="author-display"
            :class="eventClass(arg.event.extendedProps.type)"
          >
            <div>
              <bib-avatar
                :src="arg.event.extendedProps.employee.photo"
                size="1.5rem"
              ></bib-avatar>
            </div>
            <div class="pl-05 author-display__employee_info">
              <label
                :title="getEmployeeFullName(arg.event.extendedProps.employee)"
                >{{
                  getEmployeeFullName(arg.event.extendedProps.employee)
                    | truncate(16, "...")
                }}</label
              >
              <span>{{
                arg.event.extendedProps.type == "leave"
                  ? "On Leave"
                  : arg.event.extendedProps.type
              }}</span>
              
            </div>
          </div>
        </template>
      </FullCalendar>
    </div>
    <leave-sidebar></leave-sidebar>
  </div>
</template>

<script>
import FullCalendar from "../../../modules/@fullcalendar/vue";
import dayGridPlugin from "../../../modules/@fullcalendar/daygrid";
import { DropdownMenu } from "../../../utils/constant/DropdownMenu";

import {
  MONTHS_LABEL_VALUE,
} from "../../../utils/constant/Calander";
import {
  addHandleInput,
  getCurrentYear,
  generateYearList,
} from "../../../utils/functions/functions_lib";
import {
  getLeaveStatusIcon,
  getStatusLabel,
  getTextVariant,
  getLeaveTypeIconVariant,
  getLeaveTypeClassName,
} from "@/utils/functions/status-helpers";
import {
  addLeaveVacations,
} from "../../../utils/functions/functions_lib_api";
import { TIMESHEET_STATUSES } from "../../../utils/constant/Constant";

import fecha from "fecha";
import { mapGetters } from "vuex";
import { getEmployeeFullName } from "../../../utils/functions/common_functions";
import { DateTime } from 'luxon';

const START_YEAR = 2021

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      show: false,
      reloadData: 1,
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
        dayMaxEvents: 3,
        weekends: true,
        contentHeight: "100vh",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,

        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove,
      },
      currentDate: fecha.format(new Date(), "DD"),
      currentMonth: fecha.format(new Date(), "MM"),
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
      dropMenuMonth: MONTHS_LABEL_VALUE,
      dropMenuYear: [],
      selectedMonth: "",
      selectedYear: new Date().getFullYear(),
      ViewTitle: "Month",
      searchString: null,
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getLeaveVacation: "leavevacation/getLeaveVacation",
      getformToDate: "leavevacation/getformToDate",
      getActiveUser: "employee/GET_ACTIVE_USER",
    }),
    monthLabel() {
      const month = this.dropMenuMonth.find( m => m.value == this.selectedMonth)
      return month?.label
    }
  },
  async created() {
    this.id = this.getActiveUser.id;
    this.$store.commit("employee/SET_SELECTED_EMPLOYEE_ID", {
      employeeId: this.id,
    });
  },
  mounted() {
    this.selectedMonth = this.currentMonth;
    this.dropMenuYear = this.generateYearList()
    this.getCalendarCurrentRange();
    this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    this.getApprovedTimesheets()
  },
  methods: {
    addHandleInput,
    addLeaveVacations,
    getCurrentYear,
    getEmployeeFullName,
    getLeaveStatusIcon,
    getStatusLabel,
    getTextVariant,
    getLeaveTypeIconVariant,
    getLeaveTypeClassName,
    generateYearList,

    onSearchChange(value) {
      this.searchString = value;
      if (this.searchString == "") {
        this.getApprovedTimesheets();
      } else {
        this.searchString = value;
      }
    },
    scrolltoId() {
      var access = document.getElementById("currentDay");
      access.scrollIntoView();
    },

    setCalendarEvents(events) {
      this.calendarOptions.events = events
    },

    async getApprovedTimesheets() {
      const requests = await this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.searchString,
        status: TIMESHEET_STATUSES.APPROVED
      });
      this.setCalendarEvents(requests)
    },
    actionBY($event, key) {
      this.$nuxt.$emit("open-sidebar-admin", $event, key);
      this.$nuxt.$emit("close-sidebar");
      this.$nuxt.$emit("add-leave");
    },

    getCalendarCurrentRange() {
      const fullCalendarApi = this.$refs.fullCalendar.getApi();
      const { start, end } = fullCalendarApi.currentData.dateProfile.activeRange;
      this.fromDate = start;
      this.toDate = end;
    },

    changeMonthView(e) {
      let year;
      this.selectedMonth = e.value;
      if (this.selectedYear === "") {
        year = this.currentYear;
      } else {
        year = this.selectedYear;
      }

      const month = e.value;
      const date = DateTime.now().set({ year, month }).toISO()
    
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          date
        );

      this.getCalendarCurrentRange();

      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });

      this.getApprovedTimesheets()
    },
    changeYearView(e) {
      let month
      this.selectedYear = e.label;
      if (this.selectedMonth === "") {
        month = this.currentMonth;
      } else {
        month = this.selectedMonth;
      }

      const year = e.value
      const date = DateTime.now().set({ year, month }).toISO()
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          date
        );

      this.getCalendarCurrentRange();

      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.getApprovedTimesheets();
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

        this.getApprovedTimesheets();
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
        
        this.getApprovedTimesheets();
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
      event.stopPropagation();
      const { id } = clickInfo.event;
      const item = this.calendarOptions.events.find((event) => event.id == id);
      this.$nuxt.$emit("open-sidebar", item.request);
      this.$nuxt.$emit('close-sidebar-main')

    },

    eventClass(type) {
      return {
        event_wrapper__bgvacations: type === "vacation",
        event_wrapper__bgonleave: type === "leave",
        event_wrapper__bgother: type === "other",
        event_wrapper__bgabsent: type === "Absent" || type === "medical",
      };
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
      this.getApprovedTimesheets();
    },
  },
};
</script>

<style lang="scss">
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
      background-color: $black;
      color: $white;
      padding: 0 10px;
      border-radius: 6px;
      // border-right: 10px solid transparent;
      option {
        background-color: $white;
        color: $black;
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
  cursor: pointer;
  height: 2rem !important;
  border-radius: 3px;
  color: black;
  padding: 0.2rem;
  opacity: 10 !important;
  z-index: 10000;
  display: flex;
  width: 100%;

  label {
    font-weight: 600;
    display: block;
    font-size: 0.6rem;
  }
  span {
    font-size: 0.55rem;
    line-height: 5px;
    text-transform: capitalize;
  }
  .fc-daygrid-event {
    border-radius: 13px !important;
    position: relative;
    white-space: unset !important;
    word-wrap: break-word !important;
    background-color: $black;
  }

  &__employee_info {
    line-height: 0.9;
  }
}
.fc {
  width: 100%;
  height: 100%;
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
    .fc-scrollgrid-sync-inner {
      padding: 0.5rem !important;
      font-weight: 400;
      font-size: 14px !important;
      color: $dark;
      border-right: 1px solid $secondary-sub3;
      border-left: 1px solid $secondary-sub3;
      border-top: 0px !important;
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
  border: 1px solid $secondary-sub3 !important;
}
.fc-theme-standard th {
  border-top: 0px solid $black !important;
  // z-index: 9999;
  border-bottom: 0px !important;
}

.fc-day-today {
  background-color: $white !important;
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
    background-color:  $primary !important;
    color: $white;
  }
  &__bgvacations {
    background-color: #d5e8d4;
    color: $success;
    label {
      color: $success;
    }
    span {
      color: $success;
      text-transform: capitalize;
    }
  }
  &__bgabsent {
    background-color: #f5d0d3;
    color: #e6000e;
    text-transform: capitalize;
  }
 
  &__bgother {
    background-color: $light;
    border: 1px solid $gray2;
    svg {
      fill: $secondary-sub1 !important;
    }
    span {
      color: $secondary-sub1;
      font-weight: 600;
    }
  }
  &__bgpending {
    background-color: $white;
    border: 1px solid #e1e0e0;
    svg {
      fill: $secondary-sub1 !important;
    }
    span {
      color: $secondary-sub1;
      font-weight: 600;
      font-size: 14px;
    }
  }
}
.fc-h-event {
  background-color: $white !important;
  border: none !important;
}
.fc-event:focus::after {
  background-color: none !important;
}
.fc-event-main {
  background-color: $secondary-sub3 !important;
}
.fc-event:focus {
  box-shadow: none !important;
}
.fc-daygrid-dot-event:hover {
  background-color: transparent !important;
}
</style>
