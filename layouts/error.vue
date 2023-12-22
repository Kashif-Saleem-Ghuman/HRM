<template>
    <div class="nuxt-error">
        <component :is="errorPage" :error="error" />
    </div>
</template>

<script>
import notFound from '../components/common/notfound/index.vue';
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
                return notFound;
            }
            // return error500;
        }
    },
}
</script>

<style lang="scss" scoped>

</style>