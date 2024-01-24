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
        const employees = data?.filter(e => (e.active || e.presence === 'in' || this.hasInEntry(e.timeEntries))) || []
        this.setData(employees)
        this.setAvatars(employees)
      }
    },
    setData(employees = []) {
      const title = "Present"
      const subheading = ''
      const value = employees.length || 0
      this.data = {
        title,
        subheading,
        value
      }
    },

    setAvatars(employees = []) {
      this.avatars = employees
    },

    hasInEntry(timeEntries = []) {
      return timeEntries.some( timeEntry => timeEntry.activity === ACTIVITY_TYPE.IN && timeEntry.start && timeEntry.end)
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