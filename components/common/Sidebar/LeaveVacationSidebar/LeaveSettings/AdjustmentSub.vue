<template>
    <div class="rounded-border shape-rounded p-05 mt-05">
      <div class="row pl-05">
        <div class="col-12">
          <label>Adjustment</label>
        </div>
      </div>
      <div class="row px-05 mt-05">
        <div class="col-6">
          <label class="font-w-600 custom-color">Effective Date</label>
          <bib-datetime-picker
            v-model="vacation_adjustment_date"
            placeholder="00-00-000"
            @input="onChange"
          ></bib-datetime-picker>
        </div>
      </div>
      <div class="row px-05">
        <div class="col-4 pr-05">
          <label class="font-w-600 custom-color">Action</label>
          <bib-input
            v-model="action"
            :options="actionOptions"
            @input="setAction(action)"
            size="md"
            type="select"
            :variant="themeInputVariant"
          ></bib-input>
        </div>
        <div class="col-4 pr-05">
          <label class="font-w-600 custom-color">Days</label>
          <bib-input
            type="text"
            :variant="isLightThemeCheck ? 'light' : 'dark'"
            v-model="vacationDays"
            name="vacationDays"
            placeholder="#"
          ></bib-input>
        </div>
        <div class="col-4">
          <label class="font-w-600 custom-color">Hours</label>
          <bib-time-picker-wrapper
            v-model="vacationTime"
            name="vacationTime"
            placeholder="-- : --"
            label=""
            @input="timeInputBlur"
          ></bib-time-picker-wrapper>
        </div>
      </div>
      <div class="row px-05">
        <div class="col-12">
          <label class="font-w-600 custom-color">Reason</label>
          <bib-input
            v-model="vacationReason"
            type="textarea"
            placeholder="Enter Reason"
            :variant="themeInputVariant"
          ></bib-input>
        </div>
      </div>
      <div class="d-flex gap-05">
        <bib-button
          label="Cancel"
          :variant="isLightThemeCheck ? 'gray' : 'light'"
          class="button-wrapper-align w-100 font-sm"
          @click="cancelAdjustment"
        ></bib-button>
        <bib-button
          label="Update"
          variant="primary-24"
          class="button-wrapper-align w-100 font-sm"
          @click.native.stop="handleSingleClick"
          @dblclick.native.stop="handleDoubleClick"
        ></bib-button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      vacation_adjustment_date: String,
      actionOptions: Array,
      action: String,
      vacationDays: Number,
      vacationTime: String,
      vacationReason: String,
    },
    methods: {
      cancelAdjustment() {
        this.$emit("cancelAdjustment");
      },
    },
  };
  </script>
  
  