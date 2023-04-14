<template>
  <bib-button
    pop="arrowhead-right"
    :scale="1.3"
    style="transform: translateX(12px)"
  >
    <template v-slot:menu>
      <div class="list">
        <!-- <span class="list__item" @click="$emit('openAccountPage')">
                    <bib-icon icon="home" :scale="1.1" variant="gray5" class="mr-075"></bib-icon> My Account
                </span> -->
        <span class="list__item" @click="$emit('myProfile')">
          <bib-icon
            icon="user-canonical"
            :scale="1.1"
            variant="gray5"
            class="mr-075"
          ></bib-icon>
          My Profile
        </span>
        <span class="list__item" @click="$emit('logout')">
          <bib-icon
            icon="output"
            :scale="1.1"
            variant="gray5"
            class="mr-075"
          ></bib-icon>
          Logout
        </span>
      </div>
    </template>
  </bib-button>
</template>
<script>
export default {
  name: "AvatarMenu",
};
</script>
