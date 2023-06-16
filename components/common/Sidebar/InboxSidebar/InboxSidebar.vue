<template>
    <div>
        <div class="pt-2">
            <div class="row">
              <div class="col-12">
                <bib-input
                  type="text"
                  label="To"
                  icon-left="user"
                  placeholder="Enter email"
                  @change="$emit('input', $event, 'firstName')"
                  :disabled="inActive"
                ></bib-input>
              </div>
              </div>
              <div class="row">
              <div class="col-12">
                <bib-input
                  type="text"
                  label="Subject"
                  placeholder="Type your subject"
                  @change="$emit('input', $event, 'lastName')"
                  :disabled="inActive"
                ></bib-input>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <bib-input
                  type="textarea"
                  label="Message"
                  placeholder="Enter message"
                  @change="$emit('input', $event, 'firstName')"
                  :disabled="inActive"
                ></bib-input>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>
