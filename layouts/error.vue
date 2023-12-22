<template>
    <div class="nuxt-error">
        <component :is="errorPage" :error="error" />
    </div>
</template>

<script>
export default {
    name: 'nuxt-error',
    layout: 'default', // optional
    props: {
        error: {
            type: Object,
            default: () => { },
        },
    },
    computed: {
        errorPage() {
            if (this.error.statusCode === 404 || this.error.statusCode == 503 || this.error.statusCode == 500) {
                this.$router.push('/not-found')
                return;
            }
            // return error500;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>