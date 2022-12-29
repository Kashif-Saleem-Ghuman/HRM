<template>
    <button v-if="showWhite" type="button" @click="$emit('on-click')" class="cursor-pointer shape-circle bg-white width-2 height-2  d-flex justify-center align-center border-white">
      <bib-icon :icon="icon" :scale="scale" :variant="variant"></bib-icon>
    </button>
    <button v-else="showLight" type="button" @click="$emit('on-click')" class="cursor-pointer shape-circle bg-secondary-sub3 width-2 height-2  d-flex justify-center align-center border-white">
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
     showLight:{
      type:String
     },
     showWhite:{
      type:String
     }
   },
 }
 </script>