<template>
  <div class="px-1 py-1 of-scroll-y">
    <!-- <div class="d-grid gap-2" style="grid-template-columns: repeat(auto-fit, minmax(265px, 1fr));" >
    <div v-for="file in filesUploaded" @click="handleFileClick(file)">
    <files :files="file"></files>
  </div>
  </div> -->
  <div class="d-grid gap-2 px-1 py-1 of-scroll-y" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
    <div
      v-for="file in filesUploaded"
      class="cursor-pointer shape-rounded mt-05 height-205 pl-05 d-flex justify-between align-center bg-light"
      @click="handleFileClick(file)"
      :key="file.id"
    >
      <div class="d-flex align-center">
        <bib-icon
          :icon="
            file.name.split('.').pop() == 'pdf'
              ? 'pdf'
              : '' || file.name.split('.').pop() == 'docx'
              ? 'word'
              : '' || file.name.split('.').pop() == 'word'
              ? 'excel'
              : ''
          "
          variant="gray5"
        ></bib-icon>

        <h5 class="pl-025 font-w-400 of-hidden text-of-elipsis text-wrap">
          {{ file.name }}
        </h5>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  getFiles,
} from "../../../utils/functions/functions_lib_api";
import { downloadEmployeeFile } from "@/utils/functions/api_call/employees";

export default {
  data() {
    return {
      id: "",
      files: [],
      filesUploaded: "",
    };
  },
  computed: {
    ...mapGetters({
      getUser: "employee/GET_USER",
      getAccessToken: "token/getAccessToken",
    }),
  },

  async created() {
    this.id = this.$route.params.id;
    this.getFiles(this.id).then((result) => {
      this.filesUploaded = result;
      this.filesUploaded.reverse();
    });
  },
  methods: {
    getFiles,
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

        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading file", error);
      }
    },
    async fileUpload() {
      await this.addFiles(this.id, this.files);
      await this.getFiles(this.id).then((result) => {
        this.filesUploaded = result;
        this.fileList += 1;
        this.filesUploaded.reverse();
      });
    },
  },
};
</script>

<style></style>
