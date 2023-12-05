<template>
</template>

<script>
export default {
  middleware: [
    async function({ redirect, route }) {
      redirect(`${route.fullPath}/employee-profile-tab`)
    }
  ]
};
</script>

<style lang="scss" scoped></style>
