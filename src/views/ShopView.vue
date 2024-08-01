<template>
    <div class="">
        <div @click="back" class="w-full h-40 bg-red-200 text-black">
            <div>
                {{ cart.total }}
            </div>
            {{ cart.cart }}
        </div>
        <shop-menu :info="menu" />
        <attr-popup ref="popup" />
    </div>
</template>

<script setup lang="ts">
import ShopMenu from '@/components/ShopMenu.vue'
import {
    getStoreMenu,
    type IStoreInfo,
    type IMenuInfo,
    getStoreDetail,
    type IProduct
} from '@/apis/store'
import { onActivated, onDeactivated, ref, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useWebAppMainButton } from 'vue-tg'
import AttrPopup from '@/components/AttrPopup.vue'
import bus from '@/utils/bus'

const route = useRoute()

let id = ''
const info = ref<IStoreInfo | null>(null)
const menu = ref<IMenuInfo[]>([])
const cart = useCartStore()
const mainButton = useWebAppMainButton()
const popup = ref<InstanceType<typeof AttrPopup>>()

const back = () => {
    router.back()
}

const refresh = () => {
    info.value = null
    menu.value = []

    getStoreDetail(id).then((res) => {
        info.value = res
    })

    getStoreMenu(id).then((res) => {
        menu.value = res
    })
}

watch(
    () => cart.total,
    () => updateMainBtn()
)

const updateMainBtn = () => {
    if (cart.total > 0) {
        mainButton.showMainButton()
    } else {
        mainButton.hideMainButton()
    }

    mainButton.setMainButtonText(`$${cart.total.toFixed(2)} 去结算`)
}

onActivated(() => {
    const shopId = route.query.id as string
    if (id != shopId) {
        id = shopId
        refresh()
    }

    bus.on('click', () => {
        if (popup.value?.visible) {
            popup.value?.confirm()
            updateMainBtn()
        } else {
            console.log('去结算')
            router.push({
                name: 'order'
            })
        }
    })

    bus.on('show', (val) => {
        popup.value?.show(val)
    })

    bus.on('hide', () => updateMainBtn())
})

onDeactivated(() => {
    mainButton.hideMainButton()
    popup.value?.hide()
    bus.all.clear()
})
</script>
