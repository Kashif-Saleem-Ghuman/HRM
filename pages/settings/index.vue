<template>
</template>

<script>
import { SETTINGS_TAB } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ redirect }) {
      redirect(SETTINGS_TAB[0].route)
    }
  ]
}
</script>