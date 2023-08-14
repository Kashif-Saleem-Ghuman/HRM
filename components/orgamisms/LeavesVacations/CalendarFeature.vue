<template>
  <div>
    <div class="custom-header px-1 py-1">
      <div class="ltr-wrapper">
        <div class="ltr-wrapper-items">
          <div class="button-items pr-05">
            <div class="d-flex align-center">
              <button-green
                icon="add"
                variant="success"
                :scale="1"
                title="Add leave"
                style="height: 2.5rem;"
                @on-click="actionBY('leaveAdmin')"
              ></button-green>
              <button-green
                icon="add"
                variant="success"
                :scale="1"
                title="Add vacation"
                style="height: 2.5rem; border-radius: 6px"
                @on-click="actionBY('vacationAdmin')"
              ></button-green>
            </div>
            <!-- <label>View:</label> -->
            <div style="position: relative">
              <button-black
                icon="close"
                variant="light"
                :scale="1"
                :title="ViewTitle"
                style="height: 2.5rem;"
                @on-click="show = !show"
                v-click-outside="clickOutside"
              ></button-black>
              <div class="menu-items">
                <ul v-if="show">
                  <li class="d-flex align-center">
                    <span
                      class="ml-05"
                      @click="monthView('Month')"
                      style="cursor: pointer"
                      >Month</span
                    >
                  </li>
                  <li class="d-flex align-center">
                    <span
                      class="ml-05"
                      @click="weekView('Week')"
                      style="cursor: pointer"
                      >Week</span
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="button-items">
            <!-- <label>Month:</label> -->
            <select
              class="select_month"
              id="my-select"
              ref="myInput"
              @change="changeMonthView()"
              style="height: 2.5rem;"
            >
              <option
                v-for="i in monthList"
                :value="i.key"
                :selected="i.key === currentMonth ? true : false"
              >
                {{ i.label }}
              </option>
            </select>
          </div>
          <div class="button-items pl-05 pr-05">
            <!-- <label>Year:</label> -->
            <select
              id="select_year"
              ref="myInputYear"
              @change="changeYearView()"
            >
              <option
                v-for="i in yearList"
                :value="i.key"
                :selected="i.key === currentYear ? true : false"
              >
                {{ i.label }}
              </option>
            </select>
          </div>
          <!-- <div class="button-items pr-05">
            <button-black
              icon="close"
              variant="light"
              :scale="1"
              :title="todayDate"
              @on-click="show = !show"
              v-click-outside="clickOutside"
            ></button-black>
          </div> -->
        </div>
      </div>
      <div class="rtl-wrapper d-flex align-center">
        <div class="serach-item pr-05">
          <label>Search:</label>
          <template>
            <bib-input
              type="text"
              name="name"
              placeholder="Search by leave type"
              @change="searchLeavesType($event)"
              style="height: 2.5"
            ></bib-input>
          </template>
        </div>
        <!-- <div class="serach-item pr-05">
          <label>Show:</label>
          <button-gray
            variant="light"
            title="All"
            @on-click="fullData()"
          ></button-gray>
        </div> -->
        <button-gray
          variant="light"
          :scale="1"
          title="Weekends"
          @on-click="weekData()"
          style="height: 2.5"
        ></button-gray>
      </div>
    </div>
    <div class="d-flex px-1 pb-05 pt-05 align-center" v-show="nextPrev" style="border-top: solid 1px #eee;">
      <button-black
        variant="light"
        :scale="1"
        title="Prev"
        class="mr-075"
        @on-click="prevWeek()"
      ></button-black>
      <button-black
        variant="light"
        :scale="1"
        title="Next"
        @on-click="nextWeek()"
      ></button-black>
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
              arg.event.extendedProps.type === 'holiday'
                ? 'event_wrapper__bghoilday'
                : '',
              arg.event.extendedProps.type === 'vacation'
                ? 'event_wrapper__bgvacation'
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
          >
            <bib-avatar
              :src="arg.event.extendedProps.employee.photo"
              size="2rem"
            ></bib-avatar>
            <div class="list-item pl-05">
              <label>{{
                arg.event.extendedProps.employee.firstName +
                " " +
                arg.event.extendedProps.employee.lastName
              }}</label>
              <span>{{ arg.event.extendedProps.employee.jobTitle }}</span>
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
          :leaveTypeOptions="leaveTypeOptions"
          @input="addHandleInput"
          @change="addHandleInput"
          style="z-index: 100000"
          :allowanceDays="allowanceData"
          :usedDays="useDaysData"
          :employeeNameSelect="employeeNameSelect"
                :employeesOptions="employeesOptions"
          :key="addLeaveKey"
          :errorMsgSelect="errorMsgSelect"
          :errorMsgStartDate="errorMsgStartDate"
          :errorMsgEndDate="errorMsgEndDate"
          :leaveType="form.type"
          :startDate="startDate"
          :endDate="endDate"
          :note="form.note"
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
                    : '' || leaveStatus == 'reject'
                    ? 'reject'
                    : ''
                "
                :message="
                  leaveStatus == 'approved'
                    ? 'Approved'
                    : '' || leaveStatus == 'pending'
                    ? 'Pending'
                    : '' || leaveStatus == 'reject'
                    ? 'reject'
                    : ''
                "
                :icon="
                  leaveStatus == 'approved'
                    ? 'tick'
                    : '' || leaveStatus == 'pending'
                    ? 'pencil'
                    : '' || leaveStatus == 'reject'
                    ? 'file'
                    : ''
                "
                :variant="
                  leaveStatus == 'approved'
                    ? 'success'
                    : '' || leaveStatus == 'pending'
                    ? 'gray3'
                    : '' || leaveStatus == 'reject'
                    ? 'danger'
                    : ''
                "
                :className="[
                  leaveStatus == 'approved'
                    ? 'text-success bg-success-sub6 bg-hover-success-sub3'
                    : '',
                  leaveStatus == 'pending'
                    ? 'text-warning bg-warning bg-hover-warning-sub3'
                    : '',
                ]"
                :classNameWrapper="[
                  leaveStatus == 'approved' ? 'text-success' : '',
                  leaveStatus == 'pending' ? 'text-warning' : '',
                ]"
              ></info-card-success>
            </div>
          </div>
        </div>
      </template>
      <!-- <template v-slot:sidebar-footer>
        <div class="">
          <div style="text-align: right">
            <bib-button
              label="Cancle"
              variant="gray"
              size="lg"
              v-on:click="closeSidebar()"
            ></bib-button>
            <bib-button
              label="Save"
              variant="success"
              size="lg"
              v-on:click="addLeaveVacations()"
            ></bib-button>
          </div>
        </div>
      </template> -->
    </action-sidebar>
  </div>
