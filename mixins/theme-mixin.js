// mixins/themeMixin.js
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLightThemeCheck: "theme/isLightTheme", // Mapping Vuex getter to computed
    }),
    themeClass() {
      return this.isLightThemeCheck ? "light-theme" : "dark-theme";
    },
    themeClassDarkLight() {
      return this.isLightThemeCheck ? "bg-light" : "bg-dark-sub2";
    },
    themeClassDarkLightVariant() {
      return this.isLightThemeCheck ? "light" : "dark";
    },
    borderClassBottom() {
      return this.isLightThemeCheck
        ? "border-bottom-light"
        : "border-bottom-dark-sub3";
    },
    borderClass() {
      return this.isLightThemeCheck ? "border-gray" : "border-dark-sub3";
    },
  },
};
