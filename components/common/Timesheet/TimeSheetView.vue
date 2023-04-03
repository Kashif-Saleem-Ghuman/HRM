<template>
    <div>
        <div class="div-table">
             <div class="div-table-row">
                <div class="div-table-col">Customer ID</div>
                <div  class="div-table-col">Customer Name</div>
                <div  class="div-table-col">Customer Address</div>
                <div  class="div-table-col">Customer Name</div>
                <div  class="div-table-col">Customer Address</div>
             </div>
             <div class="div-table-row">
                  <div class="d-flex space-between">
                    <div class="div-table-col">001</div>
                <div class="div-table-col">002</div>
                  </div>
               
            </div>
            <div class="div-table-row">
                  <div class="div-table-col">001</div>
                <div class="div-table-col">002</div>
                <div class="div-table-col">003</div>
                <div class="div-table-col">004</div>
                <div class="div-table-col">005</div>
            </div>
            <div class="div-table-row">
                  <div class="div-table-col">001</div>
                <div class="div-table-col">002</div>
                <div class="div-table-col">003</div>
                <div class="div-table-col">004</div>
                <div class="div-table-col">005</div>
            </div>
      </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.div-table {
  display: table;         
  width: 100%;         
  background-color: #fff;         
  border-left: 1px solid $light;
  border-right: 1px solid $light;         
  border-spacing: 0px; /* cellspacing:poor IE support for  this */
}
.div-table-row {
  display: table-row;  
  width: 100%;   
}
.div-table-col {
  float: left; /* fix for  buggy browsers */
  display: table-column;                  
  background-color: #fff;
  width: calc(100% / 6);  
  padding: 10px;
  border: 1px solid $light;
}
</style>