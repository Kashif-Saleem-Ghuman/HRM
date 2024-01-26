<script>
import BaseWidget from "./BaseWidget.vue";

export default {
  extends: BaseWidget,
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async fetchData() {
      const presentEmployees = this.employees?.filter((employee) =>
        employee.isPresent()
      );
      this.setData(presentEmployees);
      this.setSubData(presentEmployees);
    },
    setData(data = []) {
      const title = "Attendance";
      const subheading = "Present";
      const value = data.length || 0;
      this.data = {
        title,
        subheading,
        value,
      };
    },
    setSubData(data = []) {
      this.subData = [
        { title: "Absent", value: this.employees.length - data.length || 0 },
      ];
    },
  },

  watch: {
    employees() {
      this.fetchData();
    },
  },
};
</script>

<style></style>