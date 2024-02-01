import Vue from 'vue'
import vClickOutside from 'v-click-outside'
import BibUILibrary from "~/node_modules/@bizinbox/bib-ui-lib/dist/library";
Vue.config.devtools = true;
Vue.use(vClickOutside)
export default ({ store }) => {
    Vue.use(BibUILibrary, { store })
  };