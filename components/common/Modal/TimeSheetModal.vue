<template>
  <div class="modal-wrapper-custom max-min-z-index">
    <bib-modal-wrapper v-if="timesheetModal" @close="$emit('close')" size="xl">
      <template slot="content">
        <div class="timesheet-wrapper">
          <div class="list-item">
            <div class="d-flex align-center">
              <bib-avatar
                :src="items.photo"
                size="3rem"
                class="mr-05"
              ></bib-avatar>
              <div>
                <label>
                  {{ items.firstName + " " + items.lastName }}
                </label>
                <div class="em-desc">{{ items.email }}</div>
              </div>
            </div>
            <div class="calStyle">
              <bib-icon
                class="mb-auto mt-auto"
                icon="calendar-solid"
                :scale="0.9"
              ></bib-icon>
              <span class="text-dark ml-05"
                >weekday 00-00-0000</span
              >
            </div>
          </div>
        </div>
        <div class="mb-1 bg-light height-1"></div>
        <div class="px-1">
          <div class="row mx-0">
            <div class="col-6">
              <div class="input-mand">
                <label>Time IN </label><span>*</span>
              </div>
              <bib-input
                type="text"
                placeholder="00:00:00"
                @input="$emit('input', $event, 'startWeekDay')"
                icon-left="time"
              ></bib-input>
            </div>
            <div class="col-6">
              <div class="input-mand">
                <label>Time OUT </label><span>*</span>
              </div>
              <bib-input
                type="text"
                v-model="weekStart"
                placeholder="00:00:00"
                icon-left="time"
                @input="$emit('input', $event, 'startWeekDay')"
              ></bib-input>
            </div>
          </div>
        </div>
        <div class="mb-1 mt-1 bg-light height-1"></div>
        <div class="px-1 pb-3">
        </div>
      </template>
    </bib-modal-wrapper>
  </div>
</template>
<script>
export default {
  name: "TimeSheetModal",
  props: {
    items: {
      type: Array,
      default() {
        return null;
      },
    },
    timesheetModal: {
      type: Boolean,
    },
  },
  data() {
    return {
      // modal3Opened: false,
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
