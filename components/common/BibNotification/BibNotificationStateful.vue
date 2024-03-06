<template>
    <bib-popup-notification-wrapper>
      <template #wrapper>
        <bib-popup-notification
          v-for="(msg, index) in notifications"
          :key="index"
          :message="msg.text"
          :variant="msg.variant"
          :autohide="autohide"
          @close="onClose(index)"
          
        >
        </bib-popup-notification>
      </template>
    </bib-popup-notification-wrapper>
  </template>
  <script>
  export default {
    props: {
      autohide: {
        default: 2000,
      },
    },
    computed: {
      notifications() {
        return this.$store.state.app.notifications;
      },
    },
    data() {
      return {};
    },
    methods: {
      onClose(index) {
        if (this.notifications.length === index + 1) {
          this.$store.commit("app/RESET_NOTIFICATIONS");
        }
      },
    },
  };
  </script>