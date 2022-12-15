<template>
  <div>
    <h1>
      <bib-icon icon="nodes" variant="success" :scale="2"></bib-icon> Welcome to HRM App
    </h1>
    <p>Content Goes Here</p>
    <p>
      <modal-wrapper></modal-wrapper>
    </p>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>

<script>
import getJson from "../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
import { openPopupNotification } from "../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
    };
  },
  mounted() {
    this.loading = true;
    this.openPopupNotification(0);
  },
  methods: {
    openPopupNotification,
  },
};
</script>
