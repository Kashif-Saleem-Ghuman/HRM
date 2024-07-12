import { mapGetters } from "vuex";
import { FILL_DAILY_ENTRY_EVENT, MAX_TIMER_DURATION_HOUR } from "../utils/constant/Constant";
import { DateTime } from 'luxon';
import {getTimeDiffInSeconds} from "@/utils/functions/common_functions";
import { getChronometerDuration } from "@/utils/functions/timer";
const EmitValurChronometer = 'chronometer';
var chronometerInterval = null;
export default {

  computed: {
    chronometer() {
      return this.$store.state.timeattendance.chronometer;
    },
    active() {
      return this?.getTimerData?.active || false;
    },
    isBreakActive() {
      return this.getBreakTimerData?.active || false;
    },

    ...mapGetters({
      getTimerData: "timeattendance/getTimerData",
      getBreakTimerData: "timeattendance/getBreakTimerData",
    }),
  },
  methods: {

    setChronometerDuration() {
      let chronometer = getChronometerDuration(this.getDailyTimeEntries);
      if(this.active){
        this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer });
      }
      return chronometer;
    },
    async startTimerInterval(isVisibilityChange = false) {
      if(isVisibilityChange) {
        await this.$store.dispatch('timeattendance/setDailyTimeEntries');
        await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
        if(this.active && this.isBreakActive){
          this.setChronometerDuration();
        }
      }if (this.active && !this.isBreakActive && !chronometerInterval) {
        isVisibilityChange && this.timerCallbackFunc();
        chronometerInterval = setInterval(this.timerCallbackFunc, 1000);
      }
    },

    async timerCallbackFunc() {
      const now = DateTime.local();
      this.time = new Date().toTimeString().split(" ")[0];
      this.date = new Date().toDateString();
      let chronometer = this.setChronometerDuration();
      const MAX_DURATION_TIMER = MAX_TIMER_DURATION_HOUR * 60 * 60;
      if (chronometer >= MAX_DURATION_TIMER) {
        this.stopClick = true;
        const timer = {
          active: this.getTimerData.active,
          start: this.getTimerData.start,
          end: this.getTimerData.end,
          type: this.getTimerData.type,
        };
        await this.stopTimer(timer);
        await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
      }
    },
    async stopTimer(timer = null) {
      this.loading = true;
      this.clearChronometerInterval();
      await this.$store.dispatch("timeattendance/stopTimer", { timer });
      await this.$store.dispatch("timeattendance/setDailyTimeEntries");
      await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
      this.loading = false;
    },
    async clearChronometerInterval() {
      clearInterval(chronometerInterval);
      chronometerInterval = null;
    },

    async startTimer() {
      if (this.active) return;
      this.loading = true;
      await this.$store.dispatch("timeattendance/startTimer");
      await this.$store.dispatch("timeattendance/setDailyTimeEntries");
      await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
      this.loading = false;
    },
    registerDefaultValueChronometer() {
      this.$root.$on(EmitValurChronometer, () => {
        this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer: 0 });
      });
    },
    unregisterDefaultValueChronometer() {
      this.$root.$off(EmitValurChronometer);
    },
    unRegisterUpdateTimerListener() {
      this.$root.$off('update-timer');
    },
    registerRootListeners() {
      this.registerDefaultValueChronometer();
      this.registerUpdateTimerListener();
    },
    unregisterRootListeners() {
      this.unregisterDefaultValueChronometer();
      this.unRegisterUpdateTimerListener();
    },
  },
  watch: {
    active(val) {
      if (!chronometerInterval) {
        this.startTimerInterval();
      }
    },
    isBreakActive(val) {
      if(val) {
        this.clearChronometerInterval()
      }else {
        this.startTimerInterval();
      }
    },
  },
};
