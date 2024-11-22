<template></template>

<script>
import { PAY_TAB } from '../../utils/constant/pay/PayConstant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(PAY_TAB[0].route)
    }
  ]
}
</script>