<template>
  <div class="d-flex align-center salary-wrapper pb-1 pr-1">
    <div class="pr-1 input-label" v-if="label">{{ label }}</div>
    <div
      class="editable-value d-flex align-center cursor-pointer gap-05"
      :class="{ 'editing-mode': isEditing }"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      v-click-outside="handleClickOutside"
      @click="toggleEditing"
    >
      <div v-if="showAvatar">
        <bib-avatar :src="avatarImg" size="1rem"></bib-avatar>
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
          <option value="" disabled v-if="!editableValue">Select an option</option>
          <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </div>

      <div v-else-if="type === 'select' && !isEditing" class="value">{{ editableValue || 'Select an option' }}</div>

      <div v-else-if="!isEditing" class="value">{{ editableValue || 'Enter value' }}</div>

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
  name: "EditableValue",
  props: {
    value: {
      type: String,
      required: true,
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
      editableValue: this.value || "",
    };
  },
  methods: {
    toggleEditing() {
      this.isEditing = true;
    },
    saveValue(event) {
      this.isEditing = false;
      this.$emit("update-value",  this.fieldKey, event.target.value );
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
  border: 1px solid var(--bib-gray2);
  padding: 0.5rem;
  background-color: var(--bib-light);
  border-radius: 1rem;
  transition: background-color 0.3s ease;
  font-size: 14px;
  width: 100%;
  max-width: 100%;

  &:hover {
    background-color: $gray2;
  }

  &.editing-mode {
    background-color: $gray4;
  }

  .value,
  .edit-input,
  .edit-select {
    flex-grow: 1;
    width: 100%;
  }

  .edit-input .input-field,
  .edit-select .select-field {
    width: 100%;
    border: none;
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

    &.visible {
      opacity: 1;
    }
  }

  .custom-icons-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

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

.dark-theme {
  .editable-value {
    border: 1px solid var(--bib-dark-sub3);
    background-color: var(--bib-dark);

    &:hover {
      background-color: $surface-tertiary;
    }

    &.editing-mode {
      background-color: black;
    }

    .edit-input .input-field {
      color: var(--bib-text-light);
    }

    .edit-select .select-field {
      color: $light;

      option {
        background-color: $dark;
      }

      &:hover {
        border-color: var(--bib-light);
      }

      &:focus {
        border-color: transparent;
        box-shadow: none;
      }
    }
  }
}
</style>
