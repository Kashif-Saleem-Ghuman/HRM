<template>
    <div class="d-flex">
        <button-green showGreenButton="true" @on-click="employeModal" icon="add" variant="success" scale="1" title="Add New Employe" titleClass="button-title"></button-green>
        <button-green showGreenButton="true" @on-click="importModal" icon="add" variant="success" scale="1"  title="Import" titleClass="button-title"></button-green>
    </div>
</template>

<script>
export default {
    name: 'ActionLeft', 
    props:{},
    methods:{
        employeModal(){
        alert("employe called")
      },
      importModal(){
        alert("import called")
      }
    }   
}
</script>

<style lang="scss">
.button-title{
    font-size: 0.8rem;
}
</style>