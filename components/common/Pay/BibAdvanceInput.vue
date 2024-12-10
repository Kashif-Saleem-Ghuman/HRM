<template>
  <div class="d-flex advance-input align-center">
    <div class="pr-1 font-md input-label text-text-secondary" v-if="label">
      {{ label }}
    </div>
    <div
      class="editable-value d-flex align-center cursor-pointer gap-05"
      :class="{
        'editing-mode': isEditing,
        'editable-value--light': isLight,
        'editable-value--dark': !isLight,
        'with-avatar': showAvatar,
      }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      v-click-outside="handleClickOutside"
      @click="toggleEditing"
    >
      <div v-if="showAvatar">
        <bib-avatar v-if="avatarImg != ''" :src="avatarImg" size="1.5rem"
          >BG</bib-avatar
        >
        <span class="initial" v-else-if="value && value != ''">{{
          initials
        }}</span>
      </div>

      <div v-if="isEditing && type === 'text'" class="edit-input">
        <input
          v-model="editableValue"
          @blur="saveValue($event)"
          @keyup.enter="saveValue"
          class="input-field"
          placeholder="Enter value"
        />
      </div>

      <!-- Show select dropdown only if type is 'select' -->

      <div v-if="isEditing && type === 'select'" class="edit-select">
        <select
          v-model="editableValue"
          @change="saveValue"
          class="select-field"
        >
          <option value="" disabled v-if="!editableValue">
            Select an option
          </option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <!-- <div
        v-else-if="type === 'select' && !isEditing"
        class="value position-relative"
      >
        {{ editableValue || "Select an option" }}
      </div> -->

      <div v-else-if="!isEditing" class="value position-relative">
        <slot name="value"></slot>
      </div>

      <div v-if="isEditing" class="custom-icons-wrapper">
        <bib-icon
          class="add-icon"
          icon="close"
          :scale="1"
          :variant="isLight ? 'gray1' : 'light'"
          @click.stop="handleDeleteClick"
        />
      </div>
      <div
        class="edit-icon-wrapper"
        :class="{ visible: isHovered && !isEditing }"
        @click="toggleEditing"
        v-if="!isEditing"
      >
        <bib-icon class="edit-icon" :icon="hoverIcon" :scale="1" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BibAdvanceInput",
  props: {
    value: {
      type: String,
      required: false,
    },
    fieldKey: {
      type: String,
    },
    label: {
      type: String,
    },
    type: {
      type: String,
      default: "text",
    },
    options: {
      type: Array,
      default: () => [],
      required: false,
    },
    showAvatar: {
      type: Boolean,
      default: false,
    },
    avatarImg: {
      type: String,
      default: "",
    },
    hoverIcon: {
      type: String,
      default: "pencil",
    },
  },
  computed: {
    isLight() {
      return this.$store.state.uiLibStore.isLightMode;
    },
    initials() {
      return this.value ? this.value.slice(0, 2) : "";
    },
  },
  data() {
    return {
      isHovered: false,
      isEditing: false,
      editableValue: this.value || "",
    };
  },
  methods: {
    toggleEditing(e) {
      e.stopPropagation();
      this.isEditing = true;
    },
    saveValue(event) {
      this.isEditing = false;
      this.$emit("update-value", this.fieldKey, event.target.value);
    },
    handleClickOutside() {
      this.isEditing = false;
    },
    handleDeleteClick() {
      this.isEditing = false;
      console.log(this.isEditing);
    },
  },
};
</script>

<style lang="scss">
.editable-value {
  gap: 1rem;
  padding: 4px 12px;
  border-radius: 360px;
  transition: background-color 0.3s ease;
  font-size: 14px;
  // width: 10%;
  max-width: 100%;
  height: 32px;

  &.with-avatar {
    padding: 4px 12px 4px 4px;
  }
  .initial {
    color: $text-secondary;
    border: 1px solid $dark-sub5;
    background: $border-primary;
    text-transform: capitalize;
    border-radius: 16px;
    padding: 6px 5px;
    height: 24px;
    width: 24px;
    display: flex;
    font-size: 10px;
    /* text-align: center; */
    align-items: center;
  }
  .value,
  .edit-input,
  .edit-select {
    flex-grow: 1;
    width: 100%;
  }

  .edit-input .input-field,
  .edit-select .select-field {
    width: auto;
    border: none;
    display: inline-flex;
    background: none;
    outline: none;
  }

  .edit-icon-wrapper {
    display: none;
    align-items: center;
    justify-content: end;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    position: relative;
    &.visible {
      opacity: 1;
    }
    &::before {
      content: "";
      position: absolute;
      top: 2px;
      width: 1px;
      height: 13px;
      left: -7px;
    }
  }

  .custom-icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    .add-icon {
      color: $light;
    }
    &::before {
      content: "";
      position: absolute;
      top: 2px;
      width: 1px;
      height: 13px;
      left: -7px;
    }
  }

  &:hover {
    .edit-icon-wrapper,
    .custom-icons-wrapper {
      opacity: 1;
      display: flex;
    }
    .value {
      &::before {
        display: block;
      }
    }
  }
  &--light {
    border: 1px solid $gray12;
    background-color: $light;
    .edit-input .input-field,
    .edit-select .select-field {
      color: $text-secondary;
    }
    .value,
    .edit-input,
    .edit-select {
      color: $text-secondary;
    }
    &:hover {
      background-color: $gray2;
    }
    .custom-icons-wrapper,
    .edit-icon-wrapper {
      &::before {
        background-color: $text-secondary;
      }
    }
    &.editing-mode {
      background-color: $light;
    }
    .initial {
      color: $text-secondary;
      border: 1px solid $text-secondary;
      background: $gray13;
    }
  }
  &--dark {
    border: 1px solid $dark-sub5;
    background-color: $dark;
    .edit-input .input-field,
    .edit-select .select-field {
      color: $light;
    }
    .value,
    .edit-input,
    .edit-select {
      color: $light;
    }
    &:hover {
      background-color: $dark;
    }
    .custom-icons-wrapper,
    .edit-icon-wrapper {
      &::before {
        background-color: $dark-sub5;
      }
    }
    &.editing-mode {
      background-color: $dark;
    }
    .initial {
      color: $text-secondary;
      border: 1px solid $dark-sub5;
      background: $border-primary;
    }
  }
}
</style>
