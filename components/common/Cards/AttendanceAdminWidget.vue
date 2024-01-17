<script>
import { getAdminAttendanceWidget } from '../../../utils/functions/api_call/widgets';
import BaseWidget from './BaseWidget.vue';
export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const data = await getAdminAttendanceWidget().then((result) =>{
        this.setData(result)
      this.setSubData(result)
      })
      
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