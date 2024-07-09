<!-- ActivityDetails.vue -->
<template>
    <div class="activity-wrapper">
      <div
        v-for="(value, key) in activityDetails"
        :key="key"
        class="activity-item gap-1"
      >
        <div class="activity-items">
          <label>{{ formatLabel(key) }}</label>
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ActivityDetails',
    props: {
      activityDetails: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatLabel(key) {
        // Customize label formatting if needed
        const labelMap = {
          in: 'In',
          out: 'Out',
          breaks: 'Break',
          overtime: 'Overtime',
          total: 'Total'
        };
        return labelMap[key] || key.charAt(0).toUpperCase() + key.slice(1);
      }
    }
  }
  </script>
  
  <style scoped>
  .activity-wrapper {
    padding-top: 0.5rem;
  }
  .activity-item {
    padding-top: 8px;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
  }
  .activity-items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    height: 35px;
    align-items: center;
  }
  .activity-items label {
    color: var(--bib-text-secondary);
    font-size: 12px !important;
    padding-right: 10px;
    font-weight: 500;
  }
  .activity-items span {
    font-weight: 500;
    font-size: 12px;
  }
  </style>
  