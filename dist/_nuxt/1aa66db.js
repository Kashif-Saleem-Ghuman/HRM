(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{442:function(e,t,n){"use strict";n.r(t);var l={name:"EmergencyContact",props:{fullName:{type:String},releationships:{type:String},telephone:{type:String},email:{type:String},inActive:{type:String},emContact:{type:String}}},o=n(21),component=Object(o.a)(l,(function(){var e=this,t=e._self._c;return t("div",[t("div",{staticClass:"row mx-0"},[t("div",{staticClass:"col-6"},[t("bib-input",{attrs:{type:"text",label:"Full name",placeholder:"Enter your full name",disabled:e.inActive},on:{change:function(t){return e.$emit("input",t,"name",e.emContact)}},model:{value:e.fullName,callback:function(t){e.fullName=t},expression:"fullName"}})],1)]),e._v(" "),t("div",{staticClass:"row mx-0"},[t("div",{staticClass:"col-4"},[t("bib-input",{attrs:{type:"text",label:"Releationships",placeholder:"Please enter releationships",disabled:e.inActive},on:{change:function(t){return e.$emit("input",t,"relationship",e.emContact)}},model:{value:e.releationships,callback:function(t){e.releationships=t},expression:"releationships"}})],1),e._v(" "),t("div",{staticClass:"col-4"},[t("bib-input",{attrs:{type:"text",label:"Telephone",placeholder:"Please enter telephone",disabled:e.inActive},on:{change:function(t){return e.$emit("input",t,"phone",e.emContact)}},model:{value:e.telephone,callback:function(t){e.telephone=t},expression:"telephone"}})],1),e._v(" "),t("div",{staticClass:"col-4"},[t("bib-input",{attrs:{type:"email",label:"Email",placeholder:"Please enter email",disabled:e.inActive},on:{change:function(t){return e.$emit("input",t,"email",e.emContact)}},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1)])])}),[],!1,null,null,null);t.default=component.exports}}]);