import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IProduct } from '@/apis/store'
import Decimal from 'decimal.js'
import { useWebAppMainButton } from 'vue-tg'

export interface CartProduct {
    id: number
    name: string
    price: number
    count: number
    image: string
}

export const useCartStore = defineStore('cart', () => {
    const cart = ref<CartProduct[]>([])
    const total = computed(() =>
        cart.value.reduce((acc, item) => {
            const res = new Decimal(acc).add(new Decimal(item.price).mul(item.count)).toNumber()
            if (res > 0) {
                useWebAppMainButton().showMainButton()
            } else {
                useWebAppMainButton().hideMainButton()
            }
            return res
        }, 0)
    )

    function update(product: IProduct, count: number) {
        const index = cart.value.findIndex((item) => item.id === product.id)

        if (index === -1) {
            if (count > 0) {
                cart.value.push({
                    id: product.id,
                    name: product.storeName,
                    price: product.price,
                    image: product.image,
                    count
                })
            }
        } else {
            if (count <= 0) {
                cart.value.splice(index, 1)
            } else {
                cart.value[index].count = count
            }
        }
    }

    return { cart, total, update }
})
