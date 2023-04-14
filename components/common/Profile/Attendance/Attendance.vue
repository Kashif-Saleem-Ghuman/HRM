<template>
  <div>
    <div class="row mx-0" v-if="orgSetting">
      <div class="col-12">
        <label class="switcher_label">Same as org setting</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="orgSettings"
            @change="
              $emit('change-it', $event, 'useOrganizationSettings'),
                (orgSettings = !orgSettings)
            "
            :disabled="inActiveOrganizationSettings"
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
        <label class="switcher_label">Track Time</label>
        <div class="pb-075 pt-05">
          <bib-switch
            :checked="trackTime"
            @change="
              $emit('change-it', $event, 'trackTime'), (trackTime = !trackTime)
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
          :options="weekOptions"
          placeholder="Please select week start date"
          @input="$emit('input', $event, 'startWeekDay')"
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
          v-model="deadlineDay"
          :options="timesheetOptions"
          placeholder="Pleae select"
          @input="$emit('input', $event, 'deadlineDay')"
          :disabled="inActive"
        ></bib-input>
      </div>
      <div class="col-3" style="display: flex; align-items: flex-end">
        <bib-input
          type="text"
          v-model="medicalAllowance"
          placeholder="00:00:00"
          @change="$emit('input', $event, 'medicalAllowance')"
          :disabled="inActive"
        ></bib-input>
      </div>
    </div>
    <div class="row mx-0">
      <div class="col-12">
        <bib-input
          type="textarea"
          v-model="note"
          placeholder="Type about yourself"
          label="Note"
          :disabled="inActive"
          @change="$emit('input', $event, 'note')"
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
    trackTime: {
      type: String,
    },
    weekOptions: {
      type: Array,
    },
    timesheetOptions: {
      type: Array,
    },
    orgSetting: {
      type: String,
    },
    switchLabelweekStarts: {
      type: String,
    },
    weekStart: {
      type: String,
    },
    deadlineDay: {
      type: String,
    },
    weekCapacity: {
      type: String,
    },
    note: {
      type: String,
    },
    inActive: {
      type: String,
    },
    inActiveOrganizationSettings: {
      type: String,
    },
  },
};
</script>
