import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    build: {
      target: 'node16.17'
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    build: {
      target: 'node16.17'
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    build: {
      target: 'chrome108'
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src')
      }
    },
    plugins: [vue()]
  }
})
