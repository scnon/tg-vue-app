<template>
    <t-popup
        class="container"
        placement="bottom"
        v-model="visible"
        :style="{ height }"
        :onClose="onClosed"
        :onOpen="onOpened"
    >
        <div class="mt-2">
            <div v-for="(attr, index) in info?.productAttr" :key="index">
                <div class="flex px-2 font-bold text-lg text-black">
                    {{ attr.attrName }}
                </div>
                <t-radio-group
                    class="flex"
                    :value="values[index]"
                    @change="(val: number) => onChange(index, val)"
                >
                    <view
                        v-for="(item, i) in attr.attrValueArr"
                        :key="i"
                        :label="item"
                        :class="['card', values[index] === i ? 'card--active' : 'card--normal']"
                    >
                        <icon v-if="values[index] == i" name="check" class="card__icon" />
                        <t-radio :label="item" borderless :value="i" icon="none" />
                    </view>
                </t-radio-group>
            </div>
        </div>
    </t-popup>
</template>

<script setup lang="ts">
import type { IProduct } from '@/apis/store'
import { ref } from 'vue'
import { Icon } from 'tdesign-icons-vue-next'
import { useWebAppMainButton } from 'vue-tg'
import { useCartStore } from '@/stores/cart'
import bus from '@/utils/bus'

const info = ref<IProduct | null>(null)
const height = ref('0px')
const visible = defineModel({ type: Boolean, default: false })
const values = ref<number[]>([])
const mainButton = useWebAppMainButton()

const show = (val: IProduct) => {
    visible.value = true
    info.value = val
    values.value = []
    for (let i = 0; i < val.productAttr.length; i++) {
        values.value.push(0)
    }
    height.value = `${val.productAttr.length * 98 + 24}px`
}

const hide = () => (visible.value = false)

const confirm = () => {
    visible.value = false
    useCartStore().update(info.value!, 1)
}

const onChange = (index: number, val: number) => {
    console.log(index, val)
    values.value[index] = val
}

const onOpened = () => {
    mainButton.setMainButtonText('确定')
    mainButton.showMainButton()
}

const onClosed = () => {
    bus.emit('hide')
}

defineExpose({
    show,
    hide,
    confirm,
    visible
})
</script>

<style>
.container {
    --td-popup-border-radius: 12px;
    --td-tab-item-tag-active-bg: #22aaff;
    --td-tab-item-active-color: #fff;
}

.card {
    display: block;
    position: relative;
    margin: 6px;
    border-radius: 6px;
    overflow: hidden;
    box-sizing: border-box;
    border: 1.5px solid #fff;
}

.card--active {
    border-color: #0052d9;
}

.card--normal {
    border-color: gray;
}

.card--active::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    border: 14px solid #0052d9;
    border-bottom-color: transparent;
    border-right-color: transparent;
}

.card__icon {
    display: block;
    color: #fff;
    position: absolute;
    left: 1.5px;
    top: 1.5px;
    z-index: 10;
}
</style>
