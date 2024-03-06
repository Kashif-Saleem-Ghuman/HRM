<template>
  <div class="w-100">
    <label class="text-gray6 font-w-600 font-md">Daily summary</label>
    <bib-input v-model="summaryText" class="w-100" type="textarea" :disabled="disabled"></bib-input>
    <div class="d-flex justify-end align-center">
      <!-- <label class="px-05 font-md text-dark">Submit timesheet:</label> -->
      <bib-button v-if="!disabled" label="Submit" variant="primary" @click="onSubmit"></bib-button>
    </div>
  </div>
</template>

<script>
import {
  createSummary,
  updateSummary,
} from "../../../../utils/functions/api_call/summaries";

export default {
  props: {
    date: {
      type: String,
      required: true,
    },

    disabled: {
      type: Boolean,
      default: false
    },

    summary: {
      type: Object | null,
    },
  },

  data() {
    return {
      summaryText: "",
    };
  },

  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification })
    },
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
      const summary = await createSummary({ text, date });
      if (summary) {
        this.$emit('update')
        this.openPopupNotification({
          text: "Summary successfully added",
          variant: "primary",
        });
      } else {
        this.openPopupNotification({
          text: "Error while submitting summary",
          variant: "danger",
        });
      }
    },
    async updateSummary() {
      const { date, summary } = this;
      const text = this.summaryText;
      const updatedSummary = await updateSummary({ text, date, id: summary.id });
      if (updatedSummary) {
        this.$emit('update')
        this.openPopupNotification({
          text: "Summary successfully updated",
          variant: "primary",
        });
      } else {
        this.openPopupNotification({
          text: "Error while submitting summary",
          variant: "danger",
        });
      }

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
