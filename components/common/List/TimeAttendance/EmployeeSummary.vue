<template>
  <div class="w-100">
    <label>Daily summary</label>
    <bib-input v-model="summaryText" class="w-100" type="textarea"></bib-input>
    <div class="d-flex justify-end">
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
    },
    async updateSummary() {
      const { date, summary } = this;
      const text = this.summaryText;
      await updateSummary({ text, date, id: summary.id });
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