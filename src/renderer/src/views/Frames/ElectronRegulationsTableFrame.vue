<script setup>
import {onMounted, ref, watch} from "vue";
import SearchDialog from "@/components/SearchDialog.vue";
import {UserStore} from "@/stores/User.js";
import {ElMessage} from "element-plus";
import instance from "@/apis/axios.js";
import ChooseDialog from "@/components/ChooseDialog.vue";
import {OpenNotification} from "@/js/Notification.js";
import {SearchFormStore} from "@/stores/SearchForm.js";
import {openPdf} from "@/stores/Pdf.js";
import SecondSearchDialog from "@/components/SecondSearchDialog.vue";


const ChooseDialogVisible = ref(false);
const article_id = ref('');
const article_type = ref();

const userstore = UserStore();
const screenWidth = ref(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth)
const SearchContent = ref('');

//查询标准
const Status_value = ref('name');

const tableData = ref([]);

//状态单选框第一个的选项
const options_of_status = [
  {
    value: 'name',
    label: '法规名称',
  },
  {
    value: 'comp',
    label: '颁发单位',
  },
  // {
  //   value: 'date',
  //   label: '颁发日期',
  // },
]

//跟页码有关的内容
const currentPage = ref(1)
const pageSize = ref(15)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const Loading = ref(false);


//高级搜索是否显示
const DialogVisible = ref(false);

const total = ref(0);

const handleSizeChange = (val) => {
  GetTableData()
}
const handleCurrentChange = (val) => {
  GetTableData()
}

const RefreshSearch = () => {
  SearchContent.value = '';
  SearchContentFirst.value = '';
  searchformstore.Mode = 0;
  GetTableData();
}

const GetTableData = () => {
  if (userstore.State === false) {
    OpenNotification('请先登录');
    tableData.value = [];
    total.value = 0;
    return;
  }

  if (searchformstore.Mode === 0) {
    instance.get('/search/PowerRegulation', {
      params: {
        username: userstore.Username,
        page_id: currentPage.value,
        page_num: pageSize.value,
        standard: Status_value.value,
        word: SearchContent.value,
        time: 'first',
      }
    })
        .then(response => {
          console.log(response.data.data);
          tableData.value = response.data.data;
          total.value = response.data.len;
        })
        .catch(error => {
          console.log(error.response.data);
        })
  } else {
    let search_tables = searchformstore.searchTable;

    instance.get('/search/AdvancedSearch', {
      params: {
        page_id: currentPage.value,
        page_num: pageSize.value,
        username: userstore.Username,
        search_tables: search_tables.toString(),

        standard_number: searchformstore.form.Standard_Num,
        chinese_name: searchformstore.form.Standard_Name_In_Chinese,
        english_name: searchformstore.form.Standard_Name_In_English,
        issuing_body: searchformstore.form.Firm,
        issue_date: searchformstore.form.Get_Date,
      }
    })
        .then(response => {
          total.value = response.data.len;
          tableData.value = response.data.data;
        })
        .catch(error => {
          console.log(error.response.data);
        })
  }

}

const Status_value_First = ref('');
const SearchContentFirst = ref('');

const ChooseDialog_Article_Type = ['PowerRegulation'];

//第一次搜索
const SearchOperation = () => {
  searchformstore.Mode = 0;
  currentPage.value = 1;
  Status_value_First.value = Status_value.value;
  SearchContentFirst.value = SearchContent.value;
  GetTableData();
  OpenNotification('搜索完成', '');
}

//传pdf的相关参数
const PushPdf = (row) => {
  openPdf(row);
}

const SearchCount = ref(false);


//第二次搜索
const SecondDialogVisible = ref(false);

const SecondSearchOperation = () => {
  if (userstore.State === false) {
    tableData.value = [];
    total.value = 0;
  }
  if(SearchCount.value===true){
    SearchContent.value=SearchContentFirst.value;
    SearchCount.value=false;
    currentPage.value=1;
    SearchOperation();
    return;
  }
  SecondDialogVisible.value = true;
}

const SearchOperationSecond = (option, ContentText) => {
  if (userstore.State === false && userstore.HasTryLogin === true) {
    tableData.value = [];
    total.value = 0;
  }
  SearchCount.value = true;
  currentPage.value = 1;
  instance.get('/search/PowerRegulation', {
    params: {
      username: userstore.Username,
      page_id: currentPage.value.toString(),
      page_num: pageSize.value.toString(),
      status: Status_value.value,
      standard: Status_value_First.value,
      standard2: option,
      word2: ContentText,
      word: SearchContentFirst.value,
      time: 'second',
    }
  })
      .then(response => {
        OpenNotification('搜索完成', '');
        total.value = response.data.len;
        tableData.value = response.data.data;
        console.log(tableData.value);
        // SearchContentFirst.value = SearchContent.value;
      })
      .catch(error => {
        console.log(error.response.data);
      })
}

