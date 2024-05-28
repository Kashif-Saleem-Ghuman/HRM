import Vue from 'vue';
import vClickOutside from 'v-click-outside';
import BibUILibrary from '@bizinbox/bib-ui-lib/dist/library';
import themeMixin from '../mixins/theme-mixin';

export default function vuePlugins({ store }) {
  Vue.config.devtools = true;

  // Register vClickOutside plugin globally
  Vue.use(vClickOutside);

  // Register BibUILibrary plugin globally with store
  Vue.use(BibUILibrary, { store });
  Vue.mixin(themeMixin);

}
