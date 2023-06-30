<template>
  <client-only>
    <div class="p-2">
      <h1>Hello Calender</h1>
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent='arg'>
            <bib-avatar
                  src="avatarImg.jpg"
                  size="4rem"
                  indicator="warning"
                  indicator-offset-top="0.3rem"
                  indicator-offset-right="0.35rem"
                ></bib-avatar>
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
        headerToolbar: {
          left: 'prev,next today',
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
        eventColor: '#f3f',
        eventBackgroundColor: '#999',
        eventTextColor: 'black',
        eventBorderColor: '#ccc',
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

<style lang="scss" scoped></style>
