<template>
  <div :class="classNames" class="p-05">
    <div class="bib-board-card__header p-05 pr-0">
      <slot name="new_contact_section"></slot>
      <div class="bib-board-card__header--menu">
        <!-- <bib-icon
          icon="bookmark-solid"
          :variant="
            this.isFavorite
              ? isLightThemeCheck
                ? 'primary-24'
                : 'success'
              : isLightThemeCheck
              ? 'gray1'
              : 'white'
          "
          class="mr-05 cursor-pointer"
          @click.native.stop="handleFavorite"
        ></bib-icon> -->
        <slot name="card_menu"></slot>
      </div>
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
    return {};
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
      this.isFavorite
        ? this.$emit("remove-favorite")
        : this.$emit("add-favorite");
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
  &--items{
    label{
        font-size: 15px;
    }
    a{
        color: $primary;
    }
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