</template>

<script>
import FullCalendar from "../../../modules/@fullcalendar/vue";
import dayGridPlugin from "../../../modules/@fullcalendar/daygrid";
// import interactionPlugin from "../../../modules/@fullcalendar/interaction";
// import timeGridPlugin from "../../../modules/@fullcalendar/timegrid";
import {
  SAMPLE_EVENTS,
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
  getUserLeavesDetail
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
      employeeNameSelect:'',
      employeesOptions : [],
      allowanceData: "",
      startDate: "",
      endDate: "",
      form: {},
      vacationType: "vacation",
      addLeaveKey: 0,
      monthList: MONTH_LIST,
      yearList: YEAR_LIST,
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
        // headerToolbar: {
        //   left: "myLink,dayGridMonth,dayGridWeek,prevYear,prev,next,nextYear",
        //   center: "title",
        //   right: "weekData,nextButton",
        // },
        views: {
          // we can specify particular view for particular layout here
        },
        initialView: "dayGridMonth",
        windowResizeDelay: 200,
        events: [],
        editable: false,
        selectable: false,
        selectMirror: SVGComponentTransferFunctionElement,
        selectHelper: false,
        dayMaxEvents: false,
        weekends: true,
        contentHeight:"auto",
        // eventColor: "green",
        // style related
        // eventColor: "#FFFFFF",
        // eventBackgroundColor: "#000000",
        // eventTextColor: "#333333",
        // eventBorderColor:"#000000",
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,

        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove,
      },
      currentDate: fecha.format(new Date(), "DD"),
      // currentMonth:'08',
      currentMonth: fecha.format(new Date(), "MM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      todayDate:
        "Today," + " " + fecha.format(new Date(), "dddd, MMMM MM, YYYY"),
      selectedMonth: "",
      selectedYear: "2023",
      fromDate: "",
      toDate: "",
      slideClass: "slide-in",
      form: "",
      leaveStatus: "",
      flag : false,
      nextPrev:false,
      allowanceLeavesDetailedData:[],
      useDaysData: "",
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getLeaveVacation: "leavevacation/getLeaveVacation",
      getformToDate: "leavevacation/getformToDate",
      getReportList:"employee/getReportList",

    }),
  },

  mounted() {
    this.selectedMonth = this.currentMonth;
    this.getCurrentDateMonth();
    this.$store.dispatch("leavevacation/setActiveFromToDate", {
      from: this.fromDate,
      to: this.toDate,
    });

    this.$store.dispatch("leavevacation/setLeaveVacations", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    });
    setTimeout(() => {
      this.calendarOptions.events = this.getLeaveVacation;
      this.reloadData += 1;
    }, 1000);
    setTimeout(() => {
      this.calendarOptions.events = this.getLeaveVacation;
      this.reloadData += 1;
    }, 3000);
    // console.log(this.calendarOptions.events, "this.calendarOptions.events");
    // this.getAllowanceDays().then((result) => {
    //   this.allowanceData = result;
    //   // this.temKey += 1;
    // });
    this.$store.dispatch("employee/setReportsToList");
    this.employeesOptions = this.getReportList;
    console.log(this.employeesOptions, "this.employeesOptions")
  },
  methods: {
    addHandleInput,
    getAllowanceDays,
    addLeaveVacations,
    getCurrentDateMonth,
    getCurrentYear,
    getUserLeavesDetail,
    change(event) {},
    searchLeavesType(event) {
      this.getSearchKey = event;
      //  console.log(this.getSearchKey, event,  "this.getSearchKey")
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
        search: this.getSearchKey,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
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
      this.$nuxt.$emit("open-sidebar", $event);
      this.$nuxt.$emit("add-leave");
    },
    // getCurrentDateMonth() {
    //   var cuDate = this.selectedYear + "/" + this.selectedMonth + "/01";
    //   let date = new Date(cuDate);
    //   let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    //   let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //   this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DD");
    //   this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DD");
    // },
    changeMonthView() {
      var year;
      this.selectedMonth = this.$refs.myInput.value;
      if (this.selectedYear === "") {
        year = this.currentYear;
      } else {
        year = this.selectedYear;
      }
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          year + this.$refs.myInput.value + this.currentDate
        );
      this.getCurrentDateMonth();
      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    },
    changeYearView() {
      var month;
      this.selectedYear = this.$refs.myInputYear.value;
      if (this.selectedMonth === "") {
        month = this.currentMonth;
      } else {
        month = this.selectedMonth;
      }
      this.$refs.fullCalendar
        .getApi()
        .changeView(
          this.calendarOptions.initialView,
          this.$refs.myInputYear.value + month + this.currentDate
        );
      this.getCurrentDateMonth();
      this.$store.dispatch("leavevacation/setActiveFromToDate", {
        from: this.fromDate,
        to: this.toDate,
      });
      this.$store.dispatch("leavevacation/setLeaveVacations", {
        from: this.getformToDate.from,
        to: this.getformToDate.to,
      });
      setTimeout(() => {
        this.calendarOptions.events = this.getLeaveVacation;
      }, 1000);
    },
    monthView() {
      this.ViewTitle = "Month";
      this.nextPrev = false
      this.calendarOptions.initialView = "dayGridMonth";
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridMonth");
    },
    weekView() {
      this.nextPrev = true
      this.ViewTitle = "Week";
      this.calendarOptions.initialView = "dayGridWeek";
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridWeek");
    },
    async prevWeek() {
      if (this.flag == false) {
        this.flag == true;
        this.getCurrentYear();
        await this.$store.dispatch("leavevacation/setActiveFromToDate", {
          from: this.fromDate,
          to: this.toDate,
        });
        this.$store.dispatch("leavevacation/setLeaveVacations", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        });
        setTimeout(() => {
          this.calendarOptions.events = this.getLeaveVacation;
          console.log(this.calendarOptions.events, "this.calendarOptions.events")
        }, 1500);
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
        this.$store.dispatch("leavevacation/setLeaveVacations", {
          from: this.getformToDate.from,
          to: this.getformToDate.to,
        });
        setTimeout(() => {
          this.calendarOptions.events = this.getLeaveVacation;
        }, 1000);
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
      this.addLeaveKey += 1;
      this.calendarOptions.events.filter((item, index) => {
        if (item.id == clickInfo.event._def.publicId) {
          this.getUserLeavesDetail(item.employee.id)
          console.log(item, "allowanceLeavesDetailedData");
          this.leaveStatus = item.status;
          this.form = item;
          this.employeeNameSelect = item.employee.id;
          setTimeout(() => {
            if(item.type == 'vacation'){
            this.allowanceData = 30
            this.useDaysData = this.allowanceLeavesDetailedData.vacationsUsed
          }
          if(item.type == 'leave'){
            this.allowanceData = 12;
            this.useDaysData = this.allowanceLeavesDetailedData.otherLeavesUsed
          }
          if(item.type == 'medical'){
            this.allowanceData = 10;
            this.useDaysData =  this.allowanceLeavesDetailedData.medicalLeavesUsed
          }
          },1000)
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
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
  },
};
</script>

<style lang="scss">
@media (min-width: 500px) {
  body{
    font-size: 10px;
  }
}
@media (min-width: 768px) {
  body{
    font-size: 11px;
  }
}
@media (min-width: 1200px) {
  body{
    font-size: 12px;
    span{
      font-size: 12px;
    }
  }
}

@media (min-width: 1400px) {
  body{
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
      .menu-items {
        background-color: #fff;
        width: 97px;
        box-shadow: 0 0 0.4rem 0.5rem rgba(var(--bib-gray3), 0.9);
        border-radius: 10px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .button-items {
        display: flex;
        align-items: center;

        label {
          padding-right: 5px;
          font-size: 14px;
        }
      }
    }
    select {
      font-size: 14px;
      width: 100%;
      border: 1px solid var(--bib-gray4);
      border-radius: 0.2rem;
      color: var(--bib-dark);
      background-color: #000;
      color: #fff;
      padding: 10px;
      border-radius: 10px;
      border-right: 10px solid transparent;
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
  background-color: #fff !important;
  // justify-content: center;
  align-items: center;
  // background-color: #f2f2f5;

  &__bgevent {
    background-color: #d5e8d4;
  }
  &__bgonleave {
    background-color: #f7e9ce !important;
  }

  &__bghoilday {
    background-color: #1f42a2 !important;
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
.fc-h-event {
  background-color: #fff !important;
  border: none !important;
}
.fc-event:focus::after {
  background-color: none !important;
}

.fc-event:focus {
  box-shadow: none !important;
}
</style>
