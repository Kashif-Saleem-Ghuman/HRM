<template>
  <div class="widget d-flex">
    <div class="widget-container">
      <div>
        <label>{{ title }}</label>
      </div>
      <div class="widget-info mt-05">
        <div>
          <div class="widget-info__subheading">{{ subheading }}</div>
          <span>{{ value }}</span>
        </div>

        <div v-if="avatars && avatarsPosition === 'center'" class="widget-avatars-container">
          <div v-for="avatar in avatars" class="widget-avatars" :key="avatar.id">
            <NuxtLink :to="`/profile/${avatar.id}`">
              <bib-avatar class="avatar" :src="avatar.photo" size="1.5rem"
                :text="avatar.photo ? null : getEmployeeInitials(avatar)"></bib-avatar>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="subData" class="sub-data-container">
        <div v-for="item in subData" class="sub-data" :key="item.title">
          <div class="sub-data__title">{{ item.title }}</div>
          <div class="sub-data__value">{{ item.value }}</div>
        </div>
      </div>


      <div v-if="avatars && avatarsPosition === 'bottom'" class="widget-avatars-container-bottom cursor-pointer pt-05">
        <div v-for="avatar in avatars" :key="avatar.id">
          <NuxtLink :to="`/profile/${avatar.id}`">
            <bib-avatar :src="avatar.photo" size="1.5rem"
              :text="avatar.photo ? null : getEmployeeInitials(avatar)"></bib-avatar>
          </NuxtLink>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { getEmployeeInitials } from '../../../utils/functions/common_functions';

export default {
  props: {
    avatarsPosition: {
      type: String,
      default: 'bottom'
    }
  },

  data() {
    return {
      data: {},
      subData: null,
      avatars: null,
      loading: false,
      avatarsBottom: null
    };
  },

  computed: {
    title() {
      return this.data?.title;
    },
    subheading() {
      return this.data?.subheading;
    },
    value() {
      return this.data?.value;
    },
  },

  methods: {
    getEmployeeInitials,
    async fetchData() {
      throw new Error(`Widget fetchaData function needs to be implemented!`);
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
$text-font-size: 14px;

.widget {
  height: 100%;
}

.widget-container {
  width: 100%;
  height: 100%;
  padding: 24px;
  font-size: $text-font-size;
  background: #fff;
  border-radius: 24px;
  border: 1px solid #f2f2f5;
  overflow-wrap: break-word;

  label {
    font-size: 1rem;
    font-weight: 600;
    color: #1d1d20;
  }

  .widget-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__subheading {
      font-weight: 500;
      color: #b1b1b4;
      margin-bottom: -10px;
      font-size: $text-font-size;
    }

    span {
      font-size: 56px;
      font-weight: 500;
      margin-left: -4px;
    }

    .subheading_footer {
      font-weight: 500;
      color: #b1b1b4;
      margin-top: -10px;
    }

    &_desc {
      font-size: 10px;
    }

    .widget-avatars-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: .5rem;
      overflow: hidden;
      max-height: 2rem;

      .avatar {
        flex: 0 0 auto;
        margin: 1px;
        overflow: hidden;
      }

    }
  }

  .footer-item {
    padding-top: 8px;
    padding-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    .items {
      display: flex;
      justify-content: space-between;
      width: 50%;
      padding-right: 10px;
      align-items: center;

      label {
        color: #b1b1b4;
        font-weight: normal;
        font-size: $text-font-size;
      }

      span {
        font-weight: 600;
        font-size: $text-font-size;
      }
    }
  }

  .sub-data-container {
    display: flex;
    font-size: 12px;
    justify-content: space-between;
    flex-wrap: wrap;


    .sub-data {
      display: flex;
      justify-content: space-between;
      width: 48%;
      padding-top: .2rem;

      &__title {
        color: #b1b1b4;
        font-size: $text-font-size;
        font-weight: 500;
      }

      &__value {
        font-weight: 500;
        font-size: $text-font-size;
      }
    }
  }

  .widget-avatars-container-bottom {
    display: flex;
    gap: .5rem;
    flex-wrap: wrap;
    max-height: 2rem;
    overflow: hidden;
  }
}
</style>
  