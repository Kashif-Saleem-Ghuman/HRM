

<script>
import BaseWidget from './BaseWidget.vue';
import { startOfDayEndOfDayRange } from '../../../utils/functions/dates';

export default {

  extends: BaseWidget,

  props: {
    startDate: {
      type: Date | String
    },
    endDate: {
      type: Date | String
    },
  },

  methods: {
    startOfDayEndOfDayRange
  },

  watch: {
    startDate() {
      this.fetchData()
    }
  }

}
</script>

<style></style>