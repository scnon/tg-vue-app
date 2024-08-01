<template>
    <div class="w-full rounded-md flex bg-white" @click="enterShop">
        <img :src="info.image" class="w-32 h-32 bg-gray-400 rounded-md" />
        <div class="ml-4">
            <div class="text-lg font-bold">{{ info.name }}</div>
            <div class="text-sm">Shop description</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IStoreInfo } from '@/apis/store'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    info: {
        type: Object as () => IStoreInfo,
        required: true
    }
})

const enterShop = () => {
    router.push({
        name: 'shop',
        query: {
            id: props.info.id
        }
    })
}
</script>
