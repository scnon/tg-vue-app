import type { IProduct } from '@/apis/store'
import mitt from 'mitt'

type Event = {
    show: IProduct
    text: string
    hide: void
    click: void
}

const bus = mitt<Event>()
export default bus
