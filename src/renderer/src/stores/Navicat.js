import { defineStore } from 'pinia'

export const NavicatStore = defineStore('navicat', () => {
  const categories = [
    '电力标准',
    '国家计量标准',
    '电力法规',
    '所有标准',
    '参考资料',
    // '系统管理',
    '我的标准',
    // '技术支持',
    // '关于我们',
    // '安装OCR软件',
    '使用说明',
    '标准更新'
  ]

  return {
    categories
  }
})
