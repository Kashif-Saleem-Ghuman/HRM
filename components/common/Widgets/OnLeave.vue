<script>
import BaseWidget from "./BaseWidget.vue";
export default {
  extends: BaseWidget,

  computed: {
    employeesAttendance() {
      return this.$store.state.timeattendance.employeesAttendance;
    },
  },
  methods: {
    async fetchData() {
      const data = this.employeesAttendance;
      if (data) {
        const employees =
          data?.filter((employee) => employee.isOnLeave()) || [];
        this.setData(employees);
        this.setAvatars(employees);
      }
    },
    setData(employees = []) {
      const title = "On Leave";
      const subheading = "Taking Time Off";
      const value = employees.length || 0;
      this.data = {
        title,
        subheading,
        value,
      };
    },

    setAvatars(employees = []) {
      this.avatars = employees;
      
    },
  },

  watch: {
    employeesAttendance() {
      this.fetchData();
    },
  },
};
</script>

<style></style>
