<template>
  <div>
  <client-only>
    <div class="p-2">
      <h1>Hello Calender</h1>
    </div>
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
   
  </client-only>
</div>
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
          // center: 'title',
          right: 'myLink'
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

<style lang="scss">
$--fc-border-color:#000 !important;
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
.fc-header-toolbar{
  padding: 0 10px !important;
}
.fc-scrollgrid{
border-left: none !important;
}
.fc-scrollgrid-section-liquid{
  background-color: #f8f8f9;
}
.fc-theme-standard {
    th{
      background-color: #fff !important;
      // padding: 5px 0;
      border-right:0px;
      border-left: 0px;
      .fc-scrollgrid-sync-inner{
        padding: 0.5rem;
      }
    }
  }
  // .fc .fc-button-primary { color: #FFFFFF; background-color: #3485FF !important; border-color: #FFFFFF !important; }
</style>
