<template>
    <div>
      <client-only>
        <div class="custom-header px-1">
          <div class="ltr-wrapper">
            <div class="ltr-wrapper-items">
              <div class="button-items">
                <label>View:</label>
                <button-black
                  icon="close"
                  variant="light"
                  :scale="1"
                  title="Add"
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
                <label>Date:</label>
                <select
                  class="select_month"
                  id="my-select"
                  style="
                    font-size: 14px;
                    /* line-height: 1.2; */
                    width: 100%;
                    border: 1px solid var(--bib-gray4);
                    border-radius: 0.2rem;
                    margin: 0.5rem 0;
                    color: var(--bib-dark);
                    min-height: 2rem;
                    margin-bottom: 10px;
                  "
                >
                  <option value="">Select Month</option>
                  <option value="01">Jan</option>
                  <option value="02">Feb</option>
                  <option value="03">Mrch</option>
                  <option value="04">Aprl</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">Aug</option>
                  <option value="09">Sep</option>
                  <option value="10">Oct</option>
                  <option value="11">Nov</option>
                  <option value="12">Dec</option>
                </select>
              </div>
            </div>
          </div>
          <div class="rtl-wrapper">
            <span>header</span>
          </div>
        </div>
  
       <div class="pt-2">
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
  import interactionPlugin from "../../../modules/@fullcalendar/interaction";
  import timeGridPlugin from "../../../modules/@fullcalendar/timegrid";
  import { SAMPLE_EVENTS } from "../../../utils/constant/Calander";
  import $ from "jquery";
  import fecha, { format } from "fecha";
  
  export default {
    components: {
      FullCalendar,
    },
    data() {
      return {
        show: false,
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
        currentDate: fecha.format(new Date(), "DD"),
        currentYear: fecha.format(new Date(), "YYYY"),
      };
    },
    mounted() {
      // this.addButton()
      setTimeout(() => {
        let find = document.querySelector(".fc-toolbar-ltr");
        let div = document.createElement("div");
        div.classList.add("input");
        let html = `<select class="select_month" id="my-select" style="padding: 0 0.5rem 0 0.5rem;
      font-size: 14px;
      line-height: 1.2;
      width: 100%;
      border: 1px solid var(--bib-gray4);
      border-radius: 0.2rem;
      margin: 0.5rem 0;
      color: var(--bib-dark);
      min-height: 2.5rem;"><option value="">Select Month</option><option value="01">Jan</option><option value="02">Feb</option><option value="03">Mrch</option><option value="04">Aprl</option><option value="05">May</option><option value="06">June</option><option value="07">July</option><option value="08">Aug</option><option value="09">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>`;
  
        div.innerHTML = html;
  
        find.appendChild(div);
        const selectElement = document.querySelector(".select_month");
        selectElement.addEventListener("change", (event) => {
          console.log(this.currentDate, fecha.format(new Date(), "DD"));
          this.$refs.fullCalendar
            .getApi()
            .changeView(
              "dayGridMonth",
              this.currentYear + event.target.value + this.currentDate
            );
        });
        // $(".fc-toolbar-ltr").append(
        //   `<select class="select_month" id="my-select"><option value="">Select Month</option><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mrch</option><option value="4">Aprl</option><option value="5">May</option><option value="6">June</option><option value="7">July</option><option value="8">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>`
        // );
        // $("#my-select").click(function (e) {
        //   // let calendarApi = this.$refs.fullCalendar.getApi();
        //   //       $calendarApi.next();
        // //   let calendarApi = this.$refs.fullCalendar.getApi();
        // // console.log(calendarApi, "eventNext");
        // // calendarApi.prevYear("march");
        // console.log($fullCalendar.getApi(), "eventNext");
        // });
        //       $(".select_month").on("change", function(event) {
        //         let calendarApi = this.$refs.fullCalendar.getApi();
        //         calendarApi('changeView', 'month', this.value);
        //         calendarApi('gotoDate', "2018-"+this.value+"-1");
        //  });
      }, 100);
      setTimeout(() => {
        this.buttonStyle();
      }, 5);
    },
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
      monthView() {
        let calendarApi = this.$refs.fullCalendar.getApi();
        calendarApi.changeView("dayGridMonth");
      },
      weekView() {
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
  
  