<script>
import BaseWidget from "./BaseWidget.vue";
import { onLeaveEmployees } from "../../../utils/functions/api_call/on-leave-employee";
import { DateTime } from "luxon";
import { uniqBy } from "lodash";

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
      const date = DateTime.now().toJSDate().toISOString();
      const onLeave = await onLeaveEmployees({ date });
      this.setData(presentEmployees, onLeave);
      this.setSubData(presentEmployees, onLeave);
      this.setAvatars({ presentEmployees, onLeave});
    },
    setData(data, onLeave) {
      const onLeaves = onLeave;
      const title = "Attendance";
      const subheading = "Present";
      const value = (data.length || 0) + (onLeaves.length || 0);
      this.data = {
        title,
        subheading,
        value,
      };
    },
    setSubData(data = [], onLeave) {
      
      this.subData = [
        { title: "Absent", value: this.employees.length - data.length || 0 },
        { title: "On leave", value: onLeave.leaveCount || 0 },
      ];
    },

    setAvatars(data) {
      const { presentEmployees, onLeave } = data;
      this.avatars = uniqBy([...presentEmployees, ...onLeave], "id");
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
