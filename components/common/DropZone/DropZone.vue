<template>
  <div class="dropzone-box">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :use-custom-slot="true"
      @vdropzone-removed-file="openImage()"
      @vdropzone-files-added="maxFileSize($event)"
      @vdropzone-thumbnail="$emit('vfileAdded', $event)"
    >
      <div class="d-flex align-center">
        <div class="mr-1" style="position: relative">
          <bib-avatar size="100px" :src="src" class="avtar-border"></bib-avatar>
          <div class="custom-remove" :class="customRemove">
            <span v-on:click="openImage()">Remove image</span>
          </div>
        </div>
        <div :class="className">
          <div class="text-left">
            <p>Click to upload or drag and drop photos here...</p>
            <p>JPG, PNG, TIFF, GIF (max 100 MB)</p>
          </div>
        </div>
      </div>
    </vue-dropzone>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { popupNotificationMsgs } from "../../../utils/constant/Notifications";
import { openPopupNotification } from "../../../utils/functions/functions_lib.js";

export default {
  props: {
    className: {
      type: String,
    },
    src: {
      type: String,
    },
    customRemove: {
      type: String,
    },
    disable: {
      type: Boolean,
    },
  },
  name: "app",
  components: {
    vueDropzone: vue2Dropzone,
    thumnail: "",
  },
  data: function () {
    return {
      success: false,
      error: false,
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
      dropzoneOptions: {
        // previewTemplate: this.getTempalte(),
        url: "false",
        autoProcessQueue: false,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        addRemoveLinks: true,
        dictRemoveFile: "Remove Image",
        maxFilesize: 2,
        maxFiles: 1,
        clickable: true,
        init: function () {
          this.on("addedfile", function (file) {
            var fileSize = file.size / (1024 * 1024);
            if (fileSize > 2) {
              this.removeFile(file);
              return;
            }
          });
        },
      },
    };
  },
  methods: {
    openPopupNotification,
    maxFileSize(file) {
      var fileSize = file[0].size / (1024 * 1024);
      if (fileSize > 2) {
        this.openPopupNotification(5);
        return;
      }
    },
    openImage: function () {
      this.$refs.myVueDropzone.dropzone.element.click();
    },

    getTempalte: function () {
      return `
      // <div class="dz-preview dz-processing dz-success dz-complete dz-image-preview" id="dropzone">
      //   <div class="dz-image">
      //     <img data-dz-thumbnail></img>
      //   </div>
      //   <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
      //   <div class="dz-success-mark"><span class="dz-upload" data-dz-success></span></div>
      //   <div class="dz-error-message"><span data-dz-errormessage></span></div>
      //   <div class="dz-success-mark"><i class="fa fa-check"></i></div>
      //   <div class="dz-error-mark"><i class="fa fa-close"></i></div>
      // </div>`;
    },
  },
};
</script>
<style lang="scss">
.hide {
  display: none;
}
.custom-remove {
  position: absolute;
  bottom: 40px;
  left: 17%;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 3px;
  //   opacity:0;
}
.dropzone-box {
  border: 0;
  .dropzone {
    padding: 0px;
    margin-right: auto;

    &:hover {
      background: none;
    }
  }
  .avtar-border {
    border: solid 1px #9e9eff;
  }
}
.vue-dropzone {
  color: #777;
  width: 100%;
  // height: 200px;
  min-height: auto;
  padding: 0px;
  border: 0;
  h3 {
    font-size: 12px;
    color: #8989ff;
    font-weight: 600;
    margin: 0;
  }
  p {
    font-size: 12px;
    color: #8989ff;
    font-weight: 500;
    line-height: 24px;
    margin: 0;
  }
  .dz-message {
    margin: 0;
  }
}

.dropzone .dz-preview {
  margin: 0px;
}

.dz-preview {
  // display: inline-block;
}

#dropzone {
  //   width: 200px
  border: 0;
}

.dz-progress {
  //   display: none;
}
.dropzone .dz-preview .dz-image img {
  border-radius: 50%;
  border: solid 1px #9e9eff;
  margin-right: 16px;
}
.dropzone .dz-preview:hover .dz-image img {
  -webkit-transform: scale(1, 1) !important;
  -moz-transform: scale(1, 1) !important;
  -ms-transform: scale(1, 1) !important;
  -o-transform: scale(1, 1) !important;
  transform: scale(1, 1) !important;
  -webkit-filter: blur(0px) !important;
  filter: blur(0px) !important;
  border-radius: 50%;
}

.dz-success-mark,
.dz-error-mark {
  display: none;
}
.vue-dropzone > .dz-preview .dz-progress {
  display: none;
}
.vue-dropzone > .dz-preview .dz-sucess {
  display: block !important;
}
.vue-dropzone > .dz-preview .dz-remove {
  border-radius: 50%;
  margin-bottom: -50px;
  //    background-color: #000;
  opacity: 1 !important;
  line-height: 100px;
  border: 0px #8989ff solid;
  font-size: 11px;
  margin-left: 3px;
  margin-bottom: -20px;
  width: 120px;
  height: 120px;
  // display:none;
}
.vue-dropzone > .dz-preview .dz-filename {
  display: none;
}
.vue-dropzone > .dz-preview .dz-size {
  display: none;
}
.vue-dropzone > .dz-preview .dz-details {
  background-color: transparent !important;
}
.vue-dropzone > .dz-preview .dz-remove:hover {
  color: #fff;
  background-color: none;
  border: 0px #8989ff solid;
  line-height: 100px;
  opacity: 1;
  text-decoration: none;
  margin-left: 3px;
  margin-bottom: -20px;
  width: 120px;
  height: 120px;
}
.dropzone-custom-content {
  margin-top: 30px;
}
</style>
