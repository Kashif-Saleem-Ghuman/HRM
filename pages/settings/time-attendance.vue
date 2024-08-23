<template>
  <div class="setting-wrapper py-1 mt-1 px-1 mx-1 w-50 shape-rounded">
    <timesheet-setting :timesheetSetting="timesheetSettings" :organizationId="organizationId" />
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import {getTimesheetSetting} from "@/utils/functions/api_call/admin-setting";
import {FETCH_TIMESHEET_SETTING} from "@/utils/constant/Constant";

export default {
  data() {
    return {
      timesheetSettings: null,
    }
  },
  computed: {
    ...mapGetters({
      organizationId: "organizations/organizationId",
    })
  },

  mounted() {
    this.registerRootListener();
    this.fetchSettingsDetail();
  },
  methods: {
    async fetchSettingsDetail() {
      this.timesheetSettings = await getTimesheetSetting(this.organizationId);
    },
    registerTimesheetSettingListener() {
      this.$root.$on(FETCH_TIMESHEET_SETTING, () => {
        this.fetchSettingsDetail();
      });
    },
    unregisterTimesheetSettingListener() {
      this.$root.$off(FETCH_TIMESHEET_SETTING);
    },
    registerRootListener() {
      this.registerTimesheetSettingListener();
    },
    unregisterRootListener() {
      this.unregisterTimesheetSettingListener()
    },
  },
  beforeDestroy() {
    this.unregisterRootListener();
  },
};
</script>

<style lang="scss">
.setting-wrapper{
.detail-collapse__header {
  position: relative;
  display: flex;
  align-items: center;
}

.detail-collapse__header__title {
  position: relative;
  z-index: 1;
  margin-left:-10px;
  color:$black !important;
}

.icon {
  position: absolute;
  right: 13px;
  z-index: 0;
}
}
.detail-collapse__content {
  label {
    color: #85858f !important;
  }
}
.select_container {
  select {
    border: 1px $gray4 solid !important;
  }
}
.helper-text {
  margin-bottom: 1rem;
  color: $gray1;
}

.input-field > .wrapper > input {
  border: 1px solid var(--bib-gray4) !important;
}
</style>
