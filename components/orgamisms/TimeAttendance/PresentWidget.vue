<script>
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
      this.loading = true
      const data = this.employeesAttendance
      if (data) {
        this.setData(data)
        this.setAvatars(data)
        this.loading = false
      }
    },
    setData(data = []) {
      const title = "Attendance"
      const subheading = 'Present'
      const value = data?.filter(e => (e.active || e.presence === 'in')).length || 0
      this.data = {
        title,
        subheading,
        value
      }
    },

    setAvatars(data = []) {
      this.avatars = data?.filter(e => (e.active || e.presence === 'in')) || []
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