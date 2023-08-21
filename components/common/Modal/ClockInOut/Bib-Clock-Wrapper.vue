<template>
  <div class="modal-clock" v-if="clockModal">
    <div class="modal-clock__mask" @click="$emit('click:outside')"></div>
    <div @keydown.esc="close" ref="modal" tabindex="0" class="wrapper">
      <div class="header">
        <span class="font-w-600">{{ title }}</span>
        <div class="ml-auto mr-05 d-flex">
          <slot name="header"></slot>
        </div>
        <bib-icon
          variant="gray4"
          class="cursor-pointer"
          :scale="1"
          icon="close"
          @click.native="close"
        ></bib-icon>
      </div>

      <div class="content">
        <div class="clockin" :class="borderClass">
          <div>
            <span>{{ date }}</span>
            <span>{{ time }}</span>
            <span class="stop-watch">{{ stopWatchTime }}</span>
          </div>
        </div>
        <div class="button-punched-in mb-1 mt-2" @click="stopWatchClicked">
          <bib-icon icon="video-solid" variant="white" class="mr-05"></bib-icon>
          <span>{{ buttonLable }}</span>
        </div>
        <div class="time-log-wrapper">
          <header>Time log</header>
          <div class="d-flex time-log-item">
            <span>In</span>
            <span>{{ activityDetails.in }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span>Breaks</span>
            <span>{{ activityDetails.breaks }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span>0ut</span>
            <span>{{ activityDetails.out }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span style="font-weight: bold">Total</span>
            <span style="font-weight: bold">{{ activityDetails.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { startTimer, stopTimer } from "../../../../utils/functions/api_call/timeattandance/timer";

export default {
  name: "BibClockWrapper",
  props: {
    clockModal: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default() {
        return null;
      },
    },
  },
  methods: {
    startTimer,
    stopTimer,
    close() {
      this.$emit("close");
    },
    async stopWatchClicked() {
      if (!this.active) await this.startStopWatch();
      else await this.stopStopWatch();
    },
    async startStopWatch() {
      this.active = true;
      this.chronometer = 0;
      await this.startTimer();
      await this.$store.dispatch('timeattendance/setTimerData');
    },
    async stopStopWatch() {
      this.active = false;
      await this.stopTimer();
      await this.$store.dispatch('timeattendance/setDailyTimeEntries');
    },
    formatTime(timeInSeconds, includeSeconds = true) {
      const hours = Math.floor(timeInSeconds / 3600);
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      const minutes = Math.floor((timeInSeconds % 3600) / 60);
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      if (!includeSeconds) return `${formattedHours}:${formattedMinutes}`;
      const seconds = timeInSeconds % 60;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    this.timeEntriesLoading = true;
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
      };
      this.timerLoading = false;
    }, 1000)
    this.active = this.getTimerData.active;
    this.time = new Date().toTimeString().split(' ')[0];
    this.date = new Date().toDateString();
    await this.$store.dispatch('timeattendance/setTimerData');
    await this.$store.dispatch('timeattendance/setDailyTimeEntries');
    this.timeEntriesLoading = false;
  },
  computed: {
    ...mapGetters({
      getTimerData: 'timeattendance/getTimerData',
      getDailyTimeEntries: 'timeattendance/getDailyTimeEntries',
    }),
    buttonLable() {
      return this.active ? 'CLOCK OUT' : 'CLOCK IN'
    },
    stopWatchTime() {
      if (this.timerLoading) return '--:--:--';
      return this.formatTime(this.chronometer);
    },
    borderClass() {
      return this.active ? 'border-green' : 'border-gray';
    },
    activityDetails() {
      // by default, just consider the start time of the current timer
      let inTime = this.getTimerData?.start
        ? new Date(this.getTimerData.start).toTimeString().split(' ')[0]
        : null; 
      // there is no out time before there is a timeEntry record
      let outTime = null;

      const timeEntriesLength = this.getDailyTimeEntries?.length;
      console.log({timeEntriesLength})
      if(timeEntriesLength) {
        // when there is a record in daily entries, override inTime
        // with starting time of the first record
        inTime = new Date(this.getDailyTimeEntries[0].start)
          .toTimeString()
          .split(' ')
          [0];

        // when there is a record in daily entries, outTime is the
        // ending time of the last record
        outTime = new Date(this.getDailyTimeEntries[timeEntriesLength - 1].end)
          .toTimeString()
          .split(' ')
          [0];
      }

      let breaksSeconds = 0;
      let totalSeconds = 0;

      for (let i = 1; i < timeEntriesLength; i++) {
        totalSeconds += Math.floor(
          (
            new Date(this.getDailyTimeEntries[i].end).getTime()
            - new Date(this.getDailyTimeEntries[i].start).getTime()
          ) / 1000
        );
        if (i > 0) breaksSeconds += Math.floor(
          (
            new Date(this.getDailyTimeEntries[i].start).getTime()
            - new Date(this.getDailyTimeEntries[i - 1].end).getTime()
          ) / 1000
        );
      }

      return {
        in: inTime === null ? '--:--' : inTime,
        out: inTime === null ? '--:--' : outTime,
        breaks: this.formatTime(breaksSeconds, false),
        total: this.formatTime(totalSeconds),
      };
    },
  },
  data() {
    return {
      chronometer: 0,
      time: '',
      date: '',
      active: false,
      timerLoading: false,
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-clock {
  &__mask {
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparentize(#dcdcdf, 0.2);
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .wrapper {
    max-width: 330px;
    box-shadow: 0px 2px 8px #0000003d;
    height: max-content;
    margin: auto;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $black;
    border-radius: 24px;
    z-index: 999999;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      line-height: 1.5rem;
      min-height: 3.5rem;
      // border-bottom: 1px solid $light;
      span {
        color: $white;
      }
    }
    .content {
      padding: 2rem;
      max-height: 75vh;
      overflow: hidden;
      .border-green {
        border: 16px solid #0ea900;
      }
      .border-gray {
        border: 16px solid #3f3f41;
      }
      .clockin {
        display: flex;
        justify-content: center;
        color: $white;
        border-radius: 50%;
        width: 270px;
        height: 270px;
        padding-top: 40px;

        span {
          color: $white;
          display: block;
          text-align: center;
        }
      }
    }
  }
}
.button-punched-in {
  background-color: #6bbf68;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  span {
    color: #fff;
  }
  svg {
    fill: #fff !important;
  }
}
.time-log-wrapper {
  header {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .time-log-item {
    display: flex;
    justify-content: space-between;
    border-top: dotted 1px #fff;
    padding: 10px 0;
    color: #fff;
  }
}
.stop-watch {
  font-size: 52px;
}
</style>
