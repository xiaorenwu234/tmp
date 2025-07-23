<template>
  <div class="h-full bg-[#149C91] w-full flex flex-wrap flex-col">
    <el-menu
      default-active="0"
      class="el-menu-vertical-demo z-20 w-full"
      background-color="#149C91"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item @click="HandleIndexChange(0)" index="0">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">电力标准</div>
        </template>
      </el-menu-item>
      <el-menu-item @click="HandleIndexChange(1)" index="1">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">国家计量标准</div>
        </template>
      </el-menu-item>
      <el-menu-item @click="HandleIndexChange(2)" index="2">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">电力法规</div>
        </template>
      </el-menu-item>
      <el-menu-item @click="HandleIndexChange(3)" index="3">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">所有标准</div>
        </template>
      </el-menu-item>
      <el-sub-menu @click="HandleIndexChange(4)" index="4" class="references">
        <template #title>
          <el-icon><Arrow /></el-icon>
          <el-divider direction="vertical" />
          <div class="text-base">参考资料</div>
        </template>
        <el-menu-item
          v-for="(item, index) in field_store.options_of_field"
          @click="HandleFieldChange(item)"
          :id="item.label"
          :key="item.value"
          :index="`4-${index}`"
        >
          {{ item.label }}
        </el-menu-item>
      </el-sub-menu>
      <!-- <el-menu-item @click="HandleIndexChange(5)" index="5">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">系统管理</div>
        </template>
      </el-menu-item> -->
<!--      <el-menu-item @click="HandleIndexChange(6)" index="6">-->
<!--        <el-icon>-->
<!--          <Arrow></Arrow>-->
<!--        </el-icon>-->
<!--        <el-divider direction="vertical" />-->
<!--        <template #title><div class="text-base">我的标准</div> </template>-->
<!--      </el-menu-item>-->
      <!-- <el-menu-item @click="HandleIndexChange(7)" index="7">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">技术支持</div>
        </template>
      </el-menu-item>
      <el-menu-item @click="HandleIndexChange(8)" index="8">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">关于我们</div>
        </template>
      </el-menu-item> -->
      <el-menu-item @click="HandleIndexChange(9)" index="9">
        <el-icon>
          <Arrow></Arrow>
        </el-icon>
        <el-divider direction="vertical" />
        <template #title>
          <div class="text-base">使用说明</div>
        </template>
      </el-menu-item>
<!--      <el-menu-item @click="HandleIndexChange(10)" index="10" v-if="user_store.role !== 'user'">-->
<!--        <el-icon>-->
<!--          <Arrow></Arrow>-->
<!--        </el-icon>-->
<!--        <el-divider direction="vertical" />-->
<!--        <template #title>-->
<!--          <div class="text-base">标准更新</div>-->
<!--        </template>-->
<!--      </el-menu-item>-->
    </el-menu>
    <div class="w-full flex-1" style="width: 199px"></div>
    <!--    <div class="w-full flex" style="width:199px;height:54px">-->
    <!--      <img src="/icon.png" alt="公司徽标" class="z-10 mx-auto">-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import Arrow from './icons/Arrow.vue'
import { NavicatStore } from '@/stores/Navicat.js'
import { UserStore } from '@/stores/User.js'
import { FieldStore } from '@/stores/Field.js'

const user_store = UserStore()
const field_store = FieldStore()
const index = defineModel('index')
const HandleIndexChange = (Index) => {
  index.value = Index
  if (Index === 4 && !document.querySelector('.el-sub-menu .el-menu-item.is-active')) {
    document.getElementById('全部').click()
  }
}
const HandleFieldChange = (Field) => {
  console.log(Field)
  field_store.cur_field = Field
}
</script>

<style lang="scss">
.el-aside {
  box-shadow: var(--el-box-shadow);
}
.el-menu .el-icon {
  transition: 0.5s;
  transform: rotate(-90deg);
}
.el-divider--vertical {
  height: 2.5em !important;
  width: 1.5px !important;
  margin: 0 12px 0 8px !important;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    #ccc 10%,
    #fff 50%,
    #ccc 90%,
    transparent 100%
  );
}
.el-menu-item,
.el-sub-menu__title {
  margin: 6px 6px;

  background-color: var(--el-menu-bg-color);
  border-color: var(--el-menu-bg-color);
  background-clip: padding-box; /* Fix bleeding */
  border-radius: 3px;
  box-shadow:
    0 2px 0 rgba(0, 0, 0, 0.3),
    0 4px 4px -2px rgba(0, 0, 0, 0.5),
    0 2px 0 rgba(255, 255, 255, 0.3) inset;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
}
.el-sub-menu.is-opened .el-icon {
  transform: rotate(0deg);
}
.el-menu-item.is-active,
.el-sub-menu.is-active .el-sub-menu__title {
  background: var(--el-menu-hover-bg-color);
  position: relative;
  top: 1px;
  text-shadow: none;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3) inset;
}
.el-sub-menu .el-menu-item {
  // background-color: lightcyan;
  padding: 0 !important;
  justify-content: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-sub-menu .el-menu-item {
  height: 40px !important;
}
.el-icon.el-sub-menu__icon-arrow {
  color: transparent;
}
.el-sub-menu.is-opened {
  color: var(--el-menu-active-color);
}
</style>
