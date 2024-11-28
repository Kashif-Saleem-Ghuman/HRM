<template>
    <div class="details-main-wrapper">
      <label>Logs</label>
      <div v-for="dateLog in dateWiseLogs" :key="dateLog.date">
        <bib-detail-collapse
          :label="dateLog.date"
          open
          :variant="isLightThemeCheck ? 'dark' : 'light'"
        >
          <template v-slot:content>
            <div class="log-list">
              <div
                v-for="log in dateLog.logs"
                :key="log.id"
                class="log-item"
              >
                <span>Time: {{ log.time }}</span>
                <span><strong>Name:</strong> {{ log.name }}</span>
                <span>Action: {{ log.action }}</span>
                <span>Object: {{ log.object }}</span>
              </div>
            </div>
          </template>
        </bib-detail-collapse>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        dateWiseLogs: [
          {
            date: "Nov 27, 2024",
            logs: [
              {
                id: 1,
                time: "9:00 AM",
                name: "John Doe",
                action: "added",
                object: "a new task",
              },
              {
                id: 2,
                time: "10:30 AM",
                name: "Jane Smith",
                action: "updated",
                object: "the project details",
              },
            ],
          },
          {
            date: "Nov 26, 2024",
            logs: [
              {
                id: 3,
                time: "3:45 PM",
                name: "Alice Johnson",
                action: "deleted",
                object: "a user account",
              },
            ],
          },
          {
            date: "Nov 25, 2024",
            logs: [
              {
                id: 4,
                time: "11:15 AM",
                name: "Mark Lee",
                action: "viewed",
                object: "the activity logs",
              },
              {
                id: 5,
                time: "4:20 PM",
                name: "Sophia Brown",
                action: "created",
                object: "a new report",
              },
            ],
          },
        ],
      };
    },
  };
  </script>
  
  <style lang="scss">
  .log-list {
    padding: 0 2rem;
    span{
        font-size: 12px !important;
    }
}
  </style>
  