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
      return this.getBreakTimerData.active || false;
    },

    ...mapGetters({
      getTimerData: "timeattendance/getTimerData",
      getBreakTimerData: "timeattendance/getBreakTimerData",
    }),
  },
  methods: {
    startTimerInterval(isVisibilityChange = false) {

      if (this.active && !this.isBreakActive && !chronometerInterval) {

        isVisibilityChange && this.timerCallbackFunc();

        chronometerInterval = setInterval(this.timerCallbackFunc, 1000);
      }
    },

    async timerCallbackFunc() {
      const now = DateTime.local();
      this.time = new Date().toTimeString().split(" ")[0];
      this.date = new Date().toDateString();
      const setCurrentDate = now.toISODate();
      let chronometer = getChronometerDuration(this.getDailyTimeEntries);
      if(this.active){
        this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer });
      }
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
    registerRootListeners() {
      this.registerDefaultValueChronometer();
    },
    unregisterRootListeners() {
      this.unregisterDefaultValueChronometer();
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
