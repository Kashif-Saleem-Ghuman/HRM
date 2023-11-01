
<template>
  <div>
    <div v-if="newData.id" class="cell activity">
      {{ newData.activity.label }}
    </div>
    <div v-else class="cell menu-drop">
      <div style="min-width:300px; display: flex; justify-content: center">
        <bib-button
          :label="newData.activity.label || 'Select Activity Type'"
          v-model="newData.activity.label"
          variant="light"
          @click="show = !show"
          v-click-outside="showPopMenu"
        ></bib-button>
        <ul v-show="show">
          <!-- <li @click="newDataTypeReset">
            <span class="activity">{{ "Select an activity type" }}</span>
          </li> -->
          <li
            v-for="activityType in activityTypes"
            :key="activityType.value"
            @click="newDataTypeSelected(activityType)"
          >
            <span class="activity">{{ activityType.label }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.start"
        name="name"
        @change="newDataMutated"
        v-model="newData.start"
        :disabled="disabled"
        @blur="timeInputBlur"
        class="p-025"
      ></bib-input>
    </div>
    <div class="cell">
      <bib-input
        type="time"
        :value="newData.end"
        name="name"
        @change="newDataMutated"
        v-model="newData.end"
        :disabled="disabled"
        @blur="timeInputBlur"
        class="p-025"
      ></bib-input>
    </div>
    <div class="cell">
      <div class="uneditable-cell">{{ entryTotal }}</div>
    </div>
    <div
      class="cell cursor-pointer trash"
      v-if="newData.id"
      @click="deleteEntry"
    >
      <bib-icon icon="trash-solid" :scale="1"></bib-icon>
    </div>
  </div>
</template>
<script>
import {
  makeTimeEntry,
  editTimeEntry,
  deleteTimeEntry,
} from "@/utils/functions/functions_lib_api";
import {
  parseInputTimeIntoArray,
  numberToClockDigits,
  hoursAndMinutesToJSDate,
} from "@/utils/functions/dates";

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    listToday: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      newData: { ...this.entry },
      mutated: false,
      activityTypeIn: { label: "CLOCK-IN -> CLOCK-OUT", value: "in" },
      activityTypeBreak: { label: "BREAK", value: "break" },
      disabled:false,
      show:false
    };
  },

  methods: {
    makeTimeEntry,
    editTimeEntry,
    deleteTimeEntry,
    parseInputTimeIntoArray,
    numberToClockDigits,
    hoursAndMinutesToJSDate,
    showPopMenu(){
      this.show = false
    },
    newDataMutated() {
      this.mutated = true;
    },
    calculateDates() {
      return {
        startDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.start),
          this.date
        ).toISOString(),
        endDate: this.hoursAndMinutesToJSDate(
          ...this.parseInputTimeIntoArray(this.newData.end),
          this.date
        ).toISOString(),
        date: new Date(this.date).toISOString(),
      };
    },
    async editThisEntry() {
      if (this.totalTimeInMinutes < 0) {
        return alert("end date should be greater than start date");
      }
      if (!this.timeEntryReady) return;
      const { startDate, endDate, date } = this.calculateDates();
      const editedEntry = await this.editTimeEntry({
        date,
        start: startDate,
        end: endDate,
        id: this.entry.id,
        activity: this.newData.activity.value,
      });
      if (editedEntry) {
        this.$emit("edit-entry", editedEntry);
      }
    },
    async makeNewTimeEntry() {
      if (this.totalTimeInMinutes < 0) {
        return alert("end date should be greater than start date");
      }
      if (!this.timeEntryReady) return;
      const { startDate, endDate, date } = this.calculateDates();
      const newEntry = await this.makeTimeEntry(
        this.newData.activity.value,
        date,
        startDate,
        endDate
      );
      if (newEntry) {
        this.$emit("new-entry", newEntry);
        this.clearData();
      }
    },
    async deleteEntry() {
      const response = await this.deleteTimeEntry(this.newData.id);
      if (response) {
        this.$emit("delete-entry", this.newData.id);
      }
    },
    newDataTypeSelected(activity) {
      this.newData.activity = activity;
      if (this.timeEntryReady) {
        this.makeNewTimeEntry();
      }
    },
    newDataTypeReset() {
      this.newData.activity.label = "";
      this.newData.activity.value = "";
    },
    buttonClicked() {
      if (this.newData.id) return this.editThisEntry();
      return this.makeNewTimeEntry();
    },
    timeInputBlur() {
      if (this.newData.id) {
        this.editThisEntry();
      } else {
        this.makeNewTimeEntry();
      }
    },
    clearData() {
      this.newData = {
        activity: { label: "", value: "" },
        start: null,
        end: null,
      };
    },
  },
  computed: {
    activityTypes() {
      if (this.listToday?.length) {
        const activities = [];
        const todayActivities = this.listToday.map(
          (item) => item.activity?.value
        );
        if (!todayActivities.includes("in"))
          activities.push(this.activityTypeIn);
        if (!todayActivities.includes("break"))
          activities.push(this.activityTypeBreak);

        return activities;
      }

      return [this.activityTypeIn, this.activityTypeBreak];
    },
    timeEntryIsValid() {
      return this.newData.start && this.newData.end;
    },
    totalTimeInMinutes() {
      let endHours, endMinutes, startHours, startMinutes;
      try {
        [endHours, endMinutes] = this.parseInputTimeIntoArray(this.newData.end);
        [startHours, startMinutes] = this.parseInputTimeIntoArray(
          this.newData.start
        );
      } catch (error) {
        return error.message;
      }
      return (endHours - startHours) * 60 + (endMinutes - startMinutes);
    },
    entryTotal() {
      if (this.newData.total && !this.mutated) return this.newData.total;
      if (!this.timeEntryIsValid) return "--:--";
      if (this.totalTimeInMinutes <= 0) return "Invalid Input";
      const totalHours = Math.floor(this.totalTimeInMinutes / 60);
      const totalMinutes = this.totalTimeInMinutes - totalHours * 60;
      return `${this.numberToClockDigits(
        totalHours
      )}:${this.numberToClockDigits(totalMinutes)}`;
    },
    timeEntryReady() {
      return (
        this.timeEntryIsValid &&
        this.totalTimeInMinutes > 0 &&
        this.newData.activity.value &&
        this.mutated
      );
    },
  },
  mounted(){
    if(this.newData.start != null){
      this.disabled = true
    }else{
      this.disabled=false
    }
  },
};
</script>
<style lang="scss">
.menu-drop {
  position: relative;
  display: flex;
  justify-content: center;
  ul {
    margin: 0;
    padding: 0;
    width: 200px;
    position: absolute;
    top: 40px;
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid #e6e6e9;

    li {
      list-style: none;
      margin: 8px;
      padding: 10px;
      cursor: pointer;
      background-color: #f2f2f5;
      border: 1px solid #e6e6e9;
      border-radius: 6px;
      display: block;
    }
    li:hover{
      border: 1px solid #f2f2f5;
      background-color: #fff;

    }
  }
}
</style>
