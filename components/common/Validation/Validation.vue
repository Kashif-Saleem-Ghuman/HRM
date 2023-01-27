<template>
    <div>
        <small class="text-danger mb-05 validation" style="margin-top:-0.5rem; display:block;">{{data}}</small>
    </div>
  </template>
  
  <script>
  export default {
    name: "Validation",
    props: {
    data: {
      type: String,
    },
},
    data() {
      return {
       
      };
    },
    
  };
  </script>
  <style lang="scss">
.validation{
  font-size: 11px;;
}
</style>
  