<template></template>

<script>
import { TIME_ATTENDANCE_TAB } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(TIME_ATTENDANCE_TAB[0].route)
    }
  ]
}
</script>