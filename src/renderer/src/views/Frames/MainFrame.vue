<script setup>
import TableFrame from '@/views/Frames/TableFrame.vue'
import FavoritesFrame from '@/views/Frames/FavoritesFrame.vue'
import ElectronRegulationsTableFrame from '@/views/Frames/ElectronRegulationsTableFrame.vue'
import UpdateDataFrame from '@/views/Frames/UpdateDataFrame.vue'
import ReferencesFrame from '@/views/Frames/ReferencesFrame.vue'
import HandbookFrame from '@/views/Frames/HandbookFrame.vue'

const index = defineModel('index')
</script>

<template>
  <div class="w-full h-full">
    <TableFrame
      v-if="index === 0 || index === 1 || index === 3"
      v-model:ModeIndex="index"
    ></TableFrame>
    <ElectronRegulationsTableFrame v-if="index === 2"></ElectronRegulationsTableFrame>
    <ReferencesFrame v-if="index === 4"></ReferencesFrame>
    <div v-if="index === 6">
      <FavoritesFrame></FavoritesFrame>
    </div>
    <div v-if="index === 9">
      <HandbookFrame></HandbookFrame>
    </div>
    <div v-if="index === 10">
      <UpdateDataFrame></UpdateDataFrame>
    </div>
  </div>
</template>

<style scoped></style>
