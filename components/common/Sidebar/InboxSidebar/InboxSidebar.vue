<template>
    <div>
        <div class="pt-2">
            <div class="row">
              <div class="col-12">
                <bib-input
                  type="text"
                  label="To"
                  v-model="firstname"
                  icon-left="user"
                  placeholder="Enter your first name"
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
                  v-model="lastname"
                  placeholder="Type your last name"
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
                  v-model="firstname"
                  placeholder="Enter your first name"
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
