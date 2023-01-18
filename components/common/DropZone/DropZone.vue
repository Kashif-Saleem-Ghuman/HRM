<template>
  <div class="dropzone-box">
    <vue-dropzone
      ref="myVueDropzone"
      id="dropzone"
      :options="dropzoneOptions"
      :use-custom-slot="true"
      @vdropzone-removed-file="openImage()"
      @vdropzone-thumbnail="$emit('vfileAdded', $event)"
    >
      <div class="d-flex align-center">
        <div class="mr-1" style="position: relative">
          <bib-avatar size="120px" :src="src" class="avtar-border"></bib-avatar>
          <div class="custom-remove" :class="customRemove">
            <span v-on:click="openImage()">REMOVE FILE</span>
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
  </div>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
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
      dropzoneOptions: {
        url: "https://dev-hrm.business-in-a-box.com/",
        thumbnailWidth: 120,
        thumbnailHeight: 120,
        addRemoveLinks: true,
        maxFilesize: 1,
        maxFiles: 1,
        init: function () {
          this.on("maxfilesexceeded", function (file) {
            this.removeAllFiles();
            this.addFile(file);
          });
        },
      },
    };
  },
  methods: {
    openImage: function () {
      this.$refs.myVueDropzone.dropzone.element.click();
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
