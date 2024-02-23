<template>
  <div class="modal-clock" v-if="clockModal">
    <div class="modal-clock__mask" @click="close()"></div>
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
        <div
          :class="[
            'button-punched-in',
            'mb-1',
            'mt-2',
            activeButton ? 'active-button' : 'disabled-button',
          ]"
          @click="() => (activeButton ? stopWatchClicked() : null)"
        >
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
          <div class="d-flex time-log-item font-w-600">
            <span>Total</span>
            <span>{{ activityDetails.total }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import timerMixin from "../../../../mixins/timer-mixin";
import {
  formatTime,
  calculateActivityDetails,
} from "../../../../utils/functions/clock_functions";
import { ACTIVITY_TYPE } from "../../../../utils/constant/Constant";
const CLOCK_MODAL = "clock-in";
export default {
  name: "BibClockWrapper",
  mixins: [timerMixin],
  methods: {
    close() {
      this.$emit("close");
    },
    async stopWatchClicked() {
      if (!this.active) await this.startStopWatch();
      else {
        await this.stopTimer();
        await this.$store.dispatch("timeattendance/setDailyTimeEntries");
      }
    },
    async startStopWatch() {
      await this.$store.dispatch("timeattendance/startTimer");
    },
    close() {
      this.clockModal = false;
    },
    registerClockModalRootListener() {
      this.$root.$on(CLOCK_MODAL, () => {
        this.clockModal = true;
      });
    },
    unregisterClockModalRootListener() {
      this.$root.$off(CLOCK_MODAL);
    },
    registerRootListeners() {
      this.registerClockModalRootListener();
    },
    unregisterRootListeners() {
      this.unregisterClockModalRootListener();
    },
  },
  beforeDestroy() {
    this.unregisterRootListeners();
  },

  created() {
    this.timeEntriesLoading = true;
    this.registerRootListeners();
  },
  async mounted() {
    this.startTimerInterval();
    this.registerRootListeners();
    this.time = new Date().toTimeString().split(" ")[0];
    this.date = new Date().toDateString();
    await this.$store.dispatch("timeattendance/setTimerData");
    await this.$store.dispatch("timeattendance/setDailyTimeEntries");
    this.timeEntriesLoading = false;
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: "timeattendance/getDailyTimeEntries",
    }),
    buttonLable() {
      return this.active ? "CLOCK OUT" : "CLOCK IN";
    },
    activeButton() {
      return !this.getDailyTimeEntries.some(
        (entry) => entry.activity === ACTIVITY_TYPE.IN && entry.end
      );
    },
    stopWatchTime() {
      if (this.timerLoading) return "00:00:00";
      return formatTime(this.chronometer);
    },
    borderClass() {
      return this.active ? "border-green" : "border-gray";
    },
    activityDetails() {
      return calculateActivityDetails(
        this.getTimerData.start,
        this.getDailyTimeEntries
      );
    },
  },
  data() {
    return {
      time: "",
      date: "",
      timerLoading: false,
      clockModal: false,
      title: "Business in box / Timer",
    };
  },
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
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #fff;
  }
  svg {
    fill: #fff !important;
  }
}
.active-button {
  cursor: pointer;
  background-color: #0741a3;
}
.disabled-button {
  background-color: gray;
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
