<template>
    <div class="time-picker-custom">
      <div
        @click="toggleDropdown"
        v-click-outside="handleClickOutside"
        class="set-time-value cursor-pointer font-md"
      >
        {{ formatTime() }}
      </div>
  
      <div v-if="modalOpened" class="dropdown-timepicker box-bg" ref="dropdown">
        <div class="time-selection">
          <div class="time-inputs">
            <div class="increase-value">
              <div class="label">Hours</div>
              <bib-icon
                icon="arrowhead-up-solid"
                variant="gray5"
                class="icon-cursor"
                :scale="1.5"
                :style="{ cursor: hour ? 'pointer' : 'default' }"
                @click="increaseHour"
              />
              <bib-input
                type="text"
                v-model="hour"
                name="hour"
                placeholder="HH"
                :variant="isLightThemeCheck ? 'light' : 'dark'"
                @input="validateHour"
                @keydown="restrictToNumbers($event, 'hour')"
              />
              <bib-icon
                icon="arrowhead-down-solid"
                variant="gray5"
                :scale="1.5"
                class="icon-cursor"
                :style="{ cursor: hour ? 'pointer' : 'default' }"
                @click="decreaseHour"
              />
            </div>
            <div class="separator">:</div>
            <div class="increase-value">
              <div class="label">Minutes</div>
              <bib-icon
                icon="arrowhead-up-solid"
                variant="gray5"
                class="icon-cursor"
                :scale="1.5"
                :style="{ cursor: minute ? 'pointer' : 'default' }"
                @click="increaseMinute"
              />
              <bib-input
                type="text"
                v-model="minute"
                placeholder="MM"
                :variant="isLightThemeCheck ? 'light' : 'dark'"
                @input="validateMinute"
                @keydown="restrictToNumbers($event, 'minute')"
              />
              <bib-icon
                icon="arrowhead-down-solid"
                variant="gray5"
                :scale="1.5"
                class="icon-cursor"
                :style="{ cursor: minute ? 'pointer' : 'default' }"
                @click="decreaseMinute"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { DateTime } from "luxon";
  
  export default {
    data() {
      return {
        modalOpened: false,
        hour: "00",
        minute: "00",
      };
    },
    methods: {
      toggleDropdown() {
        this.modalOpened = !this.modalOpened;
        if (this.modalOpened) {
          this.setCurrentTime();
        }
      },
      handleClickOutside(event) {
        if (!this.$refs.dropdown.contains(event.target)) {
          this.modalOpened = false;
        }
      },
      formatTime() {
      const formattedHour = this.hour && this.hour.length === 2 ? this.hour : "00";
      const formattedMinute = this.minute && this.minute.length === 2 ? this.minute : "00";
      return `${formattedHour}:${formattedMinute}`;
    },
      setCurrentTime() {
        const now = DateTime.local();
        this.hour = now.toFormat("HH");
        this.minute = now.toFormat("mm");
      },
      validateHour(value) {
        let sanitizedValue = value.replace(/[^0-9]/g, "");
        if (sanitizedValue.length > 2) {
          sanitizedValue = sanitizedValue.slice(0, 2);
        }
        if (parseInt(sanitizedValue, 10) > 24) {
          sanitizedValue = "24";
        }
        this.hour = sanitizedValue;
      },
      validateMinute(value) {
        let sanitizedValue = value.replace(/[^0-9]/g, "");
        if (sanitizedValue.length > 2) {
          sanitizedValue = sanitizedValue.slice(0, 2);
        }
        if (parseInt(sanitizedValue, 10) > 59) {
          sanitizedValue = "59";
        }
        this.minute = sanitizedValue;
      },
      restrictToNumbers(event, type) {
        const key = event.key;
        const value = type === "hour" ? this.hour : this.minute;
  
        if (
          !/^[0-9]$/.test(key) &&
          key !== "Backspace" &&
          key !== "Enter" &&
          key !== "ArrowUp" &&
          key !== "ArrowDown" &&
          key !== "ArrowLeft" &&
          key !== "ArrowRight" &&
          key !== "Tab"
        ) {
          event.preventDefault();
        }
  
        if (
          value.length >= 2 &&
          key !== "Backspace" &&
          key !== "Enter" &&
          key !== "ArrowUp" &&
          key !== "ArrowDown" &&
          key !== "ArrowLeft" &&
          key !== "ArrowRight" &&
          key !== "Tab"
        ) {
          event.preventDefault();
        }
      },
      increaseHour() {
        if (this.hour !== "") {
          let newHour = parseInt(this.hour, 10) + 1;
          if (newHour > 23) newHour = 0;
          this.hour = newHour.toString().padStart(2, "0");
        }
      },
      decreaseHour() {
        if (this.hour !== "") {
          let newHour = parseInt(this.hour, 10) - 1;
          if (newHour < 0) newHour = 23;
          this.hour = newHour.toString().padStart(2, "0");
        }
      },
      increaseMinute() {
        if (this.minute !== "") {
          let newMinute = parseInt(this.minute, 10) + 1;
          if (newMinute > 59) newMinute = 0;
          this.minute = newMinute.toString().padStart(2, "0");
        }
      },
      decreaseMinute() {
        if (this.minute !== "") {
          let newMinute = parseInt(this.minute, 10) - 1;
          if (newMinute < 0) newMinute = 59;
          this.minute = newMinute.toString().padStart(2, "0");
        }
      },
    },
  };
  </script>
  
  <style lang="scss">
  .time-picker-custom {
    padding: 10px;
    position: relative;
    display: flex;
    .set-time-value {
      color: $gray6;
      width: 170px;
      height: 49px;
      display: flex;
      align-items: center;
      min-width: 100%;
    }
    .dropdown-timepicker {
      border-radius: 6px;
      display: flex;
      max-width: 200px;
      position: absolute;
      top: 60px;
      left: 8px;
      z-index: 9999;
      border: 1px solid $light;
      margin: 0;
      padding: 15px 15px 0px 15px;
      background-color: $white;
      color: $gray5;
    }
  
    .time-selection {
      display: flex;
  
      .increase-value {
        text-align: center;
  
        .icon-cursor {
          cursor: pointer;
        }
  
        .label {
          border: 1px solid $light;
          border-radius: 3px;
          padding: 3px;
          color: $gray6;
          margin-bottom: 3px;
        }
      }
  
      .time-inputs {
        display: flex;
        gap: 12px;
  
        .separator {
          font-size: 1.8rem;
          display: flex;
          align-items: center;
          padding-top: 25px;
        }
  
        input {
          font-size: 1.3rem;
          max-width: 80px;
          text-align: center;
          font-weight: 600;
        }
      }
    }
  }
  
  .dark-theme {
    .time-picker-custom {
      .dropdown-timepicker {
        border: 1px solid $dark-sub3;
        background-color: $dark;
        color: $gray5;
      }
  
      .time-selection {
        .increase-value {
          .label {
            border: 1px solid $dark-sub3;
          }
        }
      }
    }
  }
  </style>
  