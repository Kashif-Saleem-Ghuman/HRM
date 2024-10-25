<template>
    <bib-modal-wrapper title="Select files" @close="$emit('modalOpenHandler')">
        <template slot="content">
            <div>
            <bib-input
                type="file"
                ref="files"
                @files-dropped="handleChange__FileInput"
                variant="accepted"
                iconLeft="upload"
                placeholder="Drop file here or click to upload"
            ></bib-input>
            </div>
        </template>
        <template slot="footer">
            <div class="d-flex">
            <bib-button @click="$emit('modalOpenHandler')" label="Cancel" :variant="isLightThemeCheck ? 'light' : 'secondary'" pill></bib-button>
            <bib-button @click="uploadFiles" label="Upload" variant="primary-24" class="ml-auto" pill></bib-button>
            </div>
        </template>
    </bib-modal-wrapper>
</template>

<script>
export default {
    data() {
        return {
            files: [],
        }
    },

    methods: {
        handleChange__FileInput(files) {
            this.files = files;
        },
        async uploadFiles() {
            this.$emit('modalOpenHandler');
            this.$emit('fileUpload', this.files);
            this.files = [];
        }
    }
}
</script>