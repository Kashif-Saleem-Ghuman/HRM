<template>
</template>

<script>
import { LEAVEVACATION_TAB, USER_ROLES } from '../../utils/constant/Constant';
export default {
  middleware: [
    async function({ store, redirect }) {
      let userRole = store.getters['token/getUserRole']
      if (!userRole) {
         const { role } = await store.dispatch("employee/setActiveUser")
         userRole = role
      }
      if ( userRole == USER_ROLES.ADMIN) {
        redirect(LEAVEVACATION_TAB[0].route)
      }
    }
  ]
}
</script>