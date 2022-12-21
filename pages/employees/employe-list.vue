<template>
  <div>
    <h2 class="p-0">Employees</h2>
    <bib-tabs :tabs="appWrapItems.bibTabs" :value="activeTab" @change="handleChange_Tabs"></bib-tabs>
    <div class="p-1">
      <div v-if="activeTab == appWrapItems.bibTabs[0].value">
        Overview content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[1].value">
        Team content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[2].value">
        Tasks content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[3].value">
        Profile content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[4].value">
        Disabled content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[5].value">
        Disabled content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[6].value">
        Disabled content
      </div>
      <div v-if="activeTab == appWrapItems.bibTabs[7].value">
        Disabled content
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>
  
<script>
import getJson from "../../utils/dataJson/app_wrap_data.js";
const appWrapItems = getJson();
import { openPopupNotification } from "../../utils/functions/functions_lib.js";
export default {
  data() {
    return {
      popupNotificationMsgs: appWrapItems.popupNotificationMsgs,
      popupMessages: [],
      activeTab: appWrapItems.bibTabs[0].value,
      appWrapItems: appWrapItems,
    };
  },
  mounted() {
    this.loading = true;
    this.openPopupNotification(1);
  },
  methods: {
    openPopupNotification,
    handleChange_Tabs(tab) {
      this.activeTab = tab.value
    }
  },
};
</script>
  