<template>
  <div class="w-100">
    <label class="text-gray6 font-w-600 font-md">Daily summary</label>
    <!-- <bib-input v-model="summaryText" class="w-100" type="textarea" :disabled="disabled" @input="resize()" ref="textarea"></bib-input> -->
    <div class="w-100 input-cus">
      <textarea
        v-model="summaryText"
        class="w-100"
        :style="{ height: textareaHeight }"
        type="textarea"
        :disabled="disabled"
        @input="resizeTextarea()"
        ref="textarea"
      ></textarea>
    </div>
    <div class="d-flex justify-end align-center">
      <!-- <label class="px-05 font-md text-dark">Submit timesheet:</label> -->
      <bib-button
        v-if="!disabled"
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

    disabled: {
      type: Boolean,
      default: false,
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
  computed: {
    textareaHeight() {
      const lineHeight = 1.1;
      const numLines = Math.max(this.summaryText.split("\n").length, 1);
      return `${numLines * lineHeight }rem`;
    },
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    resizeTextarea() {
      {
        const textarea = this.$refs.textarea;
        textarea.style.minHeight = "130px"; 
        textarea.style.maxHeight = "280px"; 
        textarea.style.height = textarea.scrollHeight + "px";
      }
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
        this.$emit("update");
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
      const updatedSummary = await updateSummary({
        text,
        date,
        id: summary.id,
      });
      if (updatedSummary) {
        this.$emit("update");
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
    this.resizeTextarea();
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

<style lang="scss">
.input-cus {
  position: relative;
  width: 100%;

  input,
  textarea,
  select {
    padding: 0rem 0.5rem 0rem 0.5rem;
    font-size: $base-size;
    line-height: 1.2;
    width: 100%;
    border: 1px solid $gray4;
    border-radius: 0.2rem;
    margin: 0.5rem 0;
    color: $dark;
    min-height: 2.5rem;
    outline: none;

    &:hover {
      border-color: $gray5;
      border: 1.5px solid $gray6;
    }
  }
  select {
    height: calc(1.5em + 0.75rem + 2px);
    background-color: $white;
  }

  textarea {
    resize: none;
    width: 100%;
    height: auto;
    border: 1px solid $gray4;
    padding: 0.5em 0.5rem;
    border-radius: 0.25rem;
    font-size: $base-size;

    &:focus {
      outline: none;
    }
  }
}
</style>
