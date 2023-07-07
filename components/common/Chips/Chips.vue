<template>
  <div class="d-flex gap-1">
    <div
      :class="[
        shapeCircle ? 'chip-wrapper' + shapeCircle : '',
        shapeRound ? 'chip-wrapper' + shapeRound : '',
        variant,
        className,
      ]"
      style="width: 100%;"
      class="cursor-pointer chip-wrapper ml-05"
      @click="$emit('on-click')"
    >
      <bib-icon
        v-if="iconShow"
        :icon="icon"
        :scale="0.8"
        style="margin-right: 5px"
      ></bib-icon>
      <span>{{ title }}</span>
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
      type:[String,Number],
    },
    icon: {
      type: String,
    },
    iconShow: {
      type: String,
    },
    scale: {
      type: Number,
    },
    className: {
      type: Array,
      default() {
        return null;
      },
    },
    variant: {
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
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.chip-wrapper-bg-same {
  border-radius: 1rem;
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f5;

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

  &__bgsucess {
    // background-color: #d5e8d4;
    svg {
      fill: #2ba026 !important;
    }
    span {
      color: #2ba026;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgabsent {
    // background-color: rgba(255, 171, 0, 0.16);
    svg {
      fill: #ffab00 !important;
    }
    span {
      color: #ffab00;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgvacation {
    // background-color: rgba(31, 66, 162, 0.16);
    svg {
      fill: #1f42a2 !important;
    }
    span {
      color: #1f42a2;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgabsentpink {
    // background-color: rgba(230, 0, 14, 0.16);
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
  border-radius: 6px;
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  height: 3rem;
  // justify-content: center;
  align-items: center;
  // background-color: #f2f2f5;

  &__shape-circle {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 50%;
  }
  &__shape-round {
    width: 3rem;
    height: 3rem;
    padding: 6px;
    border-radius: 1px;
  }

  &__bgsucess {
    background-color: #d5e8d4;
    svg {
      fill: #2ba026 !important;
    }
    span {
      color: #2ba026;
      font-weight: 600;
      font-size: 14px;
    }
  }

  &__bgabsent {
    background-color: rgba(255, 171, 0, 0.16);
    svg {
      fill: #ffab00 !important;
    }
    span {
      color: #ffab00;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgvacation {
    background-color: rgba(31, 66, 162, 0.16);
    svg {
      fill: #1f42a2 !important;
    }
    span {
      color: #1f42a2;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgabsentpink {
    background-color: rgba(230, 0, 14, 0.16);
    svg {
      fill: #e6000e !important;
    }
    span {
      color: #e6000e;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgpending {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bgdefault {
    background-color: #ffffff;
    border: 1px solid #e1e0e0;
    svg {
      fill: #b1b1b4 !important;
    }
    span {
      color: #b1b1b4;
      font-weight: 600;
      font-size: 14px;
    }
  }
  &__bggray {
    background-color: #f2f2f5;
    border-radius: 0.5rem;
    svg {
      fill: #000 !important;
    }
    span {
      color: #000;
      font-weight: 600;
      font-size: 14px;
    }
    span:first-letter {
      text-transform: uppercase;
    }
  }
  &__bgwhite {
    background-color: #fff;
    border-radius: 0.5rem;
    color: #eee;
    span {
      color: #e2e2e3;
      font-weight: 600;
      font-size: 14px;
    }
    // span:first-letter{
    //   text-transform: uppercase
    // }
  }
}
.chip-wrapper-without-bg {
  border-radius: 1rem;
  padding: 4px 8px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;

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

  &__bgsucess {
    // background-color: #d5e8d4;
    svg {
      fill: #2ba026 !important;
    }
    span {
      color: #2ba026;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgabsent {
    // background-color: rgba(255, 171, 0, 0.16);
    svg {
      fill: #ffab00 !important;
    }
    span {
      color: #ffab00;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgvacation {
    // background-color: rgba(31, 66, 162, 0.16);
    svg {
      fill: #1f42a2 !important;
    }
    span {
      color: #1f42a2;
      font-weight: 500;
      font-size: 14px;
    }
  }
  &__bgabsentpink {
    // background-color: rgba(230, 0, 14, 0.16);
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
</style>
