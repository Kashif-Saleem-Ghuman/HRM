<script>
import { uniqBy } from "lodash";
import { getAdminCelebrationWidget } from '../../../utils/functions/api_call/timeattendance/time';
import BaseWidget from './BaseWidget.vue';

export default {
  extends: BaseWidget,
  methods: {
    async fetchData() {
      const data = await getAdminCelebrationWidget()
      this.setData(data)
      this.setSubData(data)
      this.setAvatars(data)
    },
    setData(data) {
      const { birthdayEmployees, workAnniversaryEmployees } = data
      const title = "Birthdays & Work Anniversaries"
      const subheading = 'Whooohooo!'
      const value = (birthdayEmployees?.length || 0) + (workAnniversaryEmployees?.length || 0)
      this.data = {
        title,
        subheading,
        value
      }
    },
    setSubData(data) {
      const { birthdayEmployees, workAnniversaryEmployees } = data
      this.subData = [
        { title: "Birthdays", value: birthdayEmployees?.length || 0 },
        { title: "Anniversaries", value: workAnniversaryEmployees?.length || 0 }
      ]
    },

    setAvatars(data) {
      const { birthdayEmployees, workAnniversaryEmployees } = data
      this.avatars = uniqBy([...birthdayEmployees, ...workAnniversaryEmployees], 'id')
    }
  }
}
</script>

<style></style>