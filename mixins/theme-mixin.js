// mixins/themeMixin.js
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLightThemeCheck: 'theme/isLightTheme',  // Mapping Vuex getter to computed property
    }),
  },  
  };

  