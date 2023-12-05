<template>
</template>

<script>
import { LEAVEVACATION_TAB } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(LEAVEVACATION_TAB[0].route)
    }
  ]
}
</script>