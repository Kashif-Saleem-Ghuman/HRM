<template>
  <div :class="classNames" class="p-05">
    <div class="bib-board-card__header pr-0">
      <slot name="new_contact_section"></slot>
      <!-- <div class="bib-board-card__header--menu">
        <bib-icon
          icon="bookmark-solid"
          :variant="
            isFavoriteReactive
              ? isLightThemeCheck
                ? 'primary-24'
                : 'primary'
              : isLightThemeCheck
              ? 'gray1'
              : 'white'
          "
          class="mr-05 cursor-pointer"
          @click.native.stop="handleFavorite"
        ></bib-icon>
        <slot name="card_menu"></slot>
      </div> -->
    </div>

    <div class="bib-board-card--items p-05">
      <div>
        <slot name="user_data"></slot>
      </div>
    </div>

    <div class="bib-board-card__footer p-05">
      <slot name="card_footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BibBoardCard",
  props: {
    userData: {
      type: Object,
      default() {
        return null;
      },
    },
    isFavorite: {
      type: Boolean,
      default() {
        return false;
      },
    },
    isLightTheme: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  data() {
    return {
      isFavoriteReactive: this.isFavorite,
    };
  },
  computed: {
    classNames() {
      const basicClassName = "bib-board-card";
      return [
        basicClassName,
        this.isLightTheme
          ? `${basicClassName}--light-theme`
          : `${basicClassName}--dark-theme`,
      ];
    },
  },
  methods: {
    handleFavorite() {
      this.isFavoriteReactive = !this.isFavoriteReactive;
      this.isFavoriteReactive
        ? this.$emit("add-favorite")
        : this.$emit("remove-favorite");
    },
  },
};
</script>

<style lang="scss">
.bib-board-card {
  position: relative;
  border-radius: 0.5rem;
  min-width: 18rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  &__header {
    display: flex;
    align-items: center;
    &--menu {
      display: flex;
      align-items: center;
      margin-left: auto;
      padding: 0.25rem 0.5rem;
    }
  }
  &--items {
    flex-grow: 1;
    label {
      font-size: 15px;
    }
    a {
      color: $primary;
    }
    .button-wrapper-punch {
      margin-left: -3px;
      padding-top: 12px;
      span {
        border-radius: 16px;
        padding: 4px 8px;
        background-color: #eee;
        &.online {
          background-color: $gray4;
          color: $success;
        }
        &.offline {
          background-color: $gray4;
          color: $dark;
        }
      }
    }
  }
  &__footer {
    margin-top: auto; // Push the footer to the bottom
  }
  &--light-theme {
    background: $light-sub2;
    border: 1px solid $gray7;
  }
  &--dark-theme {
    background: $text;
    border: 1px solid var(--bib-dark-sub1);
  }
  &--light-theme {
    background: $light;
  }
}
</style>
