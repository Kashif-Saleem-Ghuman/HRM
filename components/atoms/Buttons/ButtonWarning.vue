<template>
    <div class="d-flex gap-1 bg-pink">
       <div class="d-flex align-center cursor-pointer" @click="$emit('on-click')">
         <bib-icon v-if="icon" :icon="icon" :variant="variant" :scale="scale" :class="className"></bib-icon> <span :class="titleClass" class="pl-025">{{title}}</span>
       </div>
     </div>
 </template>
 <script>
 export default {
     name: 'ButtonWarnning',  
   props: {
     title: {
       type: String,
     },
     icon: {
       type: String,
     },
     scale: {
       type: Number,
     },
     variant: {
       type: String,
     },
     className: {
       type: String,
     },
     titleClass: {
       type: String,
     },
   },
   data() {
     return {
     }
   },
   
 }
 </script>
<style lang="scss">
.bg-pink{
  background-color: #F3CED0;
  padding: 4px 12px 3px 8px;
  border-radius: 4px;
  font-size: 14px;
  color: #E6000E;
  svg{
    fill:#E6000E !important;
    color:#E6000E !important;
  }
  &:hover{
    background-color: #f1bec0;
    // padding: 4px 12px 3px 8px;
  }
}
</style>