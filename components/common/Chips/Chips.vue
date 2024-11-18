<template>
  <div class="d-flex">
    <div
      :class="[
        shapeCircle ? 'chip-wrapper' + shapeCircle : '',
        shapeRound ? 'chip-wrapper' + shapeRound : '',
        defaultPointer ? '' : 'cursor-pointer',
        centerAlign ? 'd-align' : '',
        variant,
        className,
      ]"
      :style="maxWidth"
      class="chip-wrapper"
      @click="$emit('on-click')"
    >
      <bib-icon
        v-if="iconShowLeft"
        :icon="icon"
        :variant="variantIcon"
        :scale="1"
        class="mr-05"
      ></bib-icon>
      <span>{{ title }}</span>
      <bib-icon
        v-if="iconShowRight"
        :icon="icon"
        :variant="variantIcon"
        :scale="1"
        class="ml-05"
        style="margin-right: -5px"
      ></bib-icon>
    </div>
    <div class="position-relative" v-if="leaveHighlighter">
      <div class="position-absolute notify-highlighter" :class="notifyClass">
        <span
          :data-title="leaveTypeHighlighterTolltip"
          @mouseover="showTooltip"
          @mouseleave="hideTooltip = true"
          :class="{
            hidden: hideTooltip,
            'show-tooltip': hideTooltip,
            bottom: tooltipPositionBottom,
            top: !tooltipPositionBottom,
          }"
          >{{ leaveTypeHighlighterText }}</span
        >
      </div>
    </div>
  </div>
</template>
<!-- :class="[
        variant ? 'chip-wrapper' + variant : '',
        shapeCircle ? 'chip-wrapper' + shapeCircle : ''
        ]" -->
<script>
export default {
  name: "Chips",
  props: {
    title: {
      type: [String, Number],
    },
    icon: {
      type: String,
    },
    iconShowLeft: {
      type: Boolean,
    },
    iconShowRight: {
      type: Boolean,
    },
    maxWidth: {
      type: String,
    },
    scale: {
      type: Number,
    },
    className: {
      type: [Array, String],
      default() {
        return null;
      },
    },
    variant: {
      type: [String, Array],
    },
    variantIcon: {
      type: String,
    },
    shapeCircle: {
      type: String,
    },
    shapeRound: {
      type: String,
    },
    titleClass: {
      type: String,
    },
    defaultPointer: {
      type: Boolean,
      default: false,
    },
    centerAlign: {
      type: String | Boolean,
      default: true,
    },
    leaveHighlighter: {
      type: Boolean,
      default: null,
    },
    notifyClass: {
      type: String | Array,
      default: null,
    },
    leaveTypeHighlighterText: {
      type: String,
      default: null,
    },
    leaveTypeHighlighterTolltip: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      hideTooltip: false,
      tooltipPositionBottom: false,
    };
  },
  mounted() {
    window.addEventListener("wheel", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("wheel", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.hideTooltip = true;
      const topbar = document.querySelector(".app-wrapper__topbar");
      const tooltipElement = this.$el.querySelector("[data-title]");
      if (topbar && tooltipElement) {
        const topbarRect = topbar.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();
        this.tooltipPositionBottom = tooltipRect.top <= topbarRect.bottom + 80;
      }
    },
    showTooltip() {
      this.hideTooltip = false;
    },
  },
};
</script>
<style lang="scss">
[data-title]:hover:after {
  opacity: 1;
  transition: all 0.1s ease 0.3s;
  visibility: visible;
}

[data-title]:after {
  content: attr(data-title);
  background-color: #e3e3ea;
  position: absolute;
  padding: 5px 8px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  opacity: 0;
  border: 1px solid #dcdcdf;
  z-index: 99999;
  border-radius: 4px;
  visibility: hidden;
}

[data-title].bottom:after {
  bottom: -3.5em !important;
  /* Position tooltip below */
}

[data-title].top:after {
  top: -3.5em !important;
  /* Position tooltip above */
}

[data-title].bottom:before {
  bottom: -1em !important;
  border-color: transparent transparent #dcdcdf transparent;
}

[data-title].top:before {
  top: -1em !important;
  border-color: #dcdcdf transparent transparent transparent;
}

[data-title]:before {
  content: "";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  opacity: 0;
  visibility: hidden;
  z-index: 99998;
}

[data-title]:hover:before,
[data-title]:hover:after {
  opacity: 1;
  transition: all 0.1s ease 0.3s;
  visibility: visible;
}

[data-title].hidden:after {
  opacity: 0;
}

.show-tooltip[data-title]:hover::before,
.show-tooltip[data-title]:hover::after {
  opacity: 0;
  transition: none;
  visibility: hidden;
}

