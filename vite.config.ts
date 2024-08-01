import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        AutoImport({
            resolvers: [
                TDesignResolver({
                    library: 'mobile-vue'
                })
            ]
        }),
        Components({
            resolvers: [
                TDesignResolver({
                    library: 'mobile-vue'
                })
            ]
        }),
        mkcert()
    ],
    css: {
        postcss: {
            plugins: [tailwindcss()]
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        host: 'xing.me'
    }
})
