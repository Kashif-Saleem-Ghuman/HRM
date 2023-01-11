<template>
    <button type="button" @click="$emit('on-click')" class="cursor-pointer bg-gray3 shape-circle icon-size d-flex justify-center align-center border-0" :class="icon_bg">
      <bib-icon :icon="icon" :scale="scale" :variant="variant"></bib-icon>
    </button>
 </template>
 <script>
 export default {
     name: 'ButtonCircle',  
   props: {
     icon: {
       type: String,
     },
     scale: {
       type: Number,
     },
     variant: {
       type: String,
     },
     icon_bg:{
      type:String
     },
     
   },
 }
 </script>
 <style lang="scss">
 .border-0{
  border:0;
 }
 .icon-size{
  height:2.1rem;
  width:2.1rem
 }
</style>