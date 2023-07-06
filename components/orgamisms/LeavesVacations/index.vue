<template>
    <div class="py-1">
      <client-only>
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
      </client-only>
    </div>
  </template>
  
  <script>
  import FullCalendar from "../../../modules/@fullcalendar/vue";
  import dayGridPlugin from "../../../modules/@fullcalendar/daygrid";
  import interactionPlugin from "../../../modules/@fullcalendar/interaction";
  import timeGridPlugin from "../../../modules/@fullcalendar/timegrid";
  import { SAMPLE_EVENTS } from "../../../utils/constant/Calander";
  
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
  
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
              text: "PREV",
              click: () => {
                console.log("eventNext");
                let calendarApi = this.$refs.fullCalendar.getApi();
                calendarApi.next();
              },
            },
          },
          headerToolbar: {
            left: "myLink,dayGridMonth,dayGridWeek,prevYear,prev,next,nextYear",
            center: "title",
            right: "weekData",
          },
          views: {
            // we can specify particular view for particular layout here
          },
          // initialView: 'dayGridMonth',
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
      };
    },
    mounted() {
      // this.addButton()
      // setTimeout(() => {
      //   $(".fc-toolbar-ltr").append(
      //     '<select class="select_year form-control"><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option></select>'
      //   );
      //   $(".fc-toolbar-ltr").append(
      //     '<select class="select_month form-control"><option value="">Select Month</option><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mrch</option><option value="4">Aprl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>'
      //   );
  
      //   $(".select_month").on("change", function (event) {
      //     let calendarApi = this.$refs.fullCalendar.getApi();
      //     this.$refs.fullCalendar
      //       .getApi()
      //       .changeView("dayGridWeek", "month", this.value);
      //     // $('#fullCalendar').fullCalendar('changeView', 'month', this.value);
      //     // $('#fullCalendar').fullCalendar('gotoDate', $(".select_year").val()+"-"+this.value+"-1");
      //   });
      // }, 1000);
      setTimeout(() => {
        this.buttonStyle();
      }, 5);
    },
    methods: {
      clickOn() {
        let calendarApi = this.$refs.fullCalendar.getApi();
        console.log(calendarApi, "eventNext");
        calendarApi.prevYear("march");
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
      buttonStyle() {
        var Weekends = document.querySelector('[title="Weekends"]');
        Weekends.style =
          "background-color:#eee !important; border-radius:10px !important; color:#000 !important";
        var add = document.querySelector('[title="+ Add"]');
        add.style =
          "background-color: #d5e8d4 !important; color: #55b251 !important; border-radius:10px !important;";
        var prevMonth = document.querySelector('[title="Previous month"]');
        prevMonth.style =
          "background-color:#eee !important; border-radius:10px !important; color:#000 !important";
        var nextMonth = document.querySelector('[title="Next month"]');
        nextMonth.style =
          "background-color:#eee !important; border-radius:10px !important; color:#000 !important";
        var prevYear = document.querySelector('[title="Previous year"]');
        prevYear.style =
          "background-color:#eee !important; border-radius:10px !important; color:#000 !important";
        var nextYear = document.querySelector('[title="Next year"]');
        nextYear.style =
          "background-color:#eee !important; border-radius:10px !important; color:#000 !important";
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
  