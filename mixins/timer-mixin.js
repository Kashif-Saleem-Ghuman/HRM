import { mapGetters } from "vuex";

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
        this.chronometerInterval = setInterval(() => {
          this.time = new Date().toTimeString().split(" ")[0];
          this.date = new Date().toDateString();
          const chronometer = !this.getTimerData.start
            ? 0
            : Math.floor(
                (new Date().getTime() -
                  new Date(this.getTimerData.start).getTime()) /
                  1000
              );

          this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer });
          this.timerLoading = false;
        }, 1000);
      }
    },

    async stopTimer() {
      await this.$store.dispatch("timeattendance/stopTimer");
      this.clearChronometerInterval();
      this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
        status: false,
      });
      this.$store.commit("timeattendance/SET_CHRONOMETER", { chronometer: 0 });
    },

    async clearChronometerInterval() {
      clearInterval(this.chronometerInterval);
      this.chronometerInterval = null;
    },

    async startTimer() {
      if (this.active) return;
      await this.$store.dispatch("timeattendance/startTimer");
    },
  },

  beforeDestroy() {
    if (this.chronometerInterval) {
      this.$store.commit("timeattendance/SET_IS_TIMER_RUNNING", {
        status: false,
      });
      this.clearChronometerInterval()
    }
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
