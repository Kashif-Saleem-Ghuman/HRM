<template>
  <client-only>
    <div class="p-2">
      <h1>Hello Calender</h1>
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent='arg'>
           <div class="author-display d-flex">
            <bib-avatar
                  src="https://placekitten.com/300/300"
                  size="2rem"
                  
                ></bib-avatar>
                <div class="list-item pl-05"><label>Author Name</label><span>author desciption</span></div>

           </div>
        </template>
    </FullCalendar>
    </div>
  </client-only>
</template>

<script>
import FullCalendar from '../../modules/@fullcalendar/vue'
import dayGridPlugin from '../../modules/@fullcalendar/daygrid'
import interactionPlugin from '../../modules/@fullcalendar/interaction'
import { SAMPLE_EVENTS } from '../../utils/constant/Calander';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
        calendarOptions: {
        plugins: [
          dayGridPlugin,
          // timeGridPlugin,
          interactionPlugin
        ],
        customButtons: {
                myLink: {
                    text: "Take me to your leader",
                    click: () => this.$router.push({name: "yourLeader"}) // assuming you use Vue Router
                }
            },
        headerToolbar: {
          left: 'myLink,dayGridMonth,dayGridWeek,dayGridDay',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay'
        },
        views: {
          // we can specify particular view for particular layout here
        },
        // initialView: 'dayGridMonth',
        windowResizeDelay: 200,
        initialEvents: SAMPLE_EVENTS,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: false,
        weekends: true,
        // style related
        eventColor: '#000',
        eventBackgroundColor: '#fff',
        eventTextColor: 'black',
        eventBorderColor: '#fff',
        // event handling
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        eventDrop: this.handleEventDrop,
        eventResize: this.handleEventResize,
        // Events that can be used after API is hit -------
        eventAdd: this.handleEventAdd,
        eventChange: this.handleEventChange,
        eventRemove: this.handleEventRemove
      },
    };
  },
  methods:{
    handleEventClick(clickInfo) {
      // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //   clickInfo.event.remove()
      // }
      console.log('hello')
    },

  }
};
</script>

<style lang="scss" scoped>
.author-display{
  border-radius: 0.5rem;
  background-color: #cdf784;
  color: black;
  padding: 0.5rem;
  label{
    font-weight: bold;
    display: block;
  }
}
</style>
