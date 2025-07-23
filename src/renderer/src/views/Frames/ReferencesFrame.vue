<script setup>
import { onMounted, ref, watch } from 'vue'
import SearchDialog from '@/components/SearchDialog.vue'
import { UserStore } from '@/stores/User.js'
import { FieldStore } from '@/stores/Field.js'
import instance from '@/apis/axios.js'
import { OpenNotification } from '@/js/Notification.js'
import { SearchFormStore } from '@/stores/SearchForm.js'

const article_type = ref()

const screenWidth = ref(
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
)
const SearchContent = ref('')

const userstore = UserStore()
const fieldstore = FieldStore()
const Field_value = ref('')
const Type_value = ref('中文标准名称')
const tableData = ref([])

const ModeIndex = defineModel('ModeIndex')

const options_of_type = [
  {
    value: '中文标准名称',
    label: '中文名称'
  },
  {
    value: '英文标准名称',
    label: '英文名称'
  },
  {
    value: '注释',
    label: '注释'
  },
  {
    value: '类别',
    label: '类别'
  }
]

//跟页码有关的内容
const currentPage = ref(1)
const pageSize = ref(15)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const Loading = ref(false)

//高级搜索是否显示
const DialogVisible = ref(false)

const total = ref(0)

const handleSizeChange = (val) => {
  GetTableData()
}
const handleCurrentChange = (val) => {
  GetTableData()
}

//获取到当前的数据
const GetTableData = () => {
  if (userstore.State === false && userstore.HasTryLogin === true) {
    OpenNotification('请先登录')
    tableData.value = []
    total.value = 0
    return
  }
  if (searchformstore.Mode === 0) {
    const params = {
      key_word: SearchContent.value,
      key_word_type: Type_value.value,
      page_id: currentPage.value.toString(),
      page_num: pageSize.value.toString(),
      field: fieldstore.cur_field.value
    }
    // if (Type_value.value === '类别') {
    //   params.type = SearchContent.value
    // }
    instance
      .get('/search/ReferenceStanard', { params })
      .then((response) => {
        total.value = response.data.len
        tableData.value = response.data.data
        console.log(response.data)
        for (let i = 0; i < tableData.value.length; ++i) {
          if (tableData.value[i].obsolete_standard_number === 'nan') {
            tableData.value[i].obsolete_standard_number = '无'
          }
        }
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
}

onMounted(GetTableData)
watch(ModeIndex, GetTableData)
watch(
  () => fieldstore.cur_field,
  () => {
    Field_value.value = fieldstore.cur_field.value
    GetTableData()
  }
)
const handleFieldChange = () => {
  const label = Field_value.value || '全部'
  document.getElementById(label).click()
  // GetTableData()
}
watch(() => userstore.State, GetTableData)
watch(ModeIndex, () => {
  currentPage.value = 1
  searchformstore.Mode = 0
})
//调整窗口宽度
watch(
  () => screenWidth,
  (val) => {
    screenWidth.value = val
  }
)
onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })()
  }
})

//第一次搜索
const SearchOperation = () => {
  searchformstore.Mode = 0
  currentPage.value = 1
  GetTableData()
  OpenNotification('搜索完成', '')
}

const searchformstore = SearchFormStore()
onMounted(() => {
  searchformstore.Mode = 0
})

const isFocused = ref(false)

function handleEnter() {
  if (isFocused.value) {
    SearchOperation()
  }
}

function rowStyle({ rowIndex }) {
  if (rowIndex % 2 === 0) {
    return { background: 'white' } // 灰色背景
  } else {
    return { background: 'rgba(179,247,237,0.45)' } // 浅蓝色背景
  }
}
</script>

<template>
  <div class="w-full h-full flex-wrap">
    <div>
      <div class="flex w-full">
        <div class="h-10 flex justify-center items-center">
          <p class="text-center">检索选项：</p>
        </div>
        <el-select
          v-model="Field_value"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          placeholder="Select"
          style="width: 150px"
          size="large"
          class="mx-2"
          @change="handleFieldChange"
        >
          <el-option
            v-for="item in fieldstore.options_of_field"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          v-model="Type_value"
          :empty-values="[null, undefined]"
          :value-on-clear="null"
          placeholder="Select"
          style="width: 150px"
          size="large"
          class="mx-2"
          @change="GetTableData"
        >
          <el-option
            v-for="item in options_of_type"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div class="h-10 flex justify-center items-center mx-2">
          <p class="text-center">包含</p>
        </div>
        <el-input
          v-model="SearchContent"
          style="width: 240px"
          placeholder="请输入内容"
          clearable
          size="large"
          @focus="isFocused = true"
          @blur="isFocused = false"
          @keydown.enter="handleEnter"
        />
        <el-button size="large" class="mr-2 ml-4" @Click="SearchOperation">搜索</el-button>
      </div>
    </div>
    <div class="w-full mb-12">
      <el-table
        :data="tableData"
        class="w-full cursor-pointer"
        empty-text="没有信息"
        :Loading="Loading"
        :row-style="rowStyle"
        :header-cell-style="{ color: 'black', fontSize: '15px' }"
      >
        <el-table-column
          prop="chinese_standard_name"
          label="中文名称"
          min-width="18%"
        ></el-table-column>
        <el-table-column prop="english_standard_name" label="英文名称" min-width="28%">
        </el-table-column>
        <el-table-column prop="exegesis" label="注释" min-width="46%"> </el-table-column>
        <el-table-column prop="type" label="类别" min-width="8%"> </el-table-column>
      </el-table>
    </div>
    <div class="h-10 fixed bottom-0 right-0 mb-4 mr-8 z-50">
      <div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[15, 20, 25, 30]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div
      class="h-16 fixed bottom-0 z-40 right-0 bg-white"
      :style="{ width: screenWidth - 220 + 'px' }"
    ></div>
  </div>
  <SearchDialog
    v-model:DialogVisible="DialogVisible"
    v-model:tableData="tableData"
    v-model:total="total"
    v-model:pageSize="pageSize"
    v-model:currentPage="currentPage"
    :article_type="article_type"
    :Mode="0"
  ></SearchDialog>
</template>

<style>
.el-scrollbar .el-select-dropdown__wrap {
  max-height: unset;
}
</style>
