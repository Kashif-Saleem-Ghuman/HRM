<template>
  <div>
    <div class="custom-header px-1 py-1">
      <div class="ltr-wrapper">
        <div class="ltr-wrapper-items">
          <div class="button-items pr-05">
            <label>View:</label>
            <button-black
              icon="close"
              variant="light"
              :scale="1"
              :title="ViewTitle"
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
          <div class="button-items">
            <label>Month:</label>
            <select
              class="select_month"
              id="my-select"
              ref="myInput"
              @change="changeMonthView()"
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
            <label>Year:</label>
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
          <div class="button-items pr-05">
            <button-black
              icon="close"
              variant="light"
              :scale="1"
              :title="todayDate"
              @on-click="show = !show"
              v-click-outside="clickOutside"
            ></button-black>
          </div>
        </div>
      </div>
      <div class="rtl-wrapper d-flex align-center">
        <div class="serach-item pr-05">
          <label>Serach:</label>
          <template>
            <bib-input
              type="text"
              name="name"
              placeholder="Type your name"
            ></bib-input>
          </template>
        </div>
        <div class="serach-item pr-05">
          <label>Show:</label>
          <button-gray
            variant="light"
            title="All"
            @on-click="weekData()"
          ></button-gray>
        </div>
        <button-gray
          variant="light"
          :scale="1"
          title="Weekends"
          @on-click="weekData()"
        ></button-gray>
      </div>
    </div>
    <div class="">
      <FullCalendar
        :options="calendarOptions"
        ref="fullCalendar"
        id="fullCalendar"
        :reloadData="reloadData"
      >
        <template
          v-slot:eventContent="arg"
          style="background-color: #fff !important"
        >
          <a
            class="author-display d-flex"
            :class="[
              arg.event.extendedProps.type === 'holiday'
                ? 'event_wrapper__bghoilday'
                : '',
              arg.event.extendedProps.type === 'vacation'
                ? 'event_wrapper__bgholiday'
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
              :src="arg.event.extendedProps.photo"
              size="2rem"
            ></bib-avatar>
            <div class="list-item pl-05">
              <label>{{ arg.event.extendedProps.start }}</label>
              <span>{{ arg.event.extendedProps.type }}</span>
            </div>
          </a>
        </template>
      </FullCalendar>
    </div>
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
import { getLeaveVacationsAdmin } from "../../../utils/functions/api_call/leavesvacations/requestadmin";

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
      monthList: MONTH_LIST,
      yearList: YEAR_LIST,
      ViewTitle: "Month",
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
              console.log("eventNext");
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
        eventColor: "green",
        // style related
        // eventColor: "#FFFFFF",
        eventBackgroundColor: "#fff",
        eventTextColor: "black",
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
    };
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getLeaveVacation: "leavevacation/getLeaveVacation",
      getformToDate: "leavevacation/getformToDate",
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
    }, 1000);
    console.log(this.calendarOptions.events, "this.calendarOptions.events");
  },
  methods: {
    getLeaveVacationsAdmin,
    change(event) {},
    getCurrentDateMonth() {
      var cuDate = this.selectedYear + "/" + this.selectedMonth + "/01";
      let date = new Date(cuDate);
      let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      this.fromDate = fecha.format(new Date(firstDay), "YYYY-MM-DD");
      this.toDate = fecha.format(new Date(lastDay), "YYYY-MM-DD");
    },
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
      console.log(this.selectedMonth, this.selectedYear, "selectedMonth");
      this.getCurrentDateMonth();
      this.getLeaveVacationsAdmin();
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
      this.getLeaveVacationsAdmin();
    },
    monthView() {
      this.ViewTitle = "Month";
      this.calendarOptions.initialView = "dayGridMonth";
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridMonth");
    },
    weekView() {
      this.ViewTitle = "Week";
      this.calendarOptions.initialView = "dayGridWeek";
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridWeek");
    },
    clickOutside() {
      this.show = false;
    },
    clickOn() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.next();
    },
    handleEventClick(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }

      console.log("hello");
    },
    weekData() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
  },
};
</script>

<style lang="scss">
.custom-header {
  display: flex;
  justify-content: space-between;
  z-index: 10000;
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

          font-size: 13px;
        }
      }
      .menu-items {
        background-color: #fff;
        width: 97px;
        border-radius: 10px;
        position: absolute;
        left: 37px;
        top: 2px;
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
.fc-h-event {
  background-color: #fff !important;
  border: none !important;
}
.fc-event-selected {
  box-shadow: none !important;
}
.fc-event:focus {
  box-shadow: none !important;
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
</style>
