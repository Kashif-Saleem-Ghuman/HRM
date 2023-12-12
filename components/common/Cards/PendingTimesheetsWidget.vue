<script>
import { getAdminTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time';
import BaseTimesheetWidget from './BaseTimesheetWidget.vue';
export default {
  extends: BaseTimesheetWidget,

  methods: {
    async fetchData() {
      const { startDate, endDate } = this
      if (!startDate && !endDate) return

      const { from, to } = this.startOfDayEndOfDayRange({ startDate, endDate })
      const data = await getAdminTimesheetWidget({ from, to })
      const title = "Pending timesheets"
      const subheading = 'Missing in action'
      const value = data.pending
      this.data = {
        title,
        subheading,
        value
      }
    }
  },
}
</script>

<style></style>