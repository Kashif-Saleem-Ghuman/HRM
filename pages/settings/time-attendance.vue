<template>
  <div class="setting-wrapper py-1 mt-1 px-1 mx-1 w-50 shape-rounded">
    <div class="border-gray2 mb-1 shape-rounded">
      <template>
        <bib-detail-collapse
          label="Timesheet Settings"
          open
          :variant="isLightThemeCheck ? 'dark' : 'light'"
        >
          <template v-slot:content>
            <div class="row mx-0 px-1">
              <div class="col-12 pb-2 helper-text">Helper Text</div>
            </div>
            <div class="row mx-0 px-1">
              <div class="col-3">
                <bib-input
                  label="Timesheets Period"
                  name="period"
                  v-model="form.period"
                  :options="periodOptions"
                  @input="handleInput('period', $event)"
                  size="md"
                  type="select"
                  :variant="themeInputVariant"
                ></bib-input>
              </div>
            </div>
            <div class="row mx-0 px-1 d-flex align-end">
              <div class="col-3">
                <bib-input
                  label="Timesheet start on"
                  name="dayOn"
                  v-model="form.dayOn"
                  :options="dayOptions"
                  size="md"
                  type="select"
                  :variant="themeInputVariant"
                ></bib-input>
              </div>
              <div class="col-3">
                <bib-time-picker-wrapper
                  v-model="form.onTime"
                  name="onTime"
                  placeholder="--"
                  @input="handleInput('onTime', $event)"
                  class="ml-1 custom-margin"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0 px-1 d-flex align-end">
              <div class="col-3">
                <bib-input
                  label="Timesheet end"
                  name="dayEnd"
                  v-model="form.dayEnd"
                  :options="dayOptions"
                  size="md"
                  :variant="themeInputVariant"
                  type="select"
                ></bib-input>
              </div>
              <div class="col-3">
                <bib-time-picker-wrapper
                  v-model="form.endTime"
                  name="endTime"
                  placeholder="--"
                  @input="handleInput('endTime', $event)"
                  class="ml-1 custom-margin"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0 px-1">
              <div class="col-3">
                <bib-input
                  label="Weekly Work Hours"
                  type="number"
                  class="input-field"
                  v-model="form.hours"
                  placeholder=""
                  :min="10"
                  :max="100"
                  :variant="themeInputVariant"
                ></bib-input>
              </div>
            </div>
          </template>
        </bib-detail-collapse>
      </template>
    </div>

    <div class="border-gray2 mb-1 shape-rounded">
      <template>
        <bib-detail-collapse
          label="Daily Record"
          open
          :variant="isLightThemeCheck ? 'dark' : 'light'"
        >
          <template v-slot:content>
            <div class="row mx-0 px-1">
              <div class="col-12 pb-2 helper-text">Helper Text</div>
            </div>
            <div class="row mx-0">
              <div class="col-3">
                <bib-time-picker-wrapper
                  label="Clock-in Time"
                  v-model="form.inTime"
                  name="inTime"
                  placeholder="--"
                  @input="handleInput('inTime', $event)"
                  class="ml-1"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0">
              <div class="col-3">
                <bib-time-picker-wrapper
                  label="Clock-out Time"
                  v-model="form.outTime"
                  name="outTime"
                  placeholder="--"
                  @input="handleInput('outTime', $event)"
                  class="ml-1"
                ></bib-time-picker-wrapper>
              </div>
            </div>
          </template>
        </bib-detail-collapse>
      </template>
    </div>
  </div>
</template>
<script>
import { WEEK_DAY, PERIOD_OPTIONS } from "@/utils/constant/Settings.js";
import axios from "axios";

export default {
  data() {
    return {
      form: {}, // Blank form object
      updateForm: {},
      periodOptions: PERIOD_OPTIONS,
      dayOptions: WEEK_DAY,
      period: null,
    };
  },
  mounted() {
    this.fetchSettingsDetail();
  },
  methods: {
    async fetchSettingsDetail() {
      try {
        const response = await axios.get("/api/settings");
        if (response.data) {
          this.form = { ...response.data };
        }
      } catch (error) {
        console.error("Failed to fetch settings:", error);
      }
    },
    async handleInput(name, event) {
      const value = event.target ? event.target.value : event;
      this.form = {
        ...this.form,
        [name]: value,
      };

      this.updateForm = {
        ...this.updateForm,
        [name]: value,
      };

      // try {
      //   const response = await axios.post(
      //     "/api/update-timesheet",
      //     this.updateForm
      //   );
      //   if (response.data) {
      //     this.form = { ...response.data };
      //   }
      // } catch (error) {
      //   console.error("API call failed:", error);
      // }
    },
  },
};
</script>

<style lang="scss">
.setting-wrapper{
.detail-collapse__header {
  position: relative;
  display: flex;
  align-items: center;
}

.detail-collapse__header__title {
  position: relative;
  z-index: 1; 
  margin-left:-10px;
  color:$black !important;
}

.icon {
  position: absolute;
  right: 13px; 
  z-index: 0; 
}
}
.detail-collapse__content {
  label {
    color: #85858f !important;
  }
}
.select_container {
  select {
    border: 1px $gray4 solid !important;
  }
}
.helper-text {
  margin-bottom: 1rem;
  border-bottom: 1px solid $gray4 !important;
  color: $gray1;
}

.input-field > .wrapper > input {
  border: 1px solid var(--bib-gray4) !important;
}
</style>
