<template>
    <div class="custom-input">
        <bib-input :type="type" v-model="vmodel" :placeholder="placeholder" :label="label" :options="options"></bib-input>
    </div>
    </div>
</template>

<script>
export default {
    name: 'CustomInput',
    props:{
        type: {
            type:String
        },
        label: {
            type:String
        },
        placeholder: {
            type:String
        },
        vmodel: {
            type:String
        },
        options:{
            type:Array
        }
    }
}
</script>

<style lang="scss">
//form Items
$input-label-color: #85858F;
$input-label-size: 13px;
$input-bg-color: #F8F8F9;
$input-placeholder-color: #B1B1B4;
$input-border-color: #E8E8EB;
$input-borderradius: 4px;
$validation-star-color:#FA0F00;

.custom-input {
    input {
        background-color: $input-bg-color;
        border: 1px solid $input-border-color;
        // border-radius:$input-borderradius;
    }
    select {
        background-color: $input-bg-color !important;
        border: 1px solid $input-border-color;
        // border-radius:$input-borderradius;
    }
    label {
        font-size: $input-label-size;
        color: $input-label-color;
        font-weight: 600;
    }
}
</style>