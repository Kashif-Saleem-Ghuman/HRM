<script>
import BaseWidget from "../../common/Cards/BaseWidget.vue";
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
          data?.filter((employee) => employee.isPresent()) || [];
        this.setData(employees);
        this.setAvatars(employees);
      }
    },
    setData(employees = []) {
      const title = "Present";
      const subheading = "";
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