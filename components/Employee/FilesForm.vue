<template>
  <div 
    class="file-upload-container"
    @dragover.prevent="handleDragOver"
    @dragleave.prevent="handleDragLeave"
    @drop.prevent="handleDrop"
    @dragenter.prevent="handleDragEnter"
    >
    <loader :loading="loading"></loader>

    <div class="px-1 py-1">
      <div v-if="!showNoFiles" class="py-cus file-ulpoad-custom" :key="fileList">
        <!-- <bib-input
          type="file"
          ref="filesUploaded"
          variant="primary-24"
          iconLeft="upload"
          placeholder="Drop file here or click to upload"
        ></bib-input> -->
        <bib-button
          label="Upload"
          size="lg"
          variant="primary"
          icon="upload"
          @click="modalOpenHandler"
          class="mt-025"
      ></bib-button>
      </div>
      <div v-if="isDragging" class="drag-overlay">
        <label :class="['drag-message', isLightThemeCheck ? 'bg-light text-dark' : 'bg-dark text-light']" v-if="!isModalOpened">Drop files here to upload</label>
      </div>

      <div v-else-if="showNoData && !isDragging" class="no-files-container">
        <div class="no-files-content">
          <label :class="[no-files-title, isLightThemeCheck ? 'text-dark' : 'text-light']">Drop file here or click to upload</label>
          <bib-button
            label="Upload"
            size="lg"
            variant="primary"
            icon="upload"
            @click="modalOpenHandler"
            class="mt-025"
          >
            <template #prepend>
              <bib-icon icon="upload" size="sm" />
            </template>
          </bib-button>
        </div>
      </div>


      <div
        v-else
        class="d-grid gap-2 py-1"
        :style="
          filesUploaded.length <= 1
            ? 'grid-template-columns: repeat(4, minmax(240px, 1fr)); overflow:hidden'
            : 'grid-template-columns: repeat(4, minmax(240px, 1fr))'
        "
      >
        <div
          v-for="file in filesUploaded"
          class="cursor-pointer shape-rounded mt-05 height-205 pl-05 d-flex justify-between align-center"
          :class="themeClassCommon"
          :key="file.id"
        >
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div class="d-flex align-center" @click="handleFileClick(file)">
              <bib-icon
                :icon="
                  !$getFileExtension(extensionsName(file))
                    ? 'image'
                    : $getFileExtension(extensionsName(file))
                "
                variant="gray5"
              ></bib-icon>
              <h5
                class="pl-025 font-w-400 of-hidden text-of-elipsis text-wrap"
                :title="file.name"
              >
                {{ decodedFileName(file) | truncate(55, "...") }}
              </h5>
            </div>
          </div>
          <div @click="deleteConfirmation(file.id)">
            <bib-icon
              icon="trash"
              class="mr-05 cursor-pointer"
              :variant="isLightThemeCheck ? 'danger' : 'danger'"
            ></bib-icon>
          </div>
        </div>
      </div>
      <confirmation-modal
        :title="deleteModalContent.title"
        :confirmationMessage="deleteModalContent.message"
        :confirmastionMessageModal="confirmastionMessageModal"
        @close="closeconfirmastionMessageModal"
        @on-click="deleteFile($event)"
      ></confirmation-modal>
      <file-upload-modal v-if="isModalOpened" @modalOpenHandler="modalOpenHandler" @fileUpload="fileUpload"></file-upload-modal>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getFiles,
  addFiles,
  deleteFiles,
} from "@/utils/functions/functions_lib_api";
import { downloadEmployeeFile } from "@/utils/functions/api_call/employees";
import { DELETE_MESSAGE } from "@/utils/constant/ConfirmationMessage";
export default {
  data() {
    return {
      id: "",
      files: [],
      filesUploaded: "",
      fileList: 0,
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE[0],
      deletedfileId: null,
      fileName: "",
      loading: false,
      isDragging: false,
      dragCounter: 0,
      isModalOpened: false,
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_ACTIVE_USER",
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
    }),
    showTable() {
      return !this.loading && this.filesUploaded?.length;
    },
    showNoData() {
      return (
        !this.loading && (!this.filesUploaded || !this.filesUploaded?.length)
      );
    },
    showNoFiles() {
      return !this.loading && (!this.filesUploaded || this.filesUploaded.length === 0);
    },
  },
  async created() {
    this.id = this.$route.params.id ?? this.getUser?.id;
    await this.fetchFiles();
  },
  methods: {
    addFiles,
    getFiles,
    deleteFiles,
    decodedFileName(file) {
      return decodeURIComponent(escape(file.name));
    },
    modalOpenHandler() {
      this.isModalOpened = !this.isModalOpened;
    },
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    extensionsName(file) {
      return (this.fileName = file.name.split(".").pop());
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    async fetchFiles() {
      this.loading = true;
      try {
        this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.filesUploaded.reverse();
      });
      } catch (error) {
        this.$apiError(error?.code === "ERR_NETWORK" ? 'ERR_NETWORK' : 500);
      }
      this.loading = false;
    },
    handleFileClick(file) {
      this.downloadFile(file);
    },

    async downloadFile(file) {
      try {
        const blob = await downloadEmployeeFile({
          employeeId: this.id,
          fileId: file.id,
        });
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = file.name;
        a.target = "_blank";
        a.click();
        window.open(dataUrl, "_blank");
        return;
      } catch (error) {
        console.error("Error downloading file", error);
      }
    },
    handleDragOver(event) {
      if (!this.isDragging) {
        this.isDragging = true;
      }
      event.dataTransfer.dropEffect = 'copy';
    },

    handleDragLeave(event) {
      this.dragCounter--;
      if (this.dragCounter === 0) {
        this.isDragging = false;
      }
    },
    async handleDragEnter(event) {
      this.dragCounter++;
      console.log("drag enter", event);
    },

    async handleDrop(event) {
      event.preventDefault();
      this.isDragging = false;
      this.dragCounter = 0;
      const files = Array.from(event.dataTransfer.files);
      await this.handleChange__FileInput(files);
      this.isModalOpened = false;
      this.confirmastionMessageModal = false;
    },
    async handleChange__FileInput(files) {
      this.files = files;
      const ofScrollYElement = document.querySelector('.input--file .of-scroll-y');
      if (ofScrollYElement) {
        ofScrollYElement.style.overflow = files.length === 1 ? 'hidden' : '';
      }
      await this.fileUpload();
    },
    async fileUpload(files = null) {
      this.loading = true;
      await this.addFiles(this.id, files || this.files);
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.files = [];
        this.filesUploaded.reverse();
        this.$openPopupNotification({
          text: "The file has been successfully uploaded.",
          variant: "primary-24",
        });
      });
      this.loading = false;
    },
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    async deleteFile() {
      this.loading = true;
      this.confirmastionMessageModal = false;
      await this.deleteFiles({ employeeId: this.id, id: this.deletedfileId });
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        return this.$openPopupNotification(8);
      });
      this.loading = false;
    },
  },
};
</script>

<style lang="scss">
.file-upload-container {
  position: relative;
  min-height: 100vh; // Ensure the container covers the full height of the page
}
.drag-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.drag-message {
  padding: 20px;
  border-radius: 8px;
  font-size: 24px;
  margin-left: 18%;
  margin-top: 1%;
  label{
    font-size: 2rem;
    font-weight: 400;
    padding-bottom: 5px;
    display: block;
  }
}

.no-files-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 15rem;
  label{
    font-size: 0.9rem;
    font-weight: 400;
    padding-bottom: 5px;
    display: block;
  }
}

.no-files-content {
  text-align: center;
  border: 1px solid $light;
  border-radius: 8px;
  padding: 2rem 22rem;
}

.no-files-title {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}


.file-ulpoad-custom {
  width: 50%;
  display: flex;
  .input--file {
    div {
      // background-color: $white;
      div:nth-child(1) {
        align-items: center;
        display: flex;
      }
    }
    .of-scroll-y {
      max-height: 300px !important;
    }
  }
}
</style>
