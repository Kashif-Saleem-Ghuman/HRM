<template>
  <div>
    <loader :loading="loading"></loader>

    <div class="px-1 py-1">
      <div class="py-cus file-ulpoad-custom" :key="fileList">
        <bib-input
          type="file"
          ref="filesUploaded"
          @files-dropped="handleChange__FileInput"
          variant="primary-24"
          iconLeft="upload"
          placeholder="Drop file here or click to upload"
        ></bib-input>
        <!-- <bib-button
        label="Upload"
        size="lg"
        variant="primary"
        @click="fileUpload"
        class="mt-025"
      ></bib-button> -->
      </div>
      <no-record v-if="showNoData"></no-record>

      <div
        class="d-grid gap-2 py-1"
        style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))"
        v-else-if="showTable"
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
              <bib-icon
                :icon="
                  getFileExtension(extensionsName(file)) === undefined
                    ? 'image'
                    : getFileExtension(extensionsName(file))
                "
                variant="gray5"
              ></bib-icon>
              <h5
                class="pl-025 font-w-400 of-hidden text-of-elipsis text-wrap"
                :title="file.name"
              >
                {{ file.name | truncate(45, "...") }}
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
      <confirmation-modal
        :title="deleteModalContent.title"
        :confirmationMessage="deleteModalContent.message"
        :confirmastionMessageModal="confirmastionMessageModal"
        @close="closeconfirmastionMessageModal"
        @on-click="deleteFile($event)"
      ></confirmation-modal>
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
import { getFileExtension } from "../../utils/functions/status-helpers";
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
      loading: true,
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
  },
  async created() {
    this.id = this.$route.params.id ?? this.getUser?.id;
    await this.fetchFiles();
  },
  methods: {
    addFiles,
    getFiles,
    deleteFiles,
    openPopupNotification(notification) {
      this.$store.dispatch("app/addNotification", { notification });
    },
    getFileExtension,
    extensionsName(file) {
      return (this.fileName = file.name.split(".").pop());
    },
    closeconfirmastionMessageModal() {
      this.confirmastionMessageModal = false;
    },
    async fetchFiles() {
      this.loading = true;
      this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.filesUploaded.reverse();
        this.loading = false;
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
      await this.fileUpload();
    },
    async fileUpload() {
      await this.addFiles(this.id, this.files);
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.files = [];
        this.filesUploaded.reverse();
        this.openPopupNotification({
          text: "The file has been successfully uploaded.",
          variant: "primary-24",
        });
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
.file-ulpoad-custom {
  width: 50%;
  display: flex;
  .input--file {
    div {
      background-color: $white;
      div:nth-child(1) {
        align-items: center;
        display: flex;
      }
    }
  }
}
</style>
