<template>
  <client-only>
    <div class="w-100">
      <div class="text-gray6 font-w-600 font-md pb-05">Daily summary</div>
      <div class="editor-wrapper">
        <div v-if="editor">
          <div class="toolbar">
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('bold') }"
              @click="editor.chain().focus().toggleBold().run()"
            >
              <fa :icon="faBold"></fa>
            </div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('italic') }"
              @click="editor.chain().focus().toggleItalic().run()"
            >
              <fa :icon="faItalic"></fa>
            </div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('underline') }"
              @click="editor.chain().focus().toggleUnderline().run()"
            >
              <fa :icon="faUnderline"></fa>
            </div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('strike') }"
              @click="editor.chain().focus().toggleStrike().run()"
            >
              <fa :icon="faStrikethrough"></fa>
            </div>
            <div class="toolbar-separator"></div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('link') }"
              @click="toggleLink"
            >
              <fa :icon="faLink"></fa>
            </div>
            <div class="toolbar-separator"></div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('bulletList') }"
              @click="editor.chain().focus().toggleBulletList().run()"
            >
              <fa :icon="faListUl"></fa>
            </div>
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive('orderedList') }"
              @click="editor.chain().focus().toggleOrderedList().run()"
            >
              <fa :icon="faListOl"></fa>
            </div>
          </div>
        </div>
        <div class="editor-container">
          <div>
            <editor-content
              :editor="editor"
              class="p-05"
              :editable="editable"
            />
          </div>
        </div>
        
      </div>
      <div class="d-flex justify-end align-center pt-05">
          <bib-button
            v-if="!disabled"
            label="Submit"
            variant="primary"
            @click="onSubmit"
          ></bib-button>
        </div>
    </div>
  </client-only>
</template>

<script>
import {
  createSummary,
  updateSummary,
} from "../../../../utils/functions/api_call/summaries";
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  faGrin,
  faPaperPlane,
  faPaperclip,
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faListUl,
  faListOl,
  faLink,
  faCode,
  faCodeBranch,
  faFile,
  faTimes,
  faAddressCard,
  faMicrophone,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

export default {
  components: {
    EditorContent,
    fa: FontAwesomeIcon,
  },
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
    editable: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      summaryText: "",
      faPaperclip,
      faPaperPlane,
      faGrin,
      faBold,
      faItalic,
      faUnderline,
      faStrikethrough,
      faListUl,
      faListOl,
      faLink,
      faCode,
      faCodeBranch,
      faFile,
      faTimes,
      faAddressCard,
      faMicrophone,
      faVideo,
    };
  },
  created() {
    const linkExtension = Link.configure({
      openOnClick: false,
    });
    this.editor = new Editor({
      content: this.summaryText,
      extensions: [StarterKit, Underline, Link],
      editable: this.editable,
      
    });
  },
  methods: {
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },

    async onSubmit() {
      if (this.summary?.id) {
        this.updateSummary();
      } else {
        this.createSummary();
      }
    },
    toggleLink() {
      if (this.editor.isActive("link")) {
        // unset link
        this.editor.chain().focus().unsetLink().run();
      } else {
        // show link modal
        // this.isLinkModalShown = true;
        this.setLink();
      }
    },

    closeAndResetLinkModal() {
      this.isLinkModalShown = false;
      this.linkUrl = "";
    },
    setLink() {
      const previousUrl = this.editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        this.editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    },
    async createSummary() {
      const { date } = this;
      const text = this.editor.getHTML();
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
      const text = this.editor.getHTML();
      console.log(text, "summaryText");
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
        if (this.editor) {
          this.editor.commands.setContent(this.summary.text); // Update the content of the editor
        }
      } else {
        this.editor.commands.setContent();
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
    editable(newValue) {
      if (this.editor) {
        this.editor.options.editable = newValue;
      }
    },
  },
};
</script>

<style lang="scss">
.editor-wrapper {
  // padding: 10px;
  border-bottom: 6px;
  border: solid 1px var(--bib-light);
  .toolbar {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: solid 1px var(--bib-light);
    height: 40px;
    background-color: var(--bib-light);
    .toolbar-icon {
      svg {
        margin-right: 1rem;
        cursor: pointer;
      }
    }
  }
}
.editor-container {
  max-height: 300px;
  overflow-y: auto;
  min-height: 100px;
  p{
    line-height: 1.3rem;
    padding: 0;
    margin: 0;
  }
}

.ProseMirror:focus {
  outline: none;
}
</style>
