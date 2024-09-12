// mixins/themeMixin.js
import { mapGetters } from "vuex";
import { fetchUser } from "../utils/functions/userHireDate";
import { DateTime } from "luxon";
import {
  DATETIME_FORMAT,
} from "@/utils/functions/datetime-input";

export default {
  data() {
    return {
      activeUser: null,
      activeUserId: null,
      currentDate:DateTime.now().toFormat(DATETIME_FORMAT),
    };
  },
  methods: {
    async fetchUser(id) {
      if (this.activeUserId) {
        this.activeUser = await fetchUser(this.$store, id);
      } else {
        this.activeUser = await fetchUser(this.$store);
      }
    },
  },
  computed: {
    ...mapGetters({
      isLightThemeCheck: "theme/isLightTheme", // Mapping Vuex getter to computed
    }),
    themeClassWrapper() {
      return this.isLightThemeCheck ? "light-theme" : "dark-theme";
    },
    themeClassCommon() {
      return this.isLightThemeCheck ? "bg-light" : "bg-dark-sub2";
    },
    themeButtonVariant() {
      return this.isLightThemeCheck ? "light" : "dark";
    },
    themeInputVariant() {
      return this.isLightThemeCheck ? "Default" : "dark";
    },
    borderClassBottom() {
      return this.isLightThemeCheck ? "border-bottom-light" : "border-bottom-dark-sub3";
    },
    borderClass() {
      return this.isLightThemeCheck ? "border-gray" : "border-dark-sub3";
    }
    
  },
};
