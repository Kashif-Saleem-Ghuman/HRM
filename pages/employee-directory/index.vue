<template></template>

<script>
import { EMPLOYEE_DIRECTORY } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(EMPLOYEE_DIRECTORY[0].route)
    }
  ]
}
</script>