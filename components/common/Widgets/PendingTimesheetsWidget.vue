<script>
import { getAdminTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time';
import { weekToUTCWeek } from "../../../utils/functions/dates"

import BaseTimesheetWidget from './BaseTimesheetWidget.vue';
export default {
  extends: BaseTimesheetWidget,

  methods: {
    async fetchData() {
      const { startDate, endDate } = this
      if (!startDate && !endDate) return
      
      const { from, to } = await weekToUTCWeek({
        from: new Date(startDate),
        to: new Date(endDate),
      });
      
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