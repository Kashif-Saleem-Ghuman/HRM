<script>
import { getAdminAttendanceWidget } from '../../../utils/functions/api_call/widgets';
import BaseWidget from './BaseWidget.vue';
export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const data = await getAdminAttendanceWidget()
      this.setData(data)
      this.setSubData(data)
    },
    setData(data) {
      const { attendances } = data
      const title = "Attendance"
      const subheading = 'Present'
      const value = attendances || 0
      this.data = {
        title,
        subheading,
        value
      }
    },
    setSubData(data) {
      const { absences } = data
      this.subData = [
        { title: "Absent", value: absences || 0 }
      ]
    },
  }
}
</script>

<style></style>