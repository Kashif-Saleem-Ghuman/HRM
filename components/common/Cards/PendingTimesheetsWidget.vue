<script>
import BaseWidget from './BaseWidget.vue';
import { getAdminTimesheetWidget } from '../../../utils/functions/api_call/timeattendance/time';

export default {
  extends: BaseWidget,

  methods: {
    async fetchData() {
      const data = await getAdminTimesheetWidget()
      const title = "Pending timesheets"
      const subheading = 'Missing in action'
      const value  = data.pending
      this.data = {
        title,
        subheading,
        value
      }
    }
  }
}
</script>

<style>

</style>