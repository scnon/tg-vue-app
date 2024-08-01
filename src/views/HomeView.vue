<template>
    <div class="root">
        <div class="text-lg mb-2 px-2">Address info</div>
        <t-swiper class="h-32 px-2" autoplay :navigation="{ type: 'dots' }">
            <t-swiper-item v-for="(item, index) in swiperList" :key="index">
                <div class="bg-red-200 w-full h-32 rounded-md"></div>
            </t-swiper-item>
        </t-swiper>
        <div class="text-xl mt-2 px-2">Shop List</div>

        <div class="space-y-4 mt-2 px-2">
            <div v-for="shop in shops" :key="shop.id">
                <shop-item :info="shop" />
            </div>
        </div>
        <div class="h-12"></div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ShopItem from '@/components/ShopItem.vue'
import { getStoreList, type IStoreInfo } from '@/apis/store'

const swiperList = ref([1, 2, 3, 4, 5])

const shops = ref<IStoreInfo[]>([])

getStoreList({
    lat: 0,
    lng: 0,
    shop_id: 0,
    kw: ''
}).then((res) => {
    shops.value = res
})
</script>
