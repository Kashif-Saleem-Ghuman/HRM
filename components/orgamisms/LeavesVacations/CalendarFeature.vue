<template>
  <div>
    <div class="custom-header px-1 py-05 ">
      <div class="ltr-wrapper">
        <div class="ltr-wrapper-items">
          <div class="button-items pr-05">
            <div class="d-flex align-center">
              <button-green
                icon="add"
                variant="success--outline"
                :scale="1"
                title="Add leave"
                class="mr-05"
                className="button-custom--lightsuccess"
                @on-click="actionBY('leaveAdmin')"
              ></button-green>
              <button-green
                icon="add"
                variant="success--outline"
                :scale="1"
                class="mr-05"
                title="Add vacation"
                size="md"
                className="button-custom--lightsuccess"
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
                style="height: 1.9rem"
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
              style="height: 1.9rem"
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
              style="height: 1.9rem"
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
            <input
              type="text"
              name="name"
              @change="searchLeavesType($event)"
            />
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
          :title="weekendsButtonView"
          @on-click="weekData()"
          style="height: 2rem"
        ></button-gray>
      </div>
    </div>
    <div
      class="d-flex px-1 py-05 align-center bottom_top_wrapper"
      v-show="nextPrev"
    >
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
              <span>{{ arg.event.extendedProps.type }}</span>
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
          :employeeName="employeeName"
          :allowanceDays="allowanceData"
          :usedDays="useDaysDataValue"
          :employeeNameSelect="employeeNameSlectedValue"
          :employeesOptions="employeesOptions"
          :employeeNameSelectShow="employeeNameSelectShow"
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
      <!-- <template v-slot:sidebar-footer>
        <div class="">
          <div style="text-align: right">
            <bib-button
              label="Cancel"
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
        dayMaxEvents: 1,
        weekends: true,
        contentHeight: "auto",
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
      selectedMonth: "",
      currentYear: fecha.format(new Date(), "YYYY"),
      todayDate:
        "Today," + " " + fecha.format(new Date(), "dddd, MMMM MM, YYYY"),

      selectedYear: "2023",
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

    this.$store.dispatch("leavevacation/setLeaveVacations", {
      from: this.getformToDate.from,
      to: this.getformToDate.to,
    }).then((result)=>{
      this.calendarOptions.events = result;
      const att = document.createAttribute("id");
      att.value = "currentDay";
      var el = document.querySelectorAll(".fc-day-today");
      el[0].setAttributeNode(att);
      for (let i = 0; i < el.length; i++) {
        // el[i].id = 'currentDay' + i;
        el[0].setAttributeNode(att);
      }
      this.scrolltoId();
    });
    // setTimeout(() => {
    //   this.calendarOptions.events = this.getLeaveVacation;
    //   this.reloadData += 1;
    // }, 1000);
    // setTimeout(() => {
    //   this.calendarOptions.events = this.getLeaveVacation;
    //   this.reloadData += 1;
    // }, 3000);
    // console.log(this.calendarOptions.events, "this.calendarOptions.events");
    // this.getAllowanceDays().then((result) => {
    //   this.allowanceData = result;
    //   // this.temKey += 1;
    // });
    this.$store.dispatch("employee/setReportsToList").then((reportTo) => {
      this.employeesOptions = reportTo;
      this.employeeNameSelectShow = true;
    });
    // this.employeesOptions = this.getReportList;
    // this.employeeNameSelectShow = true
  },
  methods: {
    addHandleInput,
    getAllowanceDays,
    addLeaveVacations,
    getCurrentDateMonth,
    getCurrentYear,
    getUserLeavesDetail,
     scrolltoId(){
var access = document.getElementById("currentDay");
access.scrollIntoView();
},
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
      this.$nuxt.$emit("open-sidebar-admin", $event);
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
      this.nextPrev = false;
      this.calendarOptions.initialView = "dayGridMonth";
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridMonth");
    },
    weekView() {
      this.nextPrev = true;
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
          console.log(
            this.calendarOptions.events,
            "this.calendarOptions.events"
          );
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
              this.allowanceData = 30;
              this.useDaysData = this.allowanceLeavesDetailedData.vacationsUsed;
            }
            if (item.type == "leave") {
              this.allowanceData = 12;
              this.useDaysData =
                this.allowanceLeavesDetailedData.otherLeavesUsed;
            }
            if (item.type == "medical") {
              this.allowanceData = 10;
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
      border: 1px solid #E2E2E3;
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
  background-color: #F8F8F9;
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
