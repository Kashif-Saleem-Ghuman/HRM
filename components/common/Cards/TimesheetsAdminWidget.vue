<script>
import { getAdminTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time';
import BaseWidget from './BaseWidget.vue';
import { DateTime } from 'luxon';
export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const from = DateTime.now().minus({ months: 3 }).toJSDate()
      const to = DateTime.now().toJSDate()
      const data = await getAdminTimesheetWidget({ from, to })
      this.setData(data)
      this.setSubData(data)
    },
    setData(data) {
      const { pastDue } = data
      const title = "Timesheets"
      const subheading = 'Past Due'
      const value = pastDue || 0
      this.data = {
        title,
        subheading,
        value
      }
    },
    setSubData(data) {
      const { pending, rejected } = data
      this.subData = [
        { title: "Pending", value: pending || 0 },
        { title: "Rejected", value: rejected || 0 }
      ]
    },
  }
}
</script>

<style></style>