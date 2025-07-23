<template>
  <el-table :data="tableData" :row-class-name="rowClassName" @row-click="handleRowClick">
    <!-- 列定义 -->
    <el-table-column prop="date" label="日期"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="address" label="地址"></el-table-column>
  </el-table>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const tableData = ref([
      { date: '2023-07-01', name: 'John', address: 'New York' },
      { date: '2023-07-02', name: 'Jane', address: 'Los Angeles' },
      { date: '2023-07-03', name: 'Doe', address: 'Chicago' },
    ]);

    function rowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return 'odd-row'; // 奇数行的类名
      }
      return ''; // 偶数行无特殊类名
    }

    function handleRowClick(row, event, column) {
      console.log('Clicked row:', row);
      // 可选：处理行点击事件
    }

    return {
      tableData,
      rowClassName,
      handleRowClick,
    };
  },
};
</script>

<style>
.el-table__body tr:nth-child(even):hover > td {
  background-color: rgba(179, 247, 237, 0.72) !important;
}
</style>
