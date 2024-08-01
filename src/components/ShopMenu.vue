<template>
    <div class="root flex h-lvh bg-gray-100 overflow-hidden">
        <t-side-bar :value="sideBarIndex" @change="onSideBarChange" @click="onSideBarClick">
            <t-side-bar-item
                v-for="(item, index) in info"
                :key="index"
                :value="index"
                :label="item.name"
                :badge-props="{}"
            />
        </t-side-bar>
        <div ref="wrapper" class="flex-1 overflow-y-auto" @scroll="onScroll">
            <div
                v-for="(item, index) in info"
                :key="index"
                class="text-black section"
                :style="contentStyle"
            >
                <div class="h-12 flex items-center font-bold pl-2">
                    {{ item.name }}
                </div>
                <div class="space-y-2">
                    <div class="" v-for="(cargo, cargoIndex) in item.goodsList" :key="cargoIndex">
                        <GoodItem :info="cargo" @on-select="onSelect" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, onActivated, onDeactivated } from 'vue'
import type { TdSideBarProps, TdSideBarItemProps } from 'tdesign-mobile-vue'
import type { IMenuInfo, IProduct } from '@/apis/store'
import GoodItem from '@/components/GoodItem.vue'
import { useCartStore } from '@/stores/cart'
import bus from '@/utils/bus'

defineProps({
    info: {
        type: Object as () => IMenuInfo[],
        required: true
    }
})

const visible = ref(false)
const wrapper = ref<HTMLElement>()
const contentStyle = ref('')
const offsetTopList = reactive<number[]>([])
const sideBarIndex = ref<TdSideBarProps['value']>(0)

const getOffsetTopList = () => {
    if (wrapper.value) {
        const $title = wrapper.value.querySelectorAll<HTMLElement>(`.section`)
        $title.forEach((item) => offsetTopList.push(item.offsetTop))
    }
}

const moveToActiveSideBar = (index: number) => {
    if (wrapper.value) {
        wrapper.value.scrollTop = offsetTopList[index] - offsetTopList[0]
    }
}

onMounted(() => {
    getOffsetTopList()
    moveToActiveSideBar(Number(sideBarIndex.value))
})

onDeactivated(() => {
    visible.value = false
})

const onSideBarClick = (value: TdSideBarProps['value'], label: TdSideBarItemProps['label']) => {
    console.log('=onSideBarClick===', value, label)
}

const onSideBarChange = (value: TdSideBarProps['value']) => {
    sideBarIndex.value = value
    moveToActiveSideBar(Number(value))
}

const onScroll = (e: WheelEvent | Event) => {
    const threshold = offsetTopList[0]
    const { scrollTop } = e.target as HTMLElement
    if (scrollTop < threshold) {
        sideBarIndex.value = 0
        return
    }
    const index = offsetTopList.findIndex((top) => top > scrollTop && top - scrollTop <= threshold)

    if (index > -1) {
        sideBarIndex.value = index
    }
}

const onSelect = (info: IProduct) => {
    bus.emit('show', info)
}
</script>

<style scoped>
.root {
    --td-side-bar-active-color: red;
    --td-bg-color-container: #f5f5f5;
    --td-side-bar-bg-color: #e5e5e5;
}
</style>
