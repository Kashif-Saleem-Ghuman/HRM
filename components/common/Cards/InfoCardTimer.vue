<template>
  <div class="d-flex">
    <div class="info-card-leave-wrapper" style="width: 100%">
      <div>
        <label>Active User Status</label>
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
      class="button-wrapper button-wrapper__bgsucess cursor-pointer"
      :class="{'button-custom--disabled': disabled, 'bg-secondary-sub3': disabled}"
      @click="handleClockInOutClick"
    >
      <span>{{ buttonLable }}</span>
    </div>
    </div>
  </div>
</template>
<script>
import { calculateActivityDetails, formatTime } from '../../../utils/functions/clock_functions';
import { mapGetters } from "vuex";
import timerMixin from '../../../mixins/timer-mixin';

export default {
  mixins: [timerMixin],

  props: {
    clockModal: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
    employeeId: {
      type: Number,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fill: { gradient: ["#ffb700", "#47b801"] },
      localData: [],
      activityReport: {},
      loading: true,
      timerLoading: false,
    };
  },
  async mounted() {
    this.startTimerInterval()

    await this.$store.dispatch('timeattendance/setTimerData', this.employeeId);

    if (this.$store.state.token.isUser) {
      await this.$store.dispatch('timeattendance/setDailyTimeEntries');
    } else {
      await this.$store.dispatch('timeattendance/setEmployeeDailyTimeEntry', {
        employeeId: this.employeeId,
        date: new Date().toISOString(),
      })
    }
    this.timeEntriesLoading = false;
  },
  methods: {
    close() {
      this.clockModal = false;
    },

    async handleClockInOutClick() {
      if (this.active) {
        await this.stopTimer()
        this.$emit("timer-stop")
      } else {
        await this.startTimer();
        this.$emit("timer-stop")
      }
    }
  },
  computed: {
    ...mapGetters({
      getDailyTimeEntries: 'timeattendance/getDailyTimeEntries',
    }),
    stopWatchTime() {
      if (this.timerLoading) return '00:00:00';
      return formatTime(this.chronometer);
    },
    activityDetails() {
      return calculateActivityDetails(this.getTimerData.start, this.getDailyTimeEntries);
    },

    buttonLable() {
      if (this.$store.state.token.isUser) {
        if (this?.active) return 'Clock Out';
        else return 'Clock In';
      }
      else if (this.$store.state.token.isAdmin) {
        if (this?.active) return 'Online';
        else return 'Offline';
      }
    }
  },
};
</script>
<style lang="scss">
.items  {
  border-bottom: 1px solid #eee;
  height: 40px;
  border-right: 33px solid #fff;
}
</style>
  