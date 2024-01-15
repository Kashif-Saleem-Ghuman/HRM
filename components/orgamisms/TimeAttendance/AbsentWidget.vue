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
      const data = this.employeesAttendance
      if (data) {
        this.setData(data)
        this.setAvatars(data)
      }
    },
    setData(data = []) {
      const title = "Absences"
      const subheading = 'Missing in action'
      const value = data?.filter(e => (!e.active)).length || 0
      this.data = {
        title,
        subheading,
        value
      }
    },

    setAvatars(data = []) {
      this.avatars = data?.filter(e => (!e.active)) || []
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