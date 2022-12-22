<template>
    <bib-popup-notification-wrapper>
      <template #wrapper>
        <bib-popup-notification v-for="(msg, index) in popupMessages" :key="index" :message="msg.text"
          :variant="msg.variant">
        </bib-popup-notification>
      </template>
    </bib-popup-notification-wrapper>
</template>
<script>
 import {openPopupNotification} from '../../../utils/functions/functions_lib.js'
export default {
  props: {
    popupMessages: {
      type: Array,
    },
  },
  data() {
    return {
    }
  },
  methods: {
    openPopupNotification
  }
}
</script>