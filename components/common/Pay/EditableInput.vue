<template>
  <div class="d-flex align-center salary-wrapper pb-1">
    <aside class="pr-1 input-label" v-if="label">{{ label }}</aside>
    <div
      class="editable-value d-flex align-center gap-05"
      :class="{ 'editing-mode': isEditing }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div v-if="showAvatar">
        <bib-avatar :src="avatarImg" size="1rem"></bib-avatar>
      </div>
      <div v-if="isEditing" class="edit-input">
        <input
          v-model="editableValue"
          @blur="saveValue"
          @keyup.enter="saveValue"
          class="input-field"
          placeholder="Enter value"
        />
      </div>
      <div v-else class="value">{{ editableValue }}</div>
      <div v-if="isEditing" class="custom-icons-wrapper">
        <bib-icon
          class="add-icon"
          icon="close"
          :scale="1"
          @click="handleDeleteClick"
        />
      </div>
      <div
        class="edit-icon-wrapper"
        :class="{ visible: isHovered && !isEditing }"
        @click="toggleEditing"
        v-click-outside="handleClickOutside"
        v-if="!isEditing"
      >
        <bib-icon
          class="edit-icon"
          icon="pencil"
          :scale="1"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditableInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    avatarImg: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isHovered: false,
      isEditing: false,
      editableValue: this.value,
    };
  },
  methods: {
    toggleEditing() {
      this.isEditing = true;
    },
    saveValue() {
      this.isEditing = false;
      this.$emit("update-value", this.editableValue);
    },
    handleClickOutside() {
      this.isEditing = false;
    },
    handleDeleteClick() {
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss">
.editable-value {
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--bib-dark-sub3);
  padding: 0.5rem;
  background-color: var(--bib-dark);
  border-radius: 1rem;
  transition: background-color 0.3s ease;
  font-size: 14px;
  width: 100%;
  max-width: 100%; /* Ensure consistent width across views */

  &:hover {
    background-color: $surface-tertiary;
  }

  &.editing-mode {
    background-color: black;
  }

  .value,
  .edit-input {
    flex-grow: 1;
    width: 100%;
  }

  .edit-input .input-field {
    width: 100%;
    border: none !important;
    background: none;
    color: var(--bib-text-secondary);
    outline: none;
  }

  .edit-icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: end;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    padding-left: 2rem;

    &.visible {
      opacity: 1;
    }
  }

  .custom-icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding-left: 2rem;
    transition: opacity 0.3s ease;

    .seprator-right {
      border-right: 1px solid var(--bib-text-secondary);
      width: 1px;
      height: 14px;
      margin: 0 0.8rem;
    }

    .edit-icon,
    .add-icon {
      color: var(--bib-text-secondary);
    }
  }

  &:hover {
    .edit-icon-wrapper,
    .custom-icons-wrapper {
      opacity: 1;
    }
  }
}
</style>
