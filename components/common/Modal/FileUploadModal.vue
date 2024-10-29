<template>
    <bib-modal-wrapper title="Select files" @close="$emit('modalOpenHandler')">
        <template slot="content">
            <div class="input--file file-custom-wrapper">
            <bib-input
                type="file"
                ref="files"
                @files-dropped="handleChange__FileInput"
                variant="primary-24"
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
            debounced: false,
        }
    },

    methods: {
        handleChange__FileInput(files) {
            this.files = files;
        },
        debouncedNotification(message, variant, delay = 3000) {
            if (!this.debounced) {
                this.$openPopupNotification({
                    text: message,
                    variant: variant,
                });
                this.debounced = true;
                setTimeout(() => {
                this.debounced = false;
                }, delay);
            }
        },
        async uploadFiles() {
            if(this.files.length === 0) {
                this.debouncedNotification('No files selected', 'danger');
                return;
            };
            this.$emit('modalOpenHandler');
            this.$emit('fileUpload', this.files);
            this.files = [];
        }
    }
}
</script>

<style lang="scss">
.file-custom-wrapper {
    max-height: 250px;
    overflow-y: auto;
    .of-scroll-y {
        overflow: hidden !important;
        padding-bottom: 5px !important;
    }
}
</style>