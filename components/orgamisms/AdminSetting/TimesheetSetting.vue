<template>
  <div>
    <div class="mb-1 shape-rounded pb-05":class="isLightThemeCheck ? 'border-gray2' : 'border-dark-sub3'">
      <template>
        <bib-detail-collapse
          label="Timesheet Settings"
          open
          :variant="isLightThemeCheck ? 'dark' : 'light'"
        >
          <template v-slot:content>
            <div class="row mx-0 px-1">
              <div class="col-12 pb-2 helper-text" :class="isLightThemeCheck ? 'border-bottom-gray4' : 'border-bottom-dark-sub3'">Helper Text</div>
            </div>
            <div class="row mx-0 px-1">
              <div class="col-3">
                <bib-input
                  label="Timesheets Period"
                  name="timesheetPeriod"
                  v-model="form.timesheetPeriod"
                  :options="periodOptions"
                  @input="handleInput('timesheetPeriod', $event)"
                  size="md"
                  type="select"
                  :variant="isLightThemeCheck ? 'light' : 'dark'"
                ></bib-input>
              </div>
            </div>
            <div class="row mx-0 px-1 d-flex align-end">
              <div class="col-3">
                <bib-input
                  label="Timesheet start on"
                  name="timesheetStartday"
                  v-model="form.timesheetStartday"
                  :options="dayOptions"
                  @input="handleInput('timesheetStartday', $event)"
                  size="md"
                  type="select"
                  :variant="isLightThemeCheck ? 'light' : 'dark'"
                ></bib-input>
              </div>
              <div class="col-3">
                <bib-time-picker-wrapper
                  v-model="form.timesheetStart"
                  name="timesheetStart"
                  placeholder="--"
                  @input="handleInput('timesheetStart', $event)"
                  class="ml-1 custom-margin"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0 px-1 d-flex align-end">
              <div class="col-3">
                <bib-input
                  label="Timesheet end"
                  name="timesheetEndday"
                  v-model="form.timesheetEndday"
                  :options="dayOptions"
                  @input="handleInput('timesheetEndday', $event)"
                  size="md"
                  type="select"
                  :variant="isLightThemeCheck ? 'light' : 'dark'"
                ></bib-input>
              </div>
              <div class="col-3">
                <bib-time-picker-wrapper
                  v-model="form.timesheetEnd"
                  name="timesheetEnd"
                  placeholder="--"
                  @input="handleInput('timesheetEnd', $event)"
                  class="ml-1 custom-margin"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0 px-1">
              <div class="col-3">
                <bib-input
                  label="Weekly Work Hours"
                  type="number"
                  v-model="form.weeklyWorkHours"
                  @change="handleInput('weeklyWorkHours', $event)"
                  :min="10"
                  :variant="isLightThemeCheck ? 'light' : 'dark'"
                  :max="100"
                ></bib-input>
              </div>
            </div>
          </template>
        </bib-detail-collapse>
      </template>
    </div>
    <div class="mb-1 shape-rounded pb-05":class="isLightThemeCheck ? 'border-gray2' : 'border-dark-sub3'">
      <template>
        <bib-detail-collapse
          label="Daily Record"
          open
          :variant="isLightThemeCheck ? 'dark' : 'light'"
        >
          <template v-slot:content>
            <div class="row mx-0 px-1">
              <div class="col-12 pb-2 helper-text" :class="isLightThemeCheck ? 'border-bottom-gray4' : 'border-bottom-dark-sub3'">Helper Text</div>
            </div>
            <div class="row mx-0">
              <div class="col-3">
                <label class="ml-1">Clock-in time</label>
                <bib-time-picker-wrapper
                  v-model="form.clockInTime"
                  name="clockInTime"
                  placeholder="--"
                  @input="handleInput('clockInTime', $event)"
                  class="ml-1"
                ></bib-time-picker-wrapper>
              </div>
            </div>
            <div class="row mx-0">
              <div class="col-3">
                <label class="ml-1">Clock-out time</label>
                <bib-time-picker-wrapper
                  v-model="form.clockOutTime"
                  name="clockOutTime"
                  placeholder="--"
                  @input="handleInput('clockOutTime', $event)"
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
import {PERIOD_OPTIONS, WEEK_DAY} from "@/utils/constant/Settings";
import {updateTimesheetSetting} from "@/utils/functions/api_call/admin-setting";
import {FETCH_TIMESHEET_SETTING} from "@/utils/constant/Constant";

export default {
  props: {
    timesheetSetting: {
      type: Object,
    },
    organizationId: {
      type: String | Number,
    },
  },
  computed: {
    form() {
      return { ...this.timesheetSetting };
    }
  },
  data() {
    return {
      periodOptions: PERIOD_OPTIONS,
      dayOptions: WEEK_DAY,
      period: null,
    }
  },
  methods: {
    isWeekTotalHourInvalid (val) {
      return val < 0;
    },
    async handleInput(name, value) {
      if (name === 'weeklyWorkHours' && this.isWeekTotalHourInvalid(value)) {
        this.$openPopupNotification({
          text: "Weekly Work Hours can't be less than 1",
          variant: "danger",
        });
        return;
      }
      try {
        const payload = { ...this.form, [name]: value }
        await updateTimesheetSetting(this.organizationId, payload);
        this.$openPopupNotification({
          text: "Settings updated successfully!",
          variant: "success",
        });
        this.$nuxt.$emit(FETCH_TIMESHEET_SETTING);
      } catch (error) {
        this.$openPopupNotification({
          text: error.response.data.message,
          variant: "danger",
        });
      }
    },
  },
}
</script>
