<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>My status</label>
      </div>
      <div class="info-card-items mt-05">
        <div>
          <div class="subheading">in {{ activityDetails.in }}</div>
          <span>{{ stopWatchTime }}</span>

          <div class="subheading_footer">out {{ activityDetails.out }}</div>
        </div>
      </div>
      <div class="footer-item d-flex">
      <div class="items">
        <label>Break</label>
        <span>{{ activityDetails.breaks }}</span>
      </div>
      <div class="items">
        <label>Total work</label>
        <span>{{ activityDetails.total }}</span>
      </div>
    </div>
    <div
      class="button-wrapper button-wrapper__bgsucess"
      @click="$emit('clock')"
      style="cursor:default;"
    >
      <bib-icon :icon="icon"  class="mr-05"></bib-icon>
      <span>{{ buttonLable }}</span>
    </div>
    </div>
  </div>
</template>
<script>
import { calculateActivityDetails, formatTime } from '../../../utils/functions/clock_functions';
import { mapGetters } from "vuex";

export default {
  name: "Chips",
  props: {
    clockModal: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    icon: {
      type: String,
    },
    activeUserRole: {
      type: String,
    },
    employeeId: {
      type: Number,
    }
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      localData: [],
      activityReport: {},
      loading: true,
      time: '',
      date: '',
      timerLoading: false,
      chronometer: 0,
    };
  },
  async mounted() {
    // update the time every second
    this.timerLoading = true;
    this.interval = setInterval(() => {
      this.time = new Date().toTimeString().split(' ')[0];
      this.date = new Date().toDateString();
      if (this.active) {
        this.chronometer = !this.getTimerData.start
          ? 0
          : Math.floor((new Date().getTime() - new Date(this.getTimerData.start).getTime()) / 1000);
      } else if (this.getDailyTimeEntries?.[0]?.end) {
        this.chronometer = Math.floor(
          (
            new Date(this.getDailyTimeEntries?.[0]?.end).getTime() 
            - new Date(this.getDailyTimeEntries?.[0]?.start).getTime()
          ) / 1000,
        )
      };
      this.timerLoading = false;
    }, 1000)
    this.time = new Date().toTimeString().split(' ')[0];
    this.date = new Date().toDateString();
    await this.$store.dispatch('timeattendance/setTimerData', this.employeeId);
    if (this.activeUserRole === 'USER') {
      await this.$store.dispatch('timeattendance/setDailyTimeEntries');
    } else {
      await this.$store.dispatch('timeattendance/setEmployeeDailyTimeEntry', this.employeeId)
    }
    this.timeEntriesLoading = false;
  },
  methods: {
    close() {
      this.clockModal = false;
    },
  },
  computed: {
    ...mapGetters({
      getAccessToken: "token/getAccessToken",
      getTimerData: 'timeattendance/getTimerData',
      getDailyTimeEntries: 'timeattendance/getDailyTimeEntries',
    }),
    stopWatchTime() {
      if (this.timerLoading) return '--:--:--';
      return formatTime(this.chronometer);
    },
    activityDetails() {
      return calculateActivityDetails(this.getTimerData.start, this.getDailyTimeEntries);
    },
    active() {
      return this?.getTimerData?.active || false
    },
    buttonLable() {
      if (this.activeUserRole === 'USER') {
        if (this?.active) return 'Clock Out';
        else return 'Clock In';
      }
      else if (this.activeUserRole === 'ADMIN') {
        if (this?.active) return 'Online';
        else return 'Offline';
      }
    }
  }
};
</script>
<style lang="scss">
.items  {
  border-bottom: 1px solid #eee;
  height: 40px;
  border-right: 33px solid #fff;
}
</style>
  