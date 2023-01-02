<template>
    <div>
        <!-- People Page Action -->
        <div class="d-flex" v-if="peoplePageAction">
            <button-green @on-click="$emit('employee')" icon="add" variant="success" :scale="1" title="Add New Employe"
                titleClass="button-title"></button-green>
            <button-green @on-click="$emit('import')" icon="add" variant="success" :scale="1" title="Import"
                titleClass="button-title"></button-green>
        </div>
        <!-- Dashboard Page Action -->
        <div class="d-flex" v-if="dashButton">
            <button-green @on-click="$emit('dashboard')" icon="add" variant="success" :scale="1" title="Dashboard"
                titleClass="button-title"></button-green>
            <button-green @on-click="$emit('setting')" icon="add" variant="success" :scale="1" title="Setting"
                titleClass="button-title"></button-green>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActionLeft",
    props: {
        peoplePageAction: {
            type: String,
        },
        importButton: {
            type: String,
        },
        dashButton: {
            type: String,
        },
        settingButton: {
            type: String,
        },
    },
    methods: {
        employeModal() {
            alert("employe called");
        },
        employee() {
            alert("import called");
        },
    },
};
</script>

<style lang="scss">
.button-title {
    font-size: 0.8rem;
}
</style>
