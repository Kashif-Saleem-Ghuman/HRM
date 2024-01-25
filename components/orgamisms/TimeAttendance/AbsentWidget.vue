<script>
import { ACTIVITY_TYPE } from '../../../utils/constant/Constant';
import BaseWidget from '../../common/Cards/BaseWidget.vue';
export default {
  extends: BaseWidget,

  computed: {
    employeesAttendance() {
      return this.$store.state.timeattendance.employeesAttendance
    }
  },
  methods: {
    async fetchData() {
      const data = this.employeesAttendance
      if (data) {
        const employees = data?.filter(e => ((!e.active || !e.presence == 'out') && !e.timeEntries.some( timeEntry => timeEntry.activity === ACTIVITY_TYPE.IN))) || []
        this.setData(employees)
        this.setAvatars(employees)
      }
    },
    setData(data = []) {
      const title = "Absent"
      const subheading = ''
      const value = data.length || 0
      this.data = {
        title,
        subheading,
        value
      }
    },

    setAvatars(data = []) {
      this.avatars = data
    }
  },

  watch: {
    employeesAttendance() {
      this.fetchData()
    }
  }
}
</script>

<style></style>