//处理收藏情况
const handleClick = (row) => {
  if (row.is_favorite === true) {
    for (let i = 0; i < tableData.value.length; ++i) {
      if (row.id === tableData.value[i].id) {
        const formData = new FormData();
        formData.append('username', userstore.Username);
        formData.append('article_id', tableData.value[i].id);

        formData.append('article_type', 'dlfg')
        instance.post('/favorites/deleteArticle', formData)
            .then(response => {
              if (response.data.success === true) {
                tableData.value[i].is_favorite = !tableData.value[i].is_favorite;
                ElMessage({
                  message: '取消收藏成功',
                  type: 'success',
                });
              } else {
                ElMessage({
                  message: '取消收藏失败',
                  type: 'success',
                });
              }
            })
        break;
      }
    }
  } else {
    ChooseDialogVisible.value = true;
    article_id.value = row.id;
    article_type.value = 'dlfg';
  }

};

//修改当前状态
const ChangeStatus = () => {
  for (let i = 0; i < tableData.value.length; ++i) {
    if (tableData.value[i].id === article_id.value) {
      tableData.value[i].is_favorite = true;
      break;
    }
  }
}

//调整窗口宽度
watch(() => screenWidth, (val) => {
  screenWidth.value = val;
})
onMounted(() => {
  window.onresize = () => {
    return (() => {
      screenWidth.value = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    })()
  }
})
onMounted(() => {
  searchformstore.Mode = 0;
})
onMounted(GetTableData);
watch(() => userstore.State, GetTableData)
const searchformstore = SearchFormStore();


const isFocused = ref(false);

function handleEnter() {
  if (isFocused.value) {
    SearchOperation();
  }
}

const cellHandleclick = (row, column, cell, event) => {
  if (column.label !== '操作') {
    PushPdf(row);
  }
}

function rowStyle({rowIndex}) {
  if (rowIndex % 2 === 0) {
    return {background: 'white'}; // 灰色背景
  } else {
    return {background: 'rgba(179,247,237,0.45)'}; // 浅蓝色背景
  }
}
</script>

<template>
  <div class="w-full h-full flex-wrap">
    <div>
      <div class="flex w-full">
        <div class="h-10 flex justify-center items-center">
          <p class="text-center">状态：</p>
        </div>
        <el-select
            v-model="Status_value"
            :empty-values="[null, undefined]"
            :value-on-clear="null"
            placeholder="Select"
            style="width: 120px"
            size="large"
            class="mx-2"
        >
          <el-option
              v-for="item in options_of_status"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>

        <div class="h-10 flex justify-center items-center mx-2">
          <p class="text-center">检索词：</p>
        </div>
        <el-input
            v-model="SearchContent"
            style="width: 240px"
            placeholder="请输入内容"
            clearable
            size="large"
            @focus="isFocused = true" @blur="isFocused = false" @keydown.enter="handleEnter"
        />
        <el-button size="large" class="mr-2 ml-4" @click="SearchOperation">搜索</el-button>
        <el-button size="large" class="mx-2" @click="SecondSearchOperation">
          {{ SearchCount === true ? '返回一次搜索' : '二次搜索' }}
        </el-button>
        <el-button type="success" size="large" class="mx-2" @click="DialogVisible=true">高级搜索</el-button>
        <el-button size="large" class="mx-2" @click="RefreshSearch">重置搜索</el-button>
      </div>
    </div>
    <div class="w-full mb-12">
      <el-table :data="tableData" class="w-full cursor-pointer" empty-text="没有信息" :Loading="Loading"
                @cell-click="cellHandleclick" :row-style="rowStyle" :header-cell-style="{color:'black',fontSize: '15px'}">
        <el-table-column label="法规名称" min-width="50%">
          <template #default="scope">
            <div class="hoverable-cell">{{ scope.row.regulation_name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="issuing_body" label="颁发单位" min-width="30%"></el-table-column>
        <el-table-column prop="issue_date" label="颁发日期" min-width="10%"></el-table-column>
        <el-table-column prop="is_favorite" label="操作" min-width="10%">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)">{{ scope.row.is_favorite === true ? '取消收藏' : '收藏' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="h-10 fixed bottom-0 right-0 mb-4 mr-8 z-50">
      <div class="demo-pagination-block">
        <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[15, 20, 25,30]"
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
    <div class="h-16 fixed bottom-0 z-40 right-0 bg-white" :style="{width:(screenWidth-220)+'px'}">
    </div>
  </div>
  <SearchDialog v-model:DialogVisible="DialogVisible" v-model:tableData="tableData" v-model:total="total"
                v-model:pageSize="pageSize" v-model:currentPage="currentPage"
                :article_type="ChooseDialog_Article_Type" :Mode="1"></SearchDialog>
  <ChooseDialog v-model:DialogVisible="ChooseDialogVisible" :article_id="article_id"
                :article_type="article_type" @ChangeStatus="ChangeStatus"></ChooseDialog>
  <SecondSearchDialog v-model:DialogVisible="SecondDialogVisible" @search="SearchOperationSecond"
                      :type="2"></SecondSearchDialog>
</template>

<style scoped>
.hoverable-cell:hover {
  color: blue; /* 字体颜色变为蓝色 */
  text-decoration: underline; /* 添加下划线 */
}
</style>
