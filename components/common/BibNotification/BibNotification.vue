<template>
  <bib-popup-notification-wrapper>
    <template #wrapper>
      <bib-popup-notification
        v-for="(msg, index) in popupMessages"
        :key="index"
        :message="msg.text"
        :variant="msg.variant"
        :autohide="autohide"
      >
      </bib-popup-notification>
    </template>
  </bib-popup-notification-wrapper>
</template>
<script>
export default {
  props: {
    popupMessages: {
      type: Array,
    },
    autohide: {
      default: 2000
    }
  },
  data() {
    return {};
  },
  methods: {
    // openPopupNotification,
  },
};
</script>
