<template></template>

<script>
import { DOWNLOAD_REPORT_TAB } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(DOWNLOAD_REPORT_TAB[0].route)
    }
  ]
}
</script>