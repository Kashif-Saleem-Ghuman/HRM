<template>
    <div class="d-flex justify-between">
      <div class="px-05 py-05">
        <bib-button 
          :label="primaryButton.label" 
          :variant="primaryButton.variant" 
          :class="primaryButton.class"
          :icon="primaryButton.icon"
          @click="primaryButton.onClick"
        ></bib-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      primaryButton: {
        type: Object,
        default: () => ({
          variant: "primary",
          icon:"add",
          onClick: () => {},
        }),
      },
    },
  };
  </script>
    