<script>
import { uniqBy } from "lodash";
import { getAdminCelebrationWidget } from "../../../utils/functions/api_call/timeattendance/time";
import BaseWidget from "./BaseWidget.vue";

export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const data = await getAdminCelebrationWidget();
      this.setData(data);
      this.setSubData(data);
      this.setAvatars(data);
    },
    setData(data) {
      const { birthdayEmployees, workAnniversaryEmployees } = data;
      const title = "Birthdays & Work Anniversaries";
      const subheading = "Whooohooo!";
      const value =
        (birthdayEmployees?.length || 0) +
        (workAnniversaryEmployees?.length || 0);
      this.data = {
        title,
        subheading,
        value,
      };
    },
    setSubData(data) {
      const { birthdayEmployees, workAnniversaryEmployees } = data;
      const birthdayLength = birthdayEmployees?.length || 0;
      const anniversaryLength = workAnniversaryEmployees?.length || 0;

      const birthdayLabel = birthdayLength <= 1 ? "Birthday" : "Birthdays";
      const anniversaryLabel =
        anniversaryLength <= 1 ? "Anniversary" : "Anniversaries";

      this.subData = [
        { title: birthdayLabel, value: birthdayLength },
        { title: anniversaryLabel, value: anniversaryLength },
      ];
    },

    setAvatars(data) {
      try {
        const { birthdayEmployees, workAnniversaryEmployees } = data;
        this.avatars = uniqBy(
          [...birthdayEmployees, ...workAnniversaryEmployees],
          "id"
        );
      } catch (error) {
        console.error("Error while setting celebration widget avatars", error);
      }
      
    },
  },
};
</script>

<style></style>
