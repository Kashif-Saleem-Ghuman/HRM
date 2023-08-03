<template>
  <div class="modal-clock" v-if="clockModal">
    <div class="modal-clock__mask" @click="$emit('click:outside')"></div>
    <div @keydown.esc="close" ref="modal" tabindex="0" class="wrapper">
      <div class="header">
        <span class="font-w-600">{{ title }}</span>
        <div class="ml-auto mr-05 d-flex">
          <slot name="header"></slot>
        </div>
        <bib-icon
          variant="gray4"
          class="cursor-pointer"
          :scale="1"
          icon="close"
          @click.native="close"
        ></bib-icon>
      </div>

      <div class="content">
        <div class="clockin" :class="borderClass">
          <div>
            <span>Wed Aug 03 2023</span>
            <span>00:00:00</span>
            <label>00:00:00</label>
          </div>
        </div>
        <div class="button-punched-in mb-1 mt-2" @click="$emit('clock-in')">
          <bib-icon icon="video-solid" variant="white" class="mr-05"></bib-icon>
          <span>{{ buttonLabel }}</span>
        </div>
        <div class="time-log-wrapper">
          <header>Time log</header>
          <div class="d-flex time-log-item">
            <span>In</span>
            <span>{{ inTime }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span>Breaks</span>
            <span>{{ breakTime }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span>0ut</span>
            <span>{{ outTime }}</span>
          </div>
          <div class="d-flex time-log-item">
            <span style="font-weight: bold">Total</span>
            <span style="font-weight: bold">09:00</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BibClockWrapper",
  props: {
    clockModal:{
      type:Boolean
    },
    title: {
      type: String,
      default() {
        return null;
      },
    },
    inTime: {
      type: String,
    },
    breakTime: {
      type: String,
    },
    outTime: {
      type: String,
    },
    borderClass: {
      type: String,
    },
    buttonLabel: {
      type: String,
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-clock {
  &__mask {
    z-index: 999;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: transparentize(#dcdcdf, 0.2);
    position: fixed;
    width: 100%;
    height: 100%;
  }
  .wrapper {
    max-width: 330px;
    box-shadow: 0px 2px 8px #0000003d;
    height: max-content;
    margin: auto;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $black;
    border-radius: 24px;
    z-index: 999999;

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      line-height: 1.5rem;
      min-height: 3.5rem;
      // border-bottom: 1px solid $light;
      span {
        color: $white;
      }
    }
    .content {
      padding: 2rem;
      max-height: 75vh;
      overflow: hidden;
      .border-green {
        border: 16px solid #0ea900;
      }
      .border-gray {
        border: 16px solid #3f3f41;
      }
      .clockin {
        display: flex;
        justify-content: center;
        color: $white;
        border-radius: 50%;
        width: 270px;
        height: 270px;
        padding-top: 40px;

        span {
          color: $white;
          display: block;
          text-align: center;
        }
        label {
          font-size: 52px;
        }
      }
    }
  }
}
.button-punched-in {
  background-color: #6bbf68;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  span {
    color: #fff;
  }
  svg {
    fill: #fff !important;
  }
}
.time-log-wrapper {
  header {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }

  .time-log-item {
    display: flex;
    justify-content: space-between;
    border-top: dotted 1px #fff;
    padding: 10px 0;
    color: #fff;
  }
}
</style>
