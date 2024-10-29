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
    <div class="position-relative" v-if=leaveHighlighter>
        <div class="position-absolute notify-highlighter" :class="notifyClass"><span v-tooltip="leaveTypeHighlighterTolltip">{{ leaveTypeHighlighterText }}</span></div>
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
    },
    leaveHighlighter:{
      type: Boolean,
      default: null,
    },
    notifyClass:{
      type: String | Array,
      default: null,
    },
    leaveTypeHighlighterText:{
      type: String,
      default: null,
    },
    leaveTypeHighlighterTolltip:{
      type: String,
      default: null,
    }
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
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
  text-align: center;
  justify-content: start;
  width: 100%;
  border-radius: 4px;
  padding: 8px 15px 8px 8px;
  align-items: center;

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
      fill: $white !important;
    }
    span {
      color: $black !important;
      font-weight: 400;
      font-size: 14px;
    }
  }

  &__bgabsent {
    background-color: #EBE700 !important;
    border-radius: 4px;
    svg {
      fill: #ffab00 !important;
    }
    span {
      color: #000;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &__bgpastdue {
    background-color: #FFAB00;
    border-radius: 4px;
    svg {
      fill: $black !important;
    }
    span {
      color: $black;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &__bgvacation {
    background-color: #EBE700;
    border-radius: 4px;
    svg {
      fill: $primary !important;
    }
    span {
      color: $black;
      font-weight: 400;
      font-size: 14px;
    }
  }
  &__bgabsentpink {
    background-color: #FFAB00;
    border-radius: 4px;
    svg {
      fill: $black !important;
    }
    span {
      color: $black !important;
      font-weight: 400;
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
      font-weight: 400;
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
      font-weight: 400;
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
      font-weight: 400;
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
      font-weight: 400;
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
  right: 0px;
  top: -8px;  
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
    font-size: 10px !important; /* Adjust size of the text inside */
    z-index: 1; /* Ensure the text is above any background or shadows */
    padding: 2px 5px;
  
}
}

</style>
