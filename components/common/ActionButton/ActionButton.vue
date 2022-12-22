<template>
    <div class="d-flex justify-between py-05 px-075 bottom_border_wrapper">
        <action-left icon="add"  @employee="employe"  variant="success" scale="1.1" title="Add New Employe" titleClass="button-title"></action-left>
        <action-right icon="add" variant="success" scale="1.1"  title="Import" titleClass="button-title"></action-right>
    </div>
</template>
<script>
export default {
    name: 'ActionButton',
    methods:{
        employe(){
        alert("employe called")
      }
    }  
}
</script>

<style lang="scss">
.button-title{
    font-size: 0.8rem;
}
</style>