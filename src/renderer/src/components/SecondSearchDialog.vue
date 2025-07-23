<script setup>
import {ElMessage} from "element-plus";
import {ref} from "vue";

const dialogFormVisible = defineModel("DialogVisible");
const props = defineProps({
  type: {
    type: Number,
    required: true,
  },
});
const emits = defineEmits(["search"]);
const content = ref("");

const Classification_value = ref('chinese_name');

const options_of_classification = [
  {
    value: 'chinese_name',
    label: '标准中文名称',
  },
  {
    value: 'standard_num',
    label: '现行标准编号',
  }
]

const Status_value = ref('name');

const options_of_status = [
  {
    value: 'name',
    label: '法规名称',
  },
  {
    value: 'comp',
    label: '颁发单位',
  }
]

const open = () => {
  if (content.value === "") {
    ElMessage.warning("查询内容不能为空");
    return;
  }
  if (props.type === 1){
    emits("search", Classification_value.value, content.value);
  } else {
    emits("search", Status_value.value, content.value);
  }
  dialogFormVisible.value = false;
}
</script>

<template>
<el-dialog v-model="dialogFormVisible" title="二次搜索" width="25%">
  <div class="flex items-center mb-4">
    <p class="text-lg">检索选项：</p>
    <el-select
        v-if="props.type === 1"
        v-model="Classification_value"
        :empty-values="[null, undefined]"
        :value-on-clear="null"
        placeholder="Select"
        style="width: 150px"
    >
      <el-option
          v-for="item in options_of_classification"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
    <el-select
        v-if="props.type === 2"
        v-model="Status_value"
        :empty-values="[null, undefined]"
        :value-on-clear="null"
        placeholder="Select"
        style="width: 150px"
    >
      <el-option
          v-for="item in options_of_status"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      />
    </el-select>
  </div>
  <el-input v-model="content" placeholder="请输入查询内容" @keyup.enter="open"></el-input>
  <template #footer>
    <div class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取消</el-button>
      <el-button type="primary" @click="open">确认</el-button>
    </div>
  </template>
</el-dialog>
</template>

<style scoped>

</style>