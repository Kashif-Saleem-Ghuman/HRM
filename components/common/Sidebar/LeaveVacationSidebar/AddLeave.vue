<template>
    <div>
        <div class="pt-2">
            <div class="row">
              <div class="col-12">
                <bib-input
                  type="text"
                  label="Employee"
                  icon-left="user"
                  placeholder="Employee"
                  @change="$emit('input', $event, 'firstName')"
                ></bib-input>
              </div>
              </div>
              <div class="row">
              <div class="col-12">
                <bib-input
                  type="select"
                  label="Leave type"
                  placeholder="Select your Leave type"
                  @change="$emit('input', $event, 'leaveType')"
                ></bib-input>
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <bib-input
                  type="text"
                  label="Message"
                  placeholder="Enter message"
                  @change="$emit('input', $event, 'firstName')"
                ></bib-input>
              </div>
              <div class="col-4">
                <bib-input
                  type="text"
                  label="Message"
                  placeholder="Enter message"
                  @change="$emit('input', $event, 'firstName')"
                ></bib-input>
              </div>
              <div class="col-4">
                <bib-input
                  type="text"
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
