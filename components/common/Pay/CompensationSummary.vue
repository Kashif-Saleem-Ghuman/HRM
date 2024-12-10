<template>
  <div class="d-flex align-center salary-wrapper pb-1">
    <div class="pr-1 input-label" v-if="label">{{ label }}</div>
    <div
      class="compensation-selector d-flex align-center gap-05"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      v-click-outside="handleClickOutside"
    >
      <div class="label-wrapper">
        <div v-if="isEditing" class="editable-label">
          <select
            v-model="selectedOption"
            @change="updateLabel"
            class="select-dropdown"
          >
            <option v-for="option in options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <div v-else class="label">
          {{ selectedOption }}
        </div>
      </div>

      <div class="amount">{{ amount }}</div>
      <div class="currency">{{ currency }}</div>

      <div
        class="edit-icon-main-wrapper"
        :style="{ opacity: isHovered && !isEditing ? 1 : 0 }"
      >
        <div v-if="!isEditing">
          <bib-icon
            v-show="isHovered"
            class="edit-icon"
            icon="pencil"
            :scale="1"
            @click="toggleEditing"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompensationSelector",
  props: {
    initialLabel: {
      type: String,
      default: "Annual",
    },
    label: {
      type: String,
    },
    amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => ["Annual", "Monthly", "Weekly"],
    },
  },
  data() {
    return {
      isEditing: false,
      isHovered: false,
      selectedOption: this.initialLabel,
    };
  },
  methods: {
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    updateLabel() {
      this.isEditing = false;
      this.$emit("label-updated", this.selectedOption);
    },
    handleClickOutside() {
      this.isEditing = false;
    },
  },
};
</script>

<style lang="scss">
.salary-wrapper {
  .compensation-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 14px;
    border: 1px solid $gray2;
    background-color: $light;
    border-radius: 1rem;
    padding: 0.5rem;
    transition: background-color 0.3s ease;
    cursor: pointer;

    &:hover {
      background-color: $gray2;
    }

    .label-wrapper {
      display: flex;
      align-items: center;
    }

    .editable-label {
      width: 100%;
    }

    .select-dropdown {
      font-size: inherit;
      color: var(--bib-dark);
      background-color: transparent !important;
      border: none !important;
      width: 100%;
      min-width: 70px;
    }

    .label {
      font-weight: bold;
    }

    .amount {
      font-weight: 500;
      margin: 0 0.25rem;
      padding-left: 0.7rem;
      border-left: 1px solid var(--bib-gray5);
      margin-left: 0.3rem;
      height: 18px;
    }

    .currency {
      font-weight: 500;
    }

    .edit-icon-main-wrapper {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-left: 1px solid var(--bib-gray5);
      padding-left: 1rem;
      margin-left: 0.5rem;
      height: 18px;
    }

    .edit-icon {
      transition: opacity 0.3s ease;
      opacity: 0;
      pointer-events: none;
      z-index: 9999;
    }

    &:hover .edit-icon-main-wrapper .edit-icon {
      opacity: 1;
      pointer-events: auto;
    }
  }

  .input-label {
    white-space: nowrap;
    font-weight: normal;
    justify-items: center;
    align-items: center;
    font-size: 14px;
    color: var(--bib-dark);
    display: inline-block;
    margin-right: 1rem;
    min-width: 90px;
  }

  .cursor-pointer {
    cursor: pointer;
  }
}
.dark-theme {
  .salary-wrapper {
    .compensation-selector {
      border: 1px solid $dark-sub3;
      background-color: $dark;
      &:hover {
        background-color: $surface-tertiary;
      }
      .select-dropdown {
        color: var(--bib-text-secondary);
        option {
          background-color: $dark !important;
        }
      }

      .amount {
        border-left: 1px solid var(--bib-gray2);
      }
      .edit-icon-main-wrapper {
        border-left: 1px solid var(--bib-gray2);
      }
    }

    .input-label {
      color: $light;
    }
  }
}
</style>
