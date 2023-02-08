<template>
  <div>
    <div class="row mx-0">
      <div class="col-12">
        <label class="switcher_label">Same as org setting</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="orgSettings"
            @change="
              $emit('change-it', $event, 'orgSettings'),
                (orgSettings = !orgSettings)
            "
            :disabled="inActive"
            >{{ switchLabelOrgSettings }}</bib-switch
          >
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <label class="switcher_label">Track Attendance</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="trackAttendance"
            @change="
              $emit('change-it', $event, 'trackAttendance'),
                (trackAttendance = !trackAttendance)
            "
            :disabled="inActive"
            >{{ switchLabelAttendance }}</bib-switch
          >
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <label class="switcher_label">Week starts on</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="weekStarts"
            @change="
              $emit('change-it', $event, 'weekStarts'),
                (weekStarts = !weekStarts)
            "
            :disabled="inActive"
            >{{ switchLabelweekStarts }}</bib-switch
          >
        </div>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="select"
          label="Week start on"
          v-model="weekStart"
          placeholder="Please select week start date"
          @change="$emit('input', $event, 'weekStart')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-6">
        <bib-input
          type="text"
          label="Week capacity"
          v-model="weekCapacity"
          placeholder="Week Capacity"
          @input="$emit('input', $event, 'weekCapacity')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-3">
        <bib-input
          type="select"
          label="Timesheet deadline"
          v-model="timesheetDeadline"
          :options="timesheetOptions"
          placeholder="Pleae select"
          @change="$emit('input', $event, 'timesheetDeadline')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-3">
        <bib-input
          type="text"
          label="Medical Allowance"
          v-model="medicalAllowance"
          placeholder="Medical Allowance"
          @change="$emit('input', $event, 'medicalAllowance')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Attendance",
  props: {
    orgSettings: {
      type: String,
    },
    switchLabelOrgSettings: {
      type: String,
    },
    trackAttendance: {
      type: String,
    },
    switchLabelAttendance: {
      type: String,
    },
    weekStarts: {
      type: String,
    },
    switchLabelweekStarts: {
      type: String,
    },
    weekStart: {
      type: String,
    },
    weekCapacity: {
      type: String,
    },
    timesheetDeadline: {
      type: String,
    },
    medicalAllowance: {
      type: String,
    },
    inActive: {
      type: String,
    },
  },
};
</script>
