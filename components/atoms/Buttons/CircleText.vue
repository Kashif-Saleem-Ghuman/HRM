<template>
    <div class="shape-circle width-3 height-3 d-flex justify-center align-center" :class="className">
    {{title}}
</div>
 </template>
 <script>
import { title } from 'process';

 export default {
     name: 'CircleText',  
   props: {
    title: {
       type: String,
     },
     className: {
       type: String,
       default:"",
     },
     variant: {
       type: String,
     },
   },
 }
 </script>