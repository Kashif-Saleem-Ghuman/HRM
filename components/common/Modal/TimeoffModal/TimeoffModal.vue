<template>
  <div class="modal-wrapper custom-input">
    <bib-modal-wrapper
      v-if="timeOffModal"
      @close="$emit('close')"
      size="xl"
      title="+ Timeoff Request"
    >
      <template slot="content">
        <div class="">
          <div class="row mx-0">
            <div class="col-6">
              <bib-input
                type="date"
                label="From Date"
                v-model="firstname"
                placeholder="Type your firstName"
                @change="$emit('input', $event, 'firstName')"
                :disabled="inActive"
              ></bib-input>
            </div>
            <div class="col-6">
              <bib-input
                type="date"
                label="To Date"
                v-model="lastname"
                placeholder="Type your lastName"
                @change="$emit('input', $event, 'lastName')"
                :disabled="inActive"
              ></bib-input>
            </div>
          </div>
        </div>
        <div class="">
          <div class="row mx-0">
            <div class="col-6">
              <bib-input
                type="time"
                label="Start Time"
                v-model="firstname"
                placeholder="Type your firstName"
                @change="$emit('input', $event, 'firstName')"
                :disabled="inActive"
              ></bib-input>
            </div>
            <div class="col-6">
              <bib-input
                type="time"
                label="End Time"
                v-model="lastname"
                placeholder="Type your lastName"
                @change="$emit('input', $event, 'lastName')"
                :disabled="inActive"
              ></bib-input>
            </div>
          </div>
        </div>
        <div class="">
          <div class="row mx-0">
            <div class="col-6">
              <bib-input
                type="text"
                label="Category"
                v-model="firstname"
                placeholder="00:00"
                @change="$emit('input', $event, 'firstName')"
                :disabled="inActive"
              ></bib-input>
            </div>
            <div class="col-3">
              <bib-input
                type="text"
                label="Days"
                v-model="lastname"
                placeholder="00:00"
                @change="$emit('input', $event, 'lastName')"
                :disabled="inActive"
              ></bib-input>
            </div>
            <div class="col-3">
              <bib-input
                type="text"
                label="Hours"
                v-model="lastname"
                placeholder="Type your Category"
                @change="$emit('input', $event, 'lastName')"
                :disabled="inActive"
              ></bib-input>
            </div>
          </div>
        </div>
        <div class="row mx-0">
        <div class="col-12">
          <bib-input
            type="textarea"
            v-model="note"
            placeholder="Type Note/Reason"
            label="Note/Reason"
            @change="$emit('input', $event, 'note')"
          ></bib-input>
        </div>
      </div>
      </template>
      <template slot="footer">
        <div class="align-right" style="text-align: right;">
          <bib-button label="Cancel" variant="success" size="xl" pill></bib-button>
          <bib-button
            label="Done"
            variant="success"
            class="ml-auto"
            size="xl"
            pill
          ></bib-button>
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>
<script>
export default {
  name: "TimeoffModal",
  props: {
    timeOffModal: {
      type: String,
    },
  },
  data() {
      return {
    // modal3Opened: false,
        // timesheetModalData:TIMESHEET_DATA
      };
  },
};
</script>
<style lang="scss">
.modal-wrapper-custom {
  .modal__wrapper__content {
    padding: 0rem !important;
  }
}
.input-mand {
  display: flex;
  align-items: center;
  font-weight: 600;
  label {
    font-size: 12px;
  }
  span {
    color: #fa0f00;
    margin-left: 2px;
  }
}
.timesheet-wrapper {
  padding: 1rem;
  font-size: 12px;
  color: #86868a;
  .list-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .calStyle {
      display: flex;
      align-items: center;
      font-weight: 600;
      text-decoration: underline;
    }
    label {
      font-size: 14px;
      font-weight: 600;
      color: #000;
    }
    .em-desc {
      font-size: 12px;
    }
  }
}
</style>
