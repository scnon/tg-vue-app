<template>
    <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string">
            <KeepAlive>
                <component :is="Component" />
            </KeepAlive>
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useWebAppBackButton, useWebAppMainButton } from 'vue-tg'
import bus from './utils/bus'

const router = useRouter()

useWebAppBackButton().onBackButtonClicked(() => {
    router.back()
})

useWebAppMainButton().onMainButtonClicked(() => {
    bus.emit('click')
})
</script>

<style>
body {
    user-select: none;

    scrollbar-width: none;
    -ms-overflow-style: none;
    background-color: #e5e5e5;
    color: black;
}

body::-webkit-scrollbar,
html::-webkit-scrollbar {
    display: none;
}
</style>
