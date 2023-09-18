<template>
</template>

<script>
import { USER_ROLES } from "../../../utils/constant/Constant";

export default {
  middleware: [
    async function({ store, redirect, route }) {
      let userRole = store.getters['token/getUserRole']
      if (!userRole) {
         const { role } = await store.dispatch("employee/setActiveUser")
         userRole = role
      }
      if (userRole == USER_ROLES.ADMIN) {
        console.log({route})
        redirect(`${route.fullPath}/employee-profile-tab`)
      }
    }
  ]
};
</script>

<style lang="scss" scoped></style>
