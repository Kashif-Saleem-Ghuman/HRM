'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vue = require('vue');
var index_cjs = require('@fullcalendar/core/index.cjs');
var internal_cjs = require('@fullcalendar/core/internal.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

const OPTION_IS_COMPLEX = {
    headerToolbar: true,
    footerToolbar: true,
    events: true,
    eventSources: true,
    resources: true
};

const dummyContainer$1 = typeof document !== 'undefined' ? document.createDocumentFragment() : null;
const OffscreenFragment = Vue__default["default"].extend({
    render(h) {
        /*
        Choose an exotic tag that FullCalendar's internal (p)react engine won't reuse
        (For behavior, see: https://codepen.io/arshaw/pen/wvXPwYG)
        */
        return h('aside', {
            style: { display: 'none' }
        }, this.$slots.default || []);
    },
    mounted() {
        if (dummyContainer$1) {
            dummyContainer$1.appendChild(this.$el);
        }
    },
    beforeDestroy() {
        if (dummyContainer$1) {
            dummyContainer$1.removeChild(this.$el);
        }
    }
});

const dummyContainer = typeof document !== 'undefined' ? document.createDocumentFragment() : null;
const TransportContainer = Vue__default["default"].extend({
    props: {
        inPlaceOf: typeof Element !== 'undefined' ? Element : Object,
        reportEl: Function,
        elTag: String,
        elClasses: Array,
        elStyle: Object,
        elAttrs: Object
    },
    render(h) {
        return h(this.elTag, {
            class: this.elClasses,
            style: this.elStyle,
            attrs: this.elAttrs,
        }, this.$slots.default || []);
    },
    mounted() {
        replaceEl(this.$el, this.inPlaceOf);
        this.inPlaceOf.style.display = 'none';
        this.reportEl(this.$el);
    },
    updated() {
        /*
        If the ContentContainer's tagName changed, it will create a new DOM element in its
        original place. Detect this and re-replace.
        */
        if (dummyContainer && this.inPlaceOf.parentNode !== dummyContainer) {
            replaceEl(this.$el, this.inPlaceOf);
            this.reportEl(this.$el);
        }
    },
    beforeDestroy() {
        // protect against Preact recreating and rerooting inPlaceOf element
        if (dummyContainer && this.inPlaceOf.parentNode === dummyContainer) {
            dummyContainer.removeChild(this.inPlaceOf);
        }
        this.reportEl(null);
    }
});
function replaceEl(subject, inPlaceOf) {
    var _a;
    (_a = inPlaceOf.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(subject, inPlaceOf.nextSibling);
    if (dummyContainer) {
        dummyContainer.appendChild(inPlaceOf);
    }
}

const FullCalendar = Vue__default["default"].extend({
    props: {
        options: Object
    },
    data() {
        return {
            renderId: 0,
            customRenderingMap: new Map()
        };
    },
    methods: {
        getApi() {
            return getSecret(this).calendar;
        },
        buildOptions(suppliedOptions) {
            return Object.assign(Object.assign({}, suppliedOptions), { customRenderingMetaMap: kebabToCamelKeys(this.$scopedSlots), handleCustomRendering: getSecret(this).handleCustomRendering, customRenderingReplacesEl: true });
        },
    },
    render(h) {
        const customRenderingNodes = [];
        for (const customRendering of this.customRenderingMap.values()) {
            const innerContent = typeof customRendering.generatorMeta === 'function' ?
                customRendering.generatorMeta(customRendering.renderProps) : // a slot-render-function
                customRendering.generatorMeta; // jsx vnode?
            customRenderingNodes.push(
            // need stable element reference for list-diffing
            // TODO: move this functionality within TransportContainer
            h('div', { key: customRendering.id }, [
                h(TransportContainer, {
                    key: customRendering.id,
                    props: {
                        inPlaceOf: customRendering.containerEl,
                        reportEl: customRendering.reportNewContainerEl,
                        elTag: customRendering.elTag,
                        elClasses: customRendering.elClasses,
                        elStyle: customRendering.elStyle,
                        elAttrs: customRendering.elAttrs,
                    }
                }, innerContent)
            ]));
        }
        return h('div', {
            // when renderId is changed, Vue will trigger a real-DOM async rerender, calling beforeUpdate/updated
            attrs: { 'data-fc-render-id': this.renderId }
        }, [
            // for containing TransportContainer keys
            h(OffscreenFragment, customRenderingNodes)
        ]);
    },
    mounted() {
        const customRenderingStore = new internal_cjs.CustomRenderingStore();
        getSecret(this).handleCustomRendering = customRenderingStore.handle.bind(customRenderingStore);
        const calendarOptions = this.buildOptions(this.options);
        const calendar = new index_cjs.Calendar(this.$el, calendarOptions);
        getSecret(this).calendar = calendar;
        calendar.render();
        customRenderingStore.subscribe((customRenderingMap) => {
            this.customRenderingMap = customRenderingMap; // likely same reference, so won't rerender
            this.renderId++; // force rerender
            getSecret(this).needCustomRenderingResize = true;
        });
    },
    beforeUpdate() {
        this.getApi().resumeRendering(); // the watcher handlers paused it
    },
    updated() {
        if (getSecret(this).needCustomRenderingResize) {
            getSecret(this).needCustomRenderingResize = false;
            this.getApi().updateSize();
        }
    },
    beforeDestroy() {
        this.getApi().destroy();
    },
    watch: buildWatchers()
});
// storing internal state:
// https://github.com/vuejs/vue/issues/1988#issuecomment-163013818
function getSecret(inst) {
    return inst;
}
function buildWatchers() {
    let watchers = {
        // watches changes of ALL options and their nested objects,
        // but this is only a means to be notified of top-level non-complex options changes.
        options: {
            deep: true,
            handler(options) {
                let calendar = this.getApi();
                calendar.pauseRendering();
                let calendarOptions = this.buildOptions(options);
                calendar.resetOptions(calendarOptions);
                this.renderId++; // will queue a rerender
            }
        }
    };
    for (let complexOptionName in OPTION_IS_COMPLEX) {
        // handlers called when nested objects change
        watchers[`options.${complexOptionName}`] = {
            deep: true,
            handler(val) {
                // unfortunately the handler is called with undefined if new props were set, but the complex one wasn't ever set
                if (val !== undefined) {
                    let calendar = this.getApi();
                    calendar.pauseRendering();
                    calendar.resetOptions({
                        [complexOptionName]: val
                    }, [complexOptionName]);
                    this.renderId++; // will queue a rerender
                }
            }
        };
    }
    return watchers;
}
// General Utils
function kebabToCamelKeys(map) {
    const newMap = {};
    for (const key in map) {
        newMap[kebabToCamel(key)] = map[key];
    }
    return newMap;
}
function kebabToCamel(s) {
    return s
        .split('-')
        .map((word, index) => index ? capitalize(word) : word)
        .join('');
}
function capitalize(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

/*
Registers the component globally if appropriate.
This modules exposes the component AND an install function.

Derived from:
https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html
*/
let installed = false;
// declare install function executed by Vue.use()
function install(Vue) {
    if (!installed) {
        installed = true;
        Vue.component('FullCalendar', FullCalendar);
    }
}
// detect a globally availble version of Vue (eg. in browser via <script> tag)
let GlobalVue;
if (typeof globalThis !== 'undefined') {
    GlobalVue = globalThis.Vue;
}
else {
    GlobalVue = window.Vue;
}
// auto-install if possible
if (GlobalVue) {
    GlobalVue.use({
        install
    });
}

exports["default"] = FullCalendar;
exports.install = install;
