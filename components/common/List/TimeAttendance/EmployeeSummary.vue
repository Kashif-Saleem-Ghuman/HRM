<template>
  <div class="w-100">
    <label class="text-gray6 font-w-600 font-md">Daily summary</label>
    <bib-input v-model="summaryText" class="w-100" type="textarea"></bib-input>
    <div class="d-flex justify-end align-center">
      <label class="px-05 font-md text-dark">Submit timesheet:</label>
      <bib-button
        label="Submit"
        variant="primary"
        @click="onSubmit"
      ></bib-button>
    </div>
  </div>
</template>

<script>
import {
  createSummary,
  updateSummary,
} from "../../../../utils/functions/api_call/summaries";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";

export default {
  props: {
    date: {
      type: String,
      required: true,
    },

    // employeeId: {
    //   type: String,
    //   required: true
    // },

    summary: {
      type: Object | null,
    },
  },

  data() {
    return {
      summaryText: "",
      popupMessages: [],
    };
  },

  methods: {
    async onSubmit() {
      if (this.summary?.id) {
        this.updateSummary();
      } else {
        this.createSummary();
      }
    },

    async createSummary() {
      const { date } = this;
      const text = this.summaryText;
      await createSummary({ text, date });
      this.openPopupNotification({
        text: "The Summary has been added",
        variant: "danger",
      });
    },
    async updateSummary() {
      const { date, summary } = this;
      const text = this.summaryText;
      await updateSummary({ text, date, id: summary.id });
      this.openPopupNotification({
        text: "The Summary has been updated",
        variant: "danger",
      });
    },

    setSummaryText() {
      if (this.summary?.id) {
        this.summaryText = this.summary.text;
      } else {
        this.summaryText = "";
      }
    },
  },

  mounted() {
    this.setSummaryText();
  },

  watch: {
    summary: {
      deep: true,
      handler: function () {
        console.log("summary changed");
        this.setSummaryText();
      },
    },
  },
};
</script>

<style></style>
