<template>
  <div class="button-override">
    <bib-button
      :label="$getAttendanceLabelName($getAttendanceStatus(attendanceStatusData))"
      :variant="
        $getAttendanceStatusVariantName($getAttendanceStatus(attendanceStatusData))
      "
      :icon-right="
        $getAttendanceLeaveStatusIconName($getAttendanceStatus(attendanceStatusData))
      "
      :style="minWidth"
      pill
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
