<template>
  <div class="dropzone-box">
 <vue-dropzone ref="myVueDropzone" id="dropzone" 
               :options="dropzoneOptions" 
               :use-custom-slot=true
               @vdropzone-removed-file="openImage()">
      <div class="d-flex align-center">
                <div class="mr-1">
                    <bib-avatar size="120px" :src="src" class="avtar-border"></bib-avatar>
                </div>
                <div>
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
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
    props:{
        src:{
            type:String
        }
    },
    name: 'app',
    components: {
        vueDropzone: vue2Dropzone
    },
    data: function () {
        return {
            dropzoneOptions: {
                previewTemplate: this.getTempalte(),
                url: '/testupload',
                thumbnailWidth: 120,
                thumbnailHeight: 120,
                addRemoveLinks: true,
                maxFiles: 1,
                init: function() {
                     this.on("maxfilesexceeded", function(file) { 
                        this.removeAllFiles(); this.addFile(file); 
                    })
                }
            },
            
        }
    },
    methods: {
        openImage: function() {
      this.$refs.myVueDropzone.dropzone.element.click()
    },
    getTempalte: function() {
      return `
      <div class="dz-preview dz-file-preview" id="dropzone">
        <div class="dz-image">
          <img data-dz-thumbnail></img>
        </div>
        <div class="custom-detail">
        <h3>Employee Name Goes Here</h3>
        </div>
        <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
        <div class="dz-error-message"><span data-dz-errormessage></span></div>
        <div class="dz-success-mark"><i class="fa fa-check"></i></div>
        <div class="dz-error-mark"><i class="fa fa-close"></i></div>
      </div>`
    }
    }
}
</script>
<style lang="scss">
.dropzone-box {
    border:0;
    .dropzone {
        padding: 0px;
        margin-right: auto;

        &:hover {
            background: none
        }
    }
    .avtar-border{
        border:solid 1px #9E9EFF
    }
}
.vue-dropzone {
    color: #777;
    width:  100%;
    // height: 200px;
    min-height:auto;
    padding: 0px;
    border:0;
    h3 {
            font-size: 1rem;
            color: #8989FF;
            font-weight: 600;
            margin: 0
        }
        p {
            font-size: 14px;
            color: #8989FF;
            font-weight: 500;
            line-height:24px;
            margin: 0
        }
        .dz-message{
    margin:0
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
border:0;
}

.dz-progress {
//   display: none;
}
.dropzone .dz-preview .dz-image img{
    border-radius:50%;
    border:solid 1px #9E9EFF
}
.dropzone .dz-preview:hover .dz-image img
{
    -webkit-transform: scale(1, 1) !important;
    -moz-transform: scale(1, 1) !important;
    -ms-transform: scale(1, 1) !important;
    -o-transform: scale(1, 1) !important;
    transform: scale(1, 1) !important;
    -webkit-filter: blur(0px) !important;
    filter: blur(0px) !important;
    border-radius:50%
}

.dz-success-mark, .dz-error-mark {
    display: none;
}

.vue-dropzone>.dz-preview .dz-remove {
    position: inherit;
    z-index: 1330;
    color: #000;
    padding: 0px;
    bottom: 50px;
    left:125px;
    border: 1px #8989FF solid;
    opacity: 1;
    width:auto;
    letter-spacing:normal;
    // display:none;
}
.vue-dropzone>.dz-preview .dz-remove:hover {
    color: #fff;
    background-color:#8989FF;
    border: 1px #8989FF solid;
    opacity: 1;
    text-decoration:none;
    
}

.dropzone-custom-content {
  margin-top: 30px;
}

.custom-detail {
    position: absolute;
    width: 200%;
    height: 200px;
    margin-left: 140px;
    top: 2rem;
}

.dropzone-box {
  width: 100%;
  height: auto;
//   border: 2px solid #e5e5e5;
}

.custom-detail .dz-size{
  margin-top: 60px;
  font-size: 14px;
    color: #8989FF;
    font-weight: 500;
    margin: 0
}

.custom-detail .dz-filename{
    color: #8989FF;
    font-weight: 500;
    margin: 0
}

</style>