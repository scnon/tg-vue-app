<template>
    <div class="flex items-baseline text-lg leading-5 font-sans">
        <button v-if="visible" class="w-6 h-6 bg-blue-500 rounded-full text-white" @click="minus">
            -
        </button>
        <div v-if="visible" class="w-6 text-center font-bold">{{ count }}</div>
        <button class="w-6 h-6 bg-blue-500 rounded-full text-white" @click="add">+</button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = defineModel({ type: Number, default: 0 })
const visible = ref(false)
const emit = defineEmits(['onChange'])

const add = () => {
    const newVal = count.value + 1
    if (count.value !== newVal) {
        emit('onChange', newVal)
    }
    count.value = newVal
    if (newVal > 0) {
        visible.value = true
    }
}

const minus = () => {
    const newVal = count.value - 1
    if (count.value !== newVal) {
        emit('onChange', newVal)
    }
    count.value = Math.max(0, newVal)
    if (newVal === 0) {
        visible.value = false
    }
}
</script>
