<template>
  <div class="button-override">
    <bib-button
      :label="$getAttendanceLabelName($getOnlineOfflineStatus(attendanceStatusData))"
      :variant="
        $getAttendanceStatusVariantName($getOnlineOfflineStatus(attendanceStatusData))
      "
      :icon-right="
        $getAttendanceLeaveStatusIconName($getOnlineOfflineStatus(attendanceStatusData))
      "
      :style="minWidth"
      style="cursor: default;"
      pill
      class="button-override"
    ></bib-button>
  </div>
</template>

<script>
export default {
  props: {
    attendanceStatusData: {
      type: Object,
      default: "",
    },
    minWidth:{
      type:String,
      default:'min-width: 115px !important;'
    }
  },
  data() {
    return {};
  },
};
</script>
