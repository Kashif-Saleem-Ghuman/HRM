import { mapGetters } from "vuex";
import { FILL_DAILY_ENTRY_EVENT, MAX_TIMER_DURATION_HOUR } from "../utils/constant/Constant";
import { DateTime } from 'luxon';
const EmitValurChronometer = 'chronometer';
export default {
  data() {
    return {
      chronometerInterval: null,
    };
  },

  computed: {
    chronometer() {
      return this.$store.state.timeattendance.chronometer;
    },

    isTimerRunning() {
      return this.$store.state.timeattendance.isTimerRunning;
    },

    active() {
      return this?.getTimerData?.active || false;
    },

    ...mapGetters({
      getTimerData: "timeattendance/getTimerData",
    }),
  },
  methods: {
    startTimerInterval() {
      if (this.active && !this.isTimerRunning) {
        this.timerLoading = true;
        
        if (!this.isTimerRunning)
          this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
            status: true,
          });
        this.chronometerInterval = setInterval(async () => {
          const now = DateTime.local();
          this.time = new Date().toTimeString().split(" ")[0];
          this.date = new Date().toDateString();
          const setCurrentDate = now.toISODate();
          const chronometer = this.getTimerData.active && !this.getTimerData.start
            ? 0
            : Math.floor(
                (new Date().getTime() -
                  new Date(this.getTimerData.start).getTime()) /
                  1000
              );
          if(this.getTimerData.start != 0){
            this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer });
          }
          const MAX_DURATION_TIMER = MAX_TIMER_DURATION_HOUR * 60 * 60;
          if (chronometer >= MAX_DURATION_TIMER) {
            this.stopClick = true;
            await this.stopTimer();
            await this.$nuxt.$emit(FILL_DAILY_ENTRY_EVENT);
          }
          this.timerLoading = false;
        }, 1000);
      }
    },

    async stopTimer() {
      if (!this.isTimerRunning) {
        return; // Stop the method if the timer is not running
      }
      const timer = this.getTimerData
      await this.$store.dispatch("timeattendance/stopTimer", { timer });
      this.clearChronometerInterval();
      this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
        status: false,
      });
      // this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer: 0 });
    },
    async clearChronometerInterval() {
      clearInterval(this.chronometerInterval);
      this.chronometerInterval = null;
      // this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer: 0 });
    },

    async startTimer() {
      if (this.active) return;
      await this.$store.dispatch("timeattendance/startTimer");
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
    active() {
      if (!this.chronometerInterval) {
        this.startTimerInterval();
      }
    },
    isTimerRunning(val) {
      if (!val && this.chronometerInterval) {
        this.clearChronometerInterval();
      }
    },
  },
};
