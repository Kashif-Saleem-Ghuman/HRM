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
            <bib-button @click="$emit('modalOpenHandler')" label="Cancel" variant="light" pill></bib-button>
            <bib-button label="Upload" variant="success" class="ml-auto" pill></bib-button>
            </div>
        </template>
    </bib-modal-wrapper>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>