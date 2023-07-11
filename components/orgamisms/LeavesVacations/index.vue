<template>
  <div>
    <client-only>
      <div class="custom-header px-1 py-1">
        <div class="ltr-wrapper">
          <div class="ltr-wrapper-items">
            <div class="button-items pr-05">
              <label>View:</label>
              <button-black
                icon="close"
                variant="light"
                :scale="1"
                title="View"
                @on-click="show = !show"
                v-click-outside="clickOutside"
              ></button-black>
              <div class="menu-items">
                <ul v-if="show">
                  <li class="d-flex align-center">
                    <span
                      class="ml-05"
                      @click="monthView()"
                      style="cursor: pointer"
                      >Month</span
                    >
                  </li>
                  <li class="d-flex align-center">
                    <span
                      class="ml-05"
                      @click="weekView()"
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
            <div class="button-items pl-05">
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
        >
          <template v-slot:eventContent="arg">
            <div
              class="author-display d-flex"
              :class="[
                arg.event.extendedProps.type === 'Holiday'
                  ? 'event_wrapper__bghoilday'
                  : '',
                arg.event.extendedProps.type === 'Vacation'
                  ? 'event_wrapper__bgvacation'
                  : '',
                arg.event.extendedProps.type === 'On Leave'
                  ? 'event_wrapper__bgonleave'
                  : '',
                arg.event.extendedProps.type == 'Absent'
                  ? 'event_wrapper__bgabsent'
                  : '',
                arg.event.extendedProps.type == 'Event'
                  ? 'event_wrapper__bgabsent'
                  : '',
              ]"
            >
              <bib-avatar
                :src="arg.event.extendedProps.photo"
                size="2rem"
              ></bib-avatar>
              <div class="list-item pl-05">
                <label>{{
                  arg.event.extendedProps.firstName +
                  " " +
                  arg.event.extendedProps.lastName
                }}</label
                ><span>{{ arg.event.extendedProps.type }}</span>
              </div>
            </div>
          </template>
        </FullCalendar>
      </div>
    </client-only>
  </div>
</template>

<script>
import FullCalendar from "../../../modules/@fullcalendar/vue";
import dayGridPlugin from "../../../modules/@fullcalendar/daygrid";
// import interactionPlugin from "../../../modules/@fullcalendar/interaction";
import timeGridPlugin from "../../../modules/@fullcalendar/timegrid";
import {
  SAMPLE_EVENTS,
  MONTH_LIST,
  YEAR_LIST,
} from "../../../utils/constant/Calander";
import $ from "jquery";
import fecha, { format } from "fecha";

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      show: false,
      monthList: MONTH_LIST,
      yearList: YEAR_LIST,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin],
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
        initialView: 'dayGridMonth',
        windowResizeDelay: 200,
        initialEvents: SAMPLE_EVENTS,
        editable: false,
        selectable: false,
        selectMirror: false,
        dayMaxEvents: false,
        weekends: true,
        // style related
        // eventColor: "#FFFFFF",
        eventBackgroundColor: "#fff",
        // eventTextColor: "black",
        // eventBorderColor: "#fff",
        // event handling
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        // eventDrop: this.handleEventDrop,
        // eventResize: this.handleEventResize,
        // Events that can be used after API is hit -------
        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove,
      },
      currentDate: fecha.format(new Date(), "DD"),
      currentMonth: fecha.format(new Date(), "MM"),
      currentYear: fecha.format(new Date(), "YYYY"),
      selectedMonth: "",
      selectedYear: "",
    };
  },
  mounted() {},
  methods: {
    change(event) {
      $("#my-select").click(function (e) {
        alert("called");
        $("#calendar").fullCalendar(
          "changeView",
          this.options[e.target.selectedIndex].text
        );
        console.log(this.options[e.target.selectedIndex].text);
      });
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
          this.initialView,
          year + this.$refs.myInput.value + this.currentDate
        );
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
          this.initialView,
          this.$refs.myInputYear.value + month + this.currentDate
        );
    },
    monthView() {
      this.initialView ="dayGridMonth"
      let calendarApi = this.$refs.fullCalendar.getApi();
      calendarApi.changeView("dayGridMonth");
    },
    weekView() {
      this.initialView ="dayGridWeek"
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
        border: 1px solid #d3d1d1;
        margin-top:1px;
        border-radius: 10px;
        li {
          padding: 5px 0;
          margin: 0;
        }
      }
      .menu-items {
        background-color: #fff;
        // padding: 0 0.8rem;
        width: 130px;
        border-radius: 10px;
        position: absolute;
        left: 20px;
        top: 37px;
      }
      .button-items {
        display: flex;
        align-items: center;

        label {
          padding-right: 5px;
          font-size: 13px;
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
input{
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