.chip-wrapper-bg {
  min-width: 112px !important;

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  &__shape-round {
    border-radius: 5px;
  }

  &__bgsucess {
    background-color: #ddf0dc;
    border: solid 1px $success;
    color: $success;

    svg {
      fill: $success !important;
    }

    span {
      color: $success !important;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &__bgabsent {
    background-color: #fff2d6;
    border: solid 1px #ffab00;

    svg {
      fill: #ffab00 !important;
    }

    span {
      color: #ffab00 !important;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &__bgvacation {
    background-color: rgba(31, 66, 162, 0.16);

    svg {
      fill: $primary !important;
    }

    span {
      color: $primary;
      font-weight: 500;
      font-size: 14px;
    }
  }

  &__bgdanger {
    background-color: rgba(230, 0, 14, 0.16);

    svg {
      fill: #e6000e !important;
    }

    span {
      color: #e6000e;
      font-weight: 500;
      font-size: 14px;
    }
  }
}

.chip-wrapper {
  display: flex;
  // text-align: center;
  // justify-content: center;
  width: 100%;
  border-radius: 4px;
  padding: 8px 15px 8px 8px;
  align-items: center;

  span {
    font-weight: 600;
  }

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    padding: 4px;
    border-radius: 50%;
  }

  &__shape-round {
    width: 3rem;
    height: 3rem;
    padding: 4px;
    border-radius: 1px;
  }

  &__border-radius {
    border-radius: 0.5rem;
  }

  &__bgsucess {
    background-color: $success !important;
    color: $black !important;
    border-radius: 4px;

    svg {
      fill: #0d300b !important;
    }

    span {
      color: #0d300b !important;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgabsent {
    background-color: #ebe700 !important;
    border-radius: 4px;

    svg {
      fill: #757300 !important;
    }

    span {
      color: #757300;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgpastdue {
    background-color: #ffab00;
    border-radius: 4px;

    svg {
      fill: $black !important;
    }

    span {
      color: #805500;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgrejected {
    background-color: #e6000e;
    border-radius: 4px;

    svg {
      fill: #450004 !important;
    }

    span {
      color: #450004;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgnotsubmitted {
    background-color: $primary;
    border-radius: 4px;

    svg {
      fill: #b9c3df !important;
    }

    span {
      color: #c7d3f6;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgvacation {
    background-color: #ebe700;
    border-radius: 4px;

    svg {
      fill: $primary !important;
    }

    span {
      color: $black;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgabsentpink {
    background-color: #ffab00;
    border-radius: 4px;

    svg {
      fill: #805500 !important;
    }

    span {
      color: #805500 !important;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgpending {
    background-color: $white;
    border: 1px solid #e1e0e0;
    border-radius: 4px;

    svg {
      fill: $secondary-sub1 !important;
    }

    span {
      color: $secondary-sub1;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgdefault {
    background-color: $white;
    border: 1px solid #e1e0e0;
    border-radius: 4px;

    svg {
      fill: $secondary-sub1 !important;
    }

    span {
      color: $secondary-sub1;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bggray {
    background-color: $secondary-sub3;
    border-radius: 4px;
    border-radius: 0.5rem;

    svg {
      fill: $black !important;
    }

    span {
      color: #999;
      font-weight: 600;
      font-size: 14px;
    }

    span:first-letter {
      text-transform: uppercase;
    }
  }

  &__default {
    background-color: $light;
    border-radius: 4px;

    span {
      color: $gray6 !important;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.chip-wrapper-without-bg {
  border-radius: 1rem;
  // padding: 4px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $white;
  font-size: 14px;

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  &__shape-round {
    width: 3rem;
    height: 3rem;
    border-radius: 5px;
  }

  &__bg_success {
    color: $success;

    svg {
      fill: $success !important;
    }

    span {
      color: $success !important;
      font-weight: 400;
      font-size: 14px;
    }
  }

  &__bgpending {
    color: $success;

    svg {
      fill: #ffab00 !important;
    }

    span {
      color: #ffab00;
      font-weight: 400;
      font-size: 14px;
    }
  }
}

.text-bold {
  span {
    font-weight: 800;
  }
}

.disabled {
  span {
    color: gray !important;
    font-weight: 400;
  }
}

.width-auto {
  width: auto !important;
  min-width: 150px !important;
}

.padding-0 {
  padding: 0 !important;
}

.notify-highlighter {
  right: -3px;
  top: -9px;
  border-radius: 4px;
  padding: 0 1px;
  text-align: center;
  border: 1px solid $dark-sub3;

  &__bgdefault {
    background-color: $gray4;

    span {
      color: $black !important;
    }
  }

  &__bgsucess {
    background-color: $success;

    span {
      color: $white !important;
    }
  }

  &__bgabsent {
    background-color: $orange !important;

    span {
      color: $white !important;
    }
  }

  &__bgabsentpink {
    background-color: $danger !important;

    span {
      color: $white !important;
    }
  }

  span {
    display: block;
    font-size: 10px !important;
    /* Adjust size of the text inside */
    z-index: 1;
    /* Ensure the text is above any background or shadows */
    padding: 2px 5px;
  }
}
</style>
