<script>
import { getAdminTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time';
import BaseWidget from './BaseWidget.vue';

export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const data = await getAdminTimesheetWidget()
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
      const { pending, refused } = data
      this.subData = [
        { title: "Pending", value: pending || 0 },
        { title: "Refused", value: refused || 0 }
      ]
    },
  }
}
</script>

<style></style>