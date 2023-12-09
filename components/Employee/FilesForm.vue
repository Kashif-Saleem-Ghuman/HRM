<template>
  <div class="px-1 py-1 of-scroll-y">
    <div class="py-cus custom-dropzone" :key="fileList">
      <bib-input
        type="file"
        ref="filesUploaded"
        @files-dropped="handleChange__FileInput"
        variant="accepted"
        iconLeft="upload"
        placeholder="Drop file here or click to upload"
      ></bib-input>
      <bib-button
        label="Upload"
        size="lg"
        variant="primary"
        @click="fileUpload"
        class="mt-025"
      ></bib-button>
    </div>
    <div
      class="d-grid gap-2 py-1 of-scroll-y"
      style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
    >
      <div
        v-for="file in filesUploaded"
        class="cursor-pointer shape-rounded mt-05 height-205 pl-05 d-flex justify-between align-center bg-light"
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
            <bib-icon :icon="getFileExtension(file)" variant="gray5"></bib-icon>
            <h5 class="pl-025 font-w-400 of-hidden text-of-elipsis text-wrap">
              {{ file.name }}
            </h5>
          </div>
        </div>
        <div @click="deleteConfirmation(file.id)">
          <bib-icon
            icon="trash"
            class="mr-05 cursor-pointer"
            variant="danger"
          ></bib-icon>
        </div>
      </div>
    </div>
    <bib-notification :popupMessages="popupMessages"></bib-notification>
    <confirmation-modal
      :title="deleteModalContent.title"
      :confirmationMessage="deleteModalContent.message"
      :confirmastionMessageModal="confirmastionMessageModal"
      @close="closeconfirmastionMessageModal"
      @deleteLeave="deleteFile($event)"
    ></confirmation-modal>
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
import { popupNotificationMsgs } from "@/utils/constant/Notifications";
import { openPopupNotification } from "@/utils/functions/functions_lib.js";
import { DELETE_MESSAGE } from "@/utils/constant/ConfirmationMessage";

export default {
  data() {
    return {
      id: "",
      files: [],
      filesUploaded: "",
      fileList: 0,
      popupNotificationMsgs: popupNotificationMsgs,
      popupMessages: [],
      confirmastionMessageModal: false,
      deleteModalContent: DELETE_MESSAGE.deleteConfirmationMessage[0],
      deletedfileId: null,
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
      getUserRole: "token/getUserRole",
    }),
  },
  async created() {
    this.id = this.$route.params.id ?? this.getUser?.id;
    await this.fetchFiles();
  },
  methods: {
    addFiles,
    getFiles,
    deleteFiles,
    openPopupNotification,
    getFileExtension(file) {
      var icon =
        file.name.split(".").pop() == "pdf"
          ? "pdf"
          : "" || file.name.split(".").pop() == "docx"
          ? "word"
          : "user-solid" || file.name.split(".").pop() == "jpg"
          ? "user-solid"
          : "" || file.name.split(".").pop() == "xlsx"
          ? "excel"
          : "file";
      return icon;
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    async fetchFiles() {
      this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.filesUploaded.reverse();
      });
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
    async handleChange__FileInput(files) {
      this.files = files;
    },
    async fileUpload() {
      await this.addFiles(this.id, this.files);
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.files = [];
        this.filesUploaded.reverse();
      });
    },
    deleteConfirmation(id) {
      this.deletedfileId = id;
      this.confirmastionMessageModal = true;
    },
    async deleteFile() {
      await this.deleteFiles({ employeeId: this.id, id: this.deletedfileId });
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.confirmastionMessageModal = false;
        return this.openPopupNotification(8);
      });
    },
  },
};
</script>

<style lang="scss">
.custom-dropzone {
  width: 50%;
  display: flex;
  border: 1px dotted #2ba026 !important;
  justify-content: space-between;
  background-color: #eef7ee;
  align-items: flex-start;
  border-radius: 6px;
  padding: 10px;
  margin: 20px 0;
  .input--file {
    background: #fff;
    margin: 0 10px;
    border-radius: 6px;
    div {
      background-color: #fff;
      border-radius: 10px;
      max-height: 150px !important;
      div:nth-child(1) {
        align-items: center;
        display: flex;
      }
    }
  }
}
</style>
