<template>
    <bib-button pop="arrowhead-right" :scale="1.3">
        <template v-slot:menu>
            <div class="list" style="margin-right:-0.6rem">
                <span class="list__item">
                    <a :href="myProfile" class="list_anchor" target="_blank">
                        <bib-icon icon="user-canonical" :scale="1.1" variant="gray5" class="mr-075"></bib-icon> My
                        Profile
                    </a>
                </span>
                <span class="list__item" @click="$emit('logout')">
                    <bib-icon icon="output" :scale="1.1" variant="gray5" class="mr-075"></bib-icon> Logout
                </span>
            </div>
        </template>
    </bib-button>
</template>
<script>
export default {
    name: 'AvatarMenu',
    data() {
        return {
            myProfile: process.env.USER_PROFILE_URL,
        }
    },
}
</script>