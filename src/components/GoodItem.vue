<template>
    <div class="root bg-white m-2 rounded-md overflow-hidden">
        <div class="flex">
            <img :src="info.image" class="w-24 h-24" />
            <div class="flex-1 flex flex-col justify-between px-2">
                <div class="font-bold text-md">{{ info.storeName }}</div>
                <div class="flex flex-row justify-between">
                    <span class="text-lg font-bold font-sans text-red-600"
                        >${{ info.price.toFixed(2) }}</span
                    >
                    <stepper
                        v-if="info.productAttr.length === 1"
                        v-model="count"
                        @onChange="onChange"
                    />
                    <button
                        v-else
                        @click="selectAttr"
                        class="bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                    >
                        多规格
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { IProduct } from '@/apis/store'
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import Stepper from './Stepper.vue'

const props = defineProps({
    info: {
        type: Object as () => IProduct,
        required: true
    }
})
const emit = defineEmits(['onSelect'])

const count = ref(0)
const cartStore = useCartStore()
const onChange = (val: number) => {
    cartStore.update(props.info, val)
}

const selectAttr = () => {
    emit('onSelect', props.info)
}
</script>

<style scoped>
.stepper {
    width: 100px;
}
</style>

<style scoped>
.container {
    --td-bg-color-secondarycontainer: red;
    --td-stepper-border-radius: 10px;
}
</style>
