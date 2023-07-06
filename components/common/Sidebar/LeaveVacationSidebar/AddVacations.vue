<template>
    <div>
        <div class="pt-2">
            <div class="row">
                <h1>Vacation</h1>
              <div class="col-12">
                <bib-input
                  type="text"
                  label="To"
                  icon-left="user"
                  placeholder="Enter email"
                  @change="$emit('input', $event, 'firstName')"
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
