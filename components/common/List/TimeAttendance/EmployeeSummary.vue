<template>
  <client-only>
    <div v-if="editor" class="wrapper" @click.stop>
      <div class="container">
        <div class="toolbar-top">
          <div
            v-for="item in toolbarItems"
            :key="item.name"
            class="toolbar-items"
          >
            <div
              class="toolbar-icon"
              :class="{ 'is-active': editor.isActive(item.name) }"
              @click="item.action"
            >
              <fa :icon="item.icon"></fa>
            </div>
          </div>
          <!-- <div class="toolbar-button d-inline-flex align-center ml-auto">
            <bib-button
              type="button"
              label="Cancel"
              class="cursor-pointer"
              variant="light"
              @click="cancelMessage"
            >
            </bib-button>
          </div> -->
        </div>
        <div class="editor-container">
          <div>
            <editor-content
              :editor="editor"
              class="editor"
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
import { Editor, EditorContent, Extension, VueRenderer } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faListUl,
  faListOl,
  faLink,
} from "@fortawesome/free-solid-svg-icons";

import { escape, unescape } from "lodash";

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
      faBold,
      faItalic,
      faUnderline,
      faStrikethrough,
      faListUl,
      faListOl,
      faLink,
      toolbarItems: [
        {
          name: "bold",
          icon: faBold,
          action: () => this.editor.chain().focus().toggleBold().run(),
        },
        {
          name: "italic",
          icon: faItalic,
          action: () => this.editor.chain().focus().toggleItalic().run(),
        },
        {
          name: "underline",
          icon: faUnderline,
          action: () => this.editor.chain().focus().toggleUnderline().run(),
        },
        {
          name: "strike",
          icon: faStrikethrough,
          action: () => this.editor.chain().focus().toggleStrike().run(),
        },
        { name: "link", icon: faLink, action: this.toggleLink },
        {
          name: "bulletList",
          icon: faListUl,
          action: () => this.editor.chain().focus().toggleBulletList().run(),
        },
        {
          name: "orderedList",
          icon: faListOl,
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
        },
      ],
    };
  },
  created() {
    const linkExtension = Link.configure({
      openOnClick: false,
    });
    this.editor = new Editor({
      content: this.summaryText,
      editable: this.editable,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
        }),
        Underline,
        Placeholder.configure({ placeholder: this.placeholder }),
      ],
      onUpdate: ({ editor }) => {
        this.$forceUpdate();
      },
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
      const updatedSummary = await updateSummary({
        text: escape(text),
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
        this.summaryText = `${unescape(this.summary.text)}`;
        if (this.editor) {
          this.editor.commands.setContent(`${unescape(this.summary.text)}`); // Update the content of the editor
        }
      } else {
        this.editor.commands.setContent();
      }
    },
    cancelMessage() {
      this.editor.commands.clearContent();
    },
  },

  mounted() {
    this.setSummaryText();
  },
  watch: {
    summary: {
      deep: true,
      handler: function () {
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
<style lang="scss" scoped>
.container {
  width: auto;
  border: 1px solid var(--bib-light);
  border-radius: 6px;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.editor-container {
  overflow-y: auto;
  min-height: 100px;
  max-height: 300px;
  padding: 0 1rem;

  ::v-deep .ProseMirror {
    min-height: 100px;
    max-height: 300px;
    background-color: white; /* Add any other styles you want */
  }
}
.toolbar-top {
  display: flex;
  gap: 0.25rem;
  font-size: 0.9rem;
  padding: 5px 5px 5px;
  background-color: var(--bib-light);
  border-bottom: solid 1px $gray2;
}
.toolbar-items {
  background-color: $light;
  border-right: 1px solid $gray7;
  width: 30px;
  :hover {
    background-color: $white;
  }
  &.is-active {
    color: $black;
    background-color: $white;
  }
}
::v-deep .toolbar-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--bib-secondary);
  &.is-active {
    color: $black;
    width: 26px;
    height: 26px;
    background-color: $white;
  }

  svg {
    height: 15px;
  }
}
::v-deep .ProseMirror:focus {
  outline: none !important;
}
</style>
