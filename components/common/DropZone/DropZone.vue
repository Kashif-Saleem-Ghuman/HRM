<template>
  <div class="dropzone-box">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :use-custom-slot="true"
      @vdropzone-files-added="maxFilesSize($event)"
      @vdropzone-thumbnail="$emit('vfileAdded', $event)"
      :key="dropzoneRefresh"
    >
      <div class="d-flex align-center position-relative" :class="className">
        <div
          class="mr-1 mb-1 dz-preview dz-processing dz-image-preview dz-success dz-complete"
        >
          <div class="custom-remove" :class="customRemove">
            <span @click.stop="deleteConfirmation(src)" class="delIcon">
              <bib-icon icon="trash-solid" :scale="0.9"></bib-icon>
            </span>
          </div>
          <div class="upload-link">Upload Image</div>
          <bib-avatar size="120px" :src="src" class="avtar-border"></bib-avatar>
        </div>
        <!-- <div :class="className">
          <div class="text-left">
            <p>Click to upload or drag and drop photos here...</p>
            <p>JPG, PNG, TIFF, GIF (max 100 MB)</p>
          </div>
        </div> -->
      </div>
    </vue-dropzone>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <confirmation-modal
      :title="deleteModalContent.title"
      :confirmationMessage="deleteModalContent.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @close="closeconfirmastionMessageModal"
      @delete="$emit('vfileRemove')"
    ></confirmation-modal>
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { openPopupNotification } from "../../../utils/functions/functions_lib.js";
import { DELETE_MESSAGE } from "@/utils/constant/ConfirmationMessage";
var fileExt;
const IMAGE_TYPE = {
  jpeg: "image/jpeg",
  gif: "image/gif",
  png: "image/png",
  webp: "image/webp",
  jpg: "image/jpeg",
};
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
    confirmastionMessageModal: {
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
      popupMessages: [],
      deleteModalContent: DELETE_MESSAGE[2],
      dropzoneRefresh: 0,
      dropzoneOptions: {
        // previewTemplate: this.getTempalte(),
        url: "false",
        autoProcessQueue: false,
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        addRemoveLinks: false,
        dictRemoveFile: "Remove Image",
        maxFilesize: 2,
        maxFiles: 1,
        acceptedFiles: "image/*",
        clickable: true,
        init: function () {
          this.on("addedfile", function (file) {
            var fileSize = file.size / (1024 * 1024);
            fileExt = file.name.split(".").pop();
            if (file.type != IMAGE_TYPE[fileExt]) {
              this.removeFile(file);
              return;
            }
            if (fileSize > 2) {
              this.removeFile(file);
              return;
            }
          });
        },
      },
    };
  },
  created() {
    this.$root.$on("dropzone-key", () => {
      this.dropzoneRefresh += 1;
    });
  },
  methods: {
    openPopupNotification,
    deleteConfirmation(src) {
      if (src === "" || src === "null") {
        this.openPopupNotification(7);
        return;
      }
      this.confirmastionMessageModal = true;
    },
    maxFilesSize(file) {
      var fileSize = file[0].size / (1024 * 1024);
      if (file[0].type != IMAGE_TYPE[fileExt]) {
        this.openPopupNotification(10);
        return;
      }
      if (fileSize > 2) {
        this.openPopupNotification(5);
        return;
      }
    },
    openImage: function () {
      this.$refs.myVueDropzone.dropzone.element.click();
    },

    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
  },
};
</script>
<style lang="scss">
.avtar-border {
  border: 1px solid $light !important;
}
.hide {
  display: none;
}
.custom-remove {
  z-index: 99;
  .avtar-border {
    border: 0px solid $light !important;
  }
  position: absolute;
  font-weight: 600;
  bottom: 8px;
  right: 10px;
  .delIcon {
    border-radius: 6px;
    height: 30px;
    width: 30px;
    bottom: 0;
    padding: 8px;
    background-color: #eee;
    position: relative;
  }
}
.upload-link {
  position: absolute;
  font-weight: 600;
  bottom: -22px;
  right: 27px;
  text-decoration: underline;
  cursor: pointer;
  vertical-align: bottom;
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
    border: solid 0px $light !important;
  }
}
.vue-dropzone {
  color: #777;
  width: 100%;
  // height: 200px;
  min-height: auto;
  padding: 0px;
  border: 0;
  .avtar-border {
    border: 0px solid $light !important;
  }
  // h3 {
  //   font-size: 12px;
  //   color: #8989ff;
  //   font-weight: 600;
  //   margin: 0;
  // }
  // p {
  //   font-size: 12px;
  //   color: #8989ff;
  //   font-weight: 500;
  //   line-height: 24px;
  //   margin: 0;
  // }
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
  border: solid 1px $light;
  // margin-right: 16px;
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
  border: 0px $light solid;
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
  border: 0px $light solid;
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